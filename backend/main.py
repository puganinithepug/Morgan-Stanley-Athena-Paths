from fastapi import FastAPI, HTTPException, Response, Cookie
from fastapi.middleware.cors import CORSMiddleware

import hashlib, base64, re, time, secrets, bcrypt
from typing import Optional
import pandas as pd
import datetime
import os

salt = bcrypt.gensalt()

cors_origins_env = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000,http://localhost:80,http://localhost")
origins = [origin.strip() for origin in cors_origins_env.split(",")]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def load_users():
    df = pd.read_csv("users.csv")
    # Ensure team_id column exists and uses empty string instead of NaN/null
    if "team_id" not in df.columns:
        df["team_id"] = ""
    else:
        df["team_id"] = df["team_id"].fillna("")
    return df


def load_donations():
    try:
        df = pd.read_csv("donations.csv")
    except FileNotFoundError:
        df = pd.DataFrame(
            columns=["uuid", "amount", "path", "impact_points", "hours", "created_at"]
        )

    # Ensure newer columns exist even if older CSVs don't have them yet
    for col in ["hours", "created_at"]:
        if col not in df.columns:
            df[col] = None

    return df


def load_referrals():
    """Load referrals from CSV.

    Columns: referrer_id, referred_id, code, hasDonated
    """
    try:
        return pd.read_csv("referrals.csv")
    except FileNotFoundError:
        return pd.DataFrame(
            columns=["referrer_id", "referred_id", "code", "hasDonated"]
        )


def load_has_badges():
    """Load user-badge assignments from CSV.

    Columns: uuid, badge_id
    """
    try:
        return pd.read_csv("hasBadges.csv")
    except FileNotFoundError:
        return pd.DataFrame(columns=["uuid", "badge_id"])


MESSAGES_CSV = "hope_wall_messages.csv"
MESSAGE_COLUMNS = [
    "id",
    "display_name",
    "message",
    "language",
    "created_date",
    "is_approved",
]
APPROVED_TRUE_VALUES = {"1", "true", "yes", "approved", "y"}


def load_hope_wall_messages():
    try:
        df = pd.read_csv(MESSAGES_CSV)
    except FileNotFoundError:
        df = pd.DataFrame(columns=MESSAGE_COLUMNS)

    for column in MESSAGE_COLUMNS:
        if column not in df.columns:
            df[column] = False if column == "is_approved" else ""

    if df.empty:
        return df

    df["is_approved"] = (
        df["is_approved"]
        .astype(str)
        .str.strip()
        .str.lower()
        .isin(APPROVED_TRUE_VALUES)
    )

    return df


DEFAULT_HOPE_WALL_MESSAGES = [
    {
        "id": "default-msg-1",
        "display_name": "Anonymous",
        "message": "You are stronger than you know. Keep moving forward, one step at a time.",
        "language": "en",
        "created_date": (
            datetime.datetime.now(datetime.timezone.utc)
            - datetime.timedelta(days=5)
        ).isoformat(),
        "is_approved": True,
    },
    {
        "id": "default-msg-2",
        "display_name": "Hope Giver",
        "message": "Your courage inspires us all. You are not alone in this journey.",
        "language": "en",
        "created_date": (
            datetime.datetime.now(datetime.timezone.utc)
            - datetime.timedelta(days=4)
        ).isoformat(),
        "is_approved": True,
    },
    {
        "id": "default-msg-3",
        "display_name": "Community Supporter",
        "message": "We stand with you. Your story matters, and your future holds so much hope.",
        "language": "en",
        "created_date": (
            datetime.datetime.now(datetime.timezone.utc)
            - datetime.timedelta(days=2)
        ).isoformat(),
        "is_approved": True,
    },
    {
        "id": "default-msg-4",
        "display_name": "Anonymous",
        "message": "Your children will see your strength and learn from your courage. You are their hero.",
        "language": "en",
        "created_date": (
            datetime.datetime.now(datetime.timezone.utc)
            - datetime.timedelta(days=1)
        ).isoformat(),
        "is_approved": True,
    },
    {
        "id": "default-msg-5",
        "display_name": "Hope Warrior",
        "message": "Your resilience is inspiring. Keep fighting for the life you deserve.",
        "language": "en",
        "created_date": (
            datetime.datetime.now(datetime.timezone.utc)
            - datetime.timedelta(days=8)
        ).isoformat(),
        "is_approved": True,
    },
    {
        "id": "default-msg-6",
        "display_name": "Strength Seeker",
        "message": "Every step you take toward safety is a victory. You are worthy of peace and happiness.",
        "language": "en",
        "created_date": (
            datetime.datetime.now(datetime.timezone.utc)
            - datetime.timedelta(days=3)
        ).isoformat(),
        "is_approved": True,
    },
]


def combine_hope_wall_messages():
    persisted = load_hope_wall_messages()
    persisted_records = []

    if not persisted.empty:
        persisted = persisted.copy()
        if "is_approved" not in persisted.columns:
            persisted["is_approved"] = False

        persisted["is_approved"] = (
            persisted["is_approved"]
            .astype(str)
            .str.strip()
            .str.lower()
            .isin(APPROVED_TRUE_VALUES)
        )

        approved = persisted[persisted["is_approved"]]
        if not approved.empty:
            approved = approved.fillna("")
            persisted_records = approved.to_dict(orient="records")

    combined = DEFAULT_HOPE_WALL_MESSAGES + persisted_records
    combined.sort(
        key=lambda m: pd.to_datetime(m.get("created_date"), errors="coerce"),
        reverse=True,
    )
    return combined


def check_user_exists(email: str, password: str) -> str:
    df = load_users()
    user = df[(df["email"] == email) & (df["password"] == password)]
    if not user.empty:
        return user.iloc[0].to_dict()
    return None


def gen_uuid(length: int = 8, salt: str = "yourSaltHere") -> str:
    """
    Python equivalent of the PHP gen_uuid($len=8). https://stackoverflow.com/questions/307486/short-unique-id-in-php

    - length: desired length (clamped to [4, 128]).
    - salt: string salt used in MD5 input.
    """
    length = max(4, min(128, int(length)))

    # Create a unique token similar to PHP uniqid(..., true)
    uniq = f"{time.time_ns()}-{secrets.token_hex(8)}"

    # MD5 of salt + uniq
    h = hashlib.md5((salt + uniq).encode("utf-8")).hexdigest()

    # convert hex to bytes, then base64 encode
    packed = bytes.fromhex(h)
    tmp = base64.b64encode(packed).decode("ascii")

    # strip non-alphanumeric characters (UTF-8 safe)
    uid = re.sub(r"[^A-Za-z0-9]", "", tmp)

    # If too short, append more by recursive generation (chunks of 22 to match original)
    while len(uid) < length:
        uid += gen_uuid(22, salt)

    return uid[:length]


# Routes:
# Login route
@app.post("/login")
def login(data: dict, response: Response):
    email = data.get("email")
    password = data.get("password")

    df = load_users()
    user_df = df[(df["email"] == email)]

    stored_password = user_df["password"].iloc[0] if not user_df.empty else None
    if stored_password is not None:
        try:
            if not bcrypt.checkpw(
                password.encode("utf-8"), stored_password.encode("utf-8")
            ):
                return {"status": "error", "message": "Invalid password"}
        except Exception:
            return {"status": "error", "message": "Invalid password"}

    if user_df.empty:
        return {"status": "error", "message": "Invalid email or password"}

    user = user_df.iloc[0].to_dict()

    # Set a simple session cookie
    response.set_cookie(
        key="session",
        value=user["uuid"],
        httponly=True,
        max_age=3600,
    )

    # Do not expose password hash to the client
    user_sanitized = {k: v for k, v in user.items() if k != "password"}

    return {"status": "ok", "message": "Logged in!", "user": user_sanitized}


# Signup route
@app.post("/signup")
def signup(data: dict, response: Response):
    email = data.get("email")
    password = data.get("password")
    confirmpass = data.get("confirmpass")
    fname = data.get("fname")
    lname = data.get("lname")

    if password != confirmpass:
        # raise HTTPException(status_code=400, detail="Passwords do not match")
        return {"status": "error", "message": "Passwords do not match"}

    df = load_users()

    if not df[df["email"] == email].empty:
        # raise HTTPException(status_code=400, detail="Email already exists")
        return {"status": "error", "message": "Email already exists"}

    encrypted_password = bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

    new_user = {
        "uuid": gen_uuid(),
        "email": email,
        "password": encrypted_password,
        "fname": fname,
        "lname": lname,
        "team_id": "",
    }

    new_user_df = pd.DataFrame([new_user])

    df = pd.concat([df, new_user_df], ignore_index=True)
    df.to_csv("users.csv", index=False)

    # Set session cookie so the user is logged in right after signup
    response.set_cookie(
        key="session",
        value=new_user["uuid"],
        httponly=True,
        max_age=3600,
    )

    user_sanitized = {k: v for k, v in new_user.items() if k != "password"}

    return {
        "status": "ok",
        "message": "User registered successfully",
        "user": user_sanitized,
    }


@app.post("/logout")
def logout(response: Response):
    response.delete_cookie(key="session")
    return {"status": "ok", "message": "Logged out!"}


@app.post("/volunteer")
def volunteer(data: dict):
    """Record volunteer hours as zero-amount SERVICE entries in donations.csv."""
    uuid = data.get("uuid")
    hours = data.get("hours")
    start_date = data.get("date")

    if uuid is None or hours is None:
        raise HTTPException(status_code=400, detail="uuid and hours are required")

    try:
        hours_val = float(hours)
    except (TypeError, ValueError):
        raise HTTPException(status_code=400, detail="hours must be a number")

    donations_df = load_donations()
    new_volunteer = {
        "uuid": uuid,
        "amount": 0,
        "path": "SERVICE",
        "impact_points": hours_val * 10,  # 10 impact points per hour
        "hours": hours_val,
        "created_at": start_date,
    }
    donations_df = pd.concat(
        [donations_df, pd.DataFrame([new_volunteer])], ignore_index=True
    )
    donations_df.to_csv("donations.csv", index=False)

    return {"status": "ok", "message": "Volunteer hours recorded"}


@app.post("/donate")
def donate(data: dict, response: Response):
    amount = data.get("amount")
    path = data.get("path")
    uuid = data.get("uuid")
    impact = data.get("impact")
    referral_code = data.get("referral_code")

    if amount is None or path is None or uuid is None:
        raise HTTPException(
            status_code=400, detail="amount, path and uuid are required"
        )

    donations_df = load_donations()

    new_donation = {
        "uuid": uuid,
        "amount": amount,
        "path": path,
        "impact_points": impact,
        "hours": 0,
        "created_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    }
    donations_df = pd.concat(
        [donations_df, pd.DataFrame([new_donation])], ignore_index=True
    )
    donations_df.to_csv("donations.csv", index=False)

    # Handle referral on first donation, if a referral code is provided
    if referral_code:
        referrals_df = load_referrals()

        # Count donations for this user (after inserting the new donation)
        user_donations = donations_df[donations_df["uuid"] == uuid]
        is_first_donation = len(user_donations) == 1

        # Try to resolve referrer_id from code like "REF-<UUID>"
        referrer_uuid = None
        if isinstance(referral_code, str) and referral_code.startswith("REF-"):
            # Extract everything after the "REF-" prefix; do NOT use strip here
            candidate_uuid = referral_code[len("REF-") :]
            users_df = load_users()
            if not users_df[users_df["uuid"] == candidate_uuid].empty:
                referrer_uuid = candidate_uuid

        print("Referrer UUID resolved to:", referrer_uuid)
        if is_first_donation:
            # See if a referral row already exists for this referred user + code
            existing = referrals_df[
                (referrals_df["referred_id"] == uuid)
                & (referrals_df["code"] == referral_code)
            ]

            if not existing.empty:
                # Mark as donated and fill referrer_id if we resolved it
                referrals_df.loc[existing.index, "hasDonated"] = True
                if referrer_uuid is not None:
                    referrals_df.loc[existing.index, "referrer_id"] = referrer_uuid
            else:
                # Record new referral row
                new_ref = {
                    "referrer_id": referrer_uuid,
                    "referred_id": uuid,
                    "code": referral_code,
                    "hasDonated": True,
                }
                referrals_df = pd.concat(
                    [referrals_df, pd.DataFrame([new_ref])], ignore_index=True
                )

            referrals_df.to_csv("referrals.csv", index=False)

            # Award +10 points to referrer as a separate "bonus" donation entry
            # with amount 0 and path None, so all impact is derived from donations.csv
            if referrer_uuid is not None:
                bonus = {
                    "uuid": referrer_uuid,
                    "amount": 0,
                    "path": "Referral Bonus",
                    "impact_points": 10,
                    "hours": None,
                    "created_at": datetime.utcnow().isoformat(),
                }
                donations_df = pd.concat(
                    [donations_df, pd.DataFrame([bonus])], ignore_index=True
                )
                donations_df.to_csv("donations.csv", index=False)

    return {"status": "ok", "message": "Donation recorded!"}


@app.get("/hope_wall/messages")
def get_hope_wall_messages(limit: Optional[int] = None):
    """Return Hope Wall messages, combining defaults with persisted entries."""
    messages = combine_hope_wall_messages()
    if limit:
        messages = messages[:limit]
    return {"messages": messages}


@app.post("/hope_wall/messages")
def create_hope_wall_message(data: dict):
    """Persist a new Hope Wall message to CSV storage."""
    display_name = (data.get("display_name") or "").strip() or "Anonymous"
    message_text = (data.get("message") or "").strip()
    language = (data.get("language") or "en").strip() or "en"

    if not message_text:
        raise HTTPException(status_code=400, detail="message is required")
    if len(message_text) > 250:
        raise HTTPException(status_code=400, detail="message cannot exceed 250 characters")
    if len(display_name) > 50:
        raise HTTPException(status_code=400, detail="display_name cannot exceed 50 characters")

    created_date = datetime.datetime.now(datetime.timezone.utc).isoformat()
    new_message = {
        "id": gen_uuid(12),
        "display_name": display_name,
        "message": message_text,
        "language": language,
        "created_date": created_date,
        "is_approved": False,
    }

    messages_df = load_hope_wall_messages()
    messages_df = pd.concat([messages_df, pd.DataFrame([new_message])], ignore_index=True)
    messages_df.to_csv(MESSAGES_CSV, index=False)

    return {"status": "ok", "message": new_message}


@app.get("/users/{uuid}/badges")
def get_user_badges(uuid: str):
    """Return all badges a user has earned, joined with badge metadata."""
    has_df = load_has_badges()

    user_badges = has_df[has_df["uuid"] == uuid]
    if user_badges.empty:
        return {"badges": []}

    return {"badges": user_badges.to_dict(orient="records")}


@app.get("/users/{uuid}/donations")
def get_user_donations(uuid: str):
    """Return all donations for a user from donations.csv."""
    df = load_donations()
    user_df = df[df["uuid"] == uuid]
    # Sanitize the json output by replacing empty cells with a placeholder
    user_df = user_df.where(pd.notnull(user_df), " ")
    return {"donations": user_df.to_dict(orient="records")}


@app.get("/donations")
def get_donations(path: Optional[str] = None):
    """Return donations from donations.csv, optionally filtered by path.

    Query params:
    - path: if provided, only donations matching this path (e.g. WISDOM, COURAGE) are returned.
    """
    df = load_donations()
    if path:
        df = df[df["path"] == path]

    # Replace NaN/None with a placeholder string so JSON serialization is consistent
    df = df.where(pd.notnull(df), " ")
    return {"donations": df.to_dict(orient="records")}


@app.get("/users/{uuid}/referrals")
def get_user_referrals(uuid: str):
    """Return all referrals where this user is the referrer."""
    df = load_referrals()
    user_df = df[df["referrer_id"] == uuid]
    return {"referrals": user_df.to_dict(orient="records")}


@app.post("/users/{uuid}/badges")
def assign_badge(uuid: str, data: dict):
    """Assign a badge to a user if they don't already have it."""
    badge_id = data.get("badge_id")
    if not badge_id:
        raise HTTPException(status_code=400, detail="badge_id is required")

    has_df = load_has_badges()
    existing = has_df[(has_df["uuid"] == uuid) & (has_df["badge_id"] == badge_id)]
    if not existing.empty:
        return {"status": "ok", "message": "Badge already assigned"}

    new_row = {"uuid": uuid, "badge_id": badge_id}
    has_df = pd.concat([has_df, pd.DataFrame([new_row])], ignore_index=True)
    has_df.to_csv("hasBadges.csv", index=False)

    return {"status": "ok", "message": "Badge assigned"}


@app.get("/teams/{team_id}")
def get_team(team_id: str):
    """Return basic information about a team, including leader name."""
    try:
        teams_df = pd.read_csv("teams.csv")
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Team not found")

    team_df = teams_df[teams_df["team_id"] == team_id]
    if team_df.empty:
        raise HTTPException(status_code=404, detail="Team not found")

    team = team_df.iloc[0].to_dict()

    # Look up leader name from users.csv
    users_df = load_users()
    leader_df = users_df[users_df["uuid"] == team["leader_uuid"]]
    leader_name = None
    if not leader_df.empty:
        leader_row = leader_df.iloc[0].to_dict()
        leader_name = (
            f"{leader_row.get('fname', '')} {leader_row.get('lname', '')}".strip()
            or leader_row.get("email")
        )

    # Get member count
    member_count = len(users_df[users_df["team_id"] == team_id])

    team_payload = {
        "team_id": team["team_id"],
        "name": team["name"],
        "leader_uuid": team["leader_uuid"],
        "leader_name": leader_name,
        "member_count": member_count,
    }

    return {"team": team_payload}


@app.post("/create_team")
def create_team(data: dict):
    name = data.get("name")
    leader_uuid = data.get("leader_uuid")

    if not name or not leader_uuid:
        raise HTTPException(status_code=400, detail="name and leader_uuid are required")

    # Load or initialize teams.csv
    try:
        teams_df = pd.read_csv("teams.csv")
    except FileNotFoundError:
        teams_df = pd.DataFrame(columns=["team_id", "name", "leader_uuid"])

    new_team = {
        "team_id": gen_uuid(),
        "name": name,
        "leader_uuid": leader_uuid,
    }
    teams_df = pd.concat([teams_df, pd.DataFrame([new_team])], ignore_index=True)
    teams_df.to_csv("teams.csv", index=False)

    # Ensure the leader is a member of their new team
    users_df = load_users()
    users_df.loc[users_df["uuid"] == leader_uuid, "team_id"] = new_team["team_id"]
    users_df.to_csv("users.csv", index=False)

    return {"status": "ok", "message": "Team created", "team": new_team}


@app.post("/join_team")
def join_team(data: dict):
    team_id = data.get("team_id")
    member_uuid = data.get("member_uuid")

    if not team_id or not member_uuid:
        raise HTTPException(
            status_code=400, detail="team_id and member_uuid are required"
        )

    # Verify team exists
    try:
        teams_df = pd.read_csv("teams.csv")
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Team not found")

    if team_id not in teams_df["team_id"].values:
        raise HTTPException(status_code=404, detail="Team not found")

    # Update the member's team_id in users.csv
    users_df = load_users()
    users_df.loc[users_df["uuid"] == member_uuid, "team_id"] = team_id
    users_df.to_csv("users.csv", index=False)

    return {"status": "ok", "message": "Joined team"}


@app.post("/leave_team")
def leave_team(data: dict):
    member_uuid = data.get("member_uuid")

    if not member_uuid:
        raise HTTPException(status_code=400, detail="member_uuid is required")

    users_df = load_users()

    users_df.loc[users_df["uuid"] == member_uuid, "team_id"] = None
    users_df.to_csv("users.csv", index=False)

    return {"status": "ok", "message": "Left team"}


@app.post("/transfer_team_leadership")
def transfer_team_leadership(data: dict):
    team_id = data.get("team_id")
    new_leader_uuid = data.get("new_leader_uuid")

    if not team_id or not new_leader_uuid:
        raise HTTPException(
            status_code=400, detail="team_id and new_leader_uuid are required"
        )

    try:
        teams_df = pd.read_csv("teams.csv")
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Team not found")

    if team_id not in teams_df["team_id"].values:
        raise HTTPException(status_code=404, detail="Team not found")

    teams_df.loc[teams_df["team_id"] == team_id, "leader_uuid"] = new_leader_uuid
    teams_df.to_csv("teams.csv", index=False)

    return {"status": "ok", "message": "Team leadership transferred"}


@app.get("/leaderboard/supporters")
def get_top_supporters(path: Optional[str] = None):
    """Return top supporters (users) ranked by impact points from donations.

    Optional query param 'path' to filter by donation path (e.g., WISDOM, COURAGE, etc.).
    """
    donations_df = load_donations()
    users_df = load_users()

    # Filter by path if specified
    if path and path != "ALL":
        donations_df = donations_df[donations_df["path"] == path]

    # Group by user and sum impact_points
    user_stats = (
        donations_df.groupby("uuid")
        .agg({"impact_points": "sum", "amount": "sum"})
        .reset_index()
    )

    # Count donations per user
    donation_counts = (
        donations_df.groupby("uuid").size().reset_index(name="donation_count")
    )
    user_stats = user_stats.merge(donation_counts, on="uuid")

    # Determine primary path for each user (most donations in that path)
    path_counts = (
        donations_df.groupby(["uuid", "path"]).size().reset_index(name="count")
    )
    primary_paths = path_counts.loc[path_counts.groupby("uuid")["count"].idxmax()][
        ["uuid", "path"]
    ]
    primary_paths.rename(columns={"path": "primary_path"}, inplace=True)
    user_stats = user_stats.merge(primary_paths, on="uuid", how="left")

    # Join with user info
    user_stats = user_stats.merge(
        users_df[["uuid", "fname", "lname", "email"]], on="uuid", how="left"
    )

    # Build display name
    user_stats["display_name"] = user_stats.apply(
        lambda row: (
            f"{row['fname']} {row['lname']}".strip()
            if pd.notna(row["fname"]) and pd.notna(row["lname"])
            else row["email"]
        ),
        axis=1,
    )

    # Sort by impact_points descending
    user_stats = user_stats.sort_values("impact_points", ascending=False)

    # Build result
    leaderboard = []
    for _, row in user_stats.iterrows():
        leaderboard.append(
            {
                "user_id": row["uuid"],
                "display_name": row["display_name"],
                "total_points": (
                    int(row["impact_points"]) if pd.notna(row["impact_points"]) else 0
                ),
                "total_donations": int(row["donation_count"]),
                "primary_path": (
                    row["primary_path"] if pd.notna(row["primary_path"]) else None
                ),
            }
        )

    return {"supporters": leaderboard}


@app.get("/leaderboard/teams")
def get_top_teams():
    """Return top teams ranked by total impact points of all members."""
    try:
        teams_df = pd.read_csv("teams.csv")
    except FileNotFoundError:
        return {"teams": []}

    users_df = load_users()
    donations_df = load_donations()

    # Calculate total points per user from donations
    user_points = donations_df.groupby("uuid")["impact_points"].sum().reset_index()
    user_points.rename(columns={"impact_points": "total_points"}, inplace=True)

    # Build team leaderboard
    team_leaderboard = []
    for _, team in teams_df.iterrows():
        team_id = team["team_id"]
        team_name = team["name"]
        leader_uuid = team["leader_uuid"]

        # Get all members of this team
        members = users_df[users_df["team_id"] == team_id]
        member_count = len(members)

        # Sum points from all members
        member_uuids = members["uuid"].tolist()
        team_points = user_points[user_points["uuid"].isin(member_uuids)][
            "total_points"
        ].sum()

        # Get leader name
        leader_row = users_df[users_df["uuid"] == leader_uuid]
        leader_name = None
        if not leader_row.empty:
            leader = leader_row.iloc[0]
            leader_name = (
                f"{leader.get('fname', '')} {leader.get('lname', '')}".strip()
                or leader.get("email")
            )

        team_leaderboard.append(
            {
                "team_id": team_id,
                "name": team_name,
                "leader_uuid": leader_uuid,
                "leader_name": leader_name,
                "member_count": member_count,
                "total_points": int(team_points) if pd.notna(team_points) else 0,
            }
        )

    # Sort by total_points descending
    team_leaderboard.sort(key=lambda t: t["total_points"], reverse=True)

    return {"teams": team_leaderboard}


@app.get("/me")
def me(session: Optional[str] = Cookie(default=None)):
    """Return the current logged in user based on the session cookie.

    If no valid session is found, returns logged_in: False.
    """
    if not session:
        return {"logged_in": False}

    df = load_users()
    user_df = df[df["uuid"] == session]

    if user_df.empty:
        return {"logged_in": False}

    user = user_df.iloc[0].to_dict()
    user_sanitized = {k: v for k, v in user.items() if k != "password"}

    # Derive aggregate stats from donations
    donations_df = load_donations()
    user_donations = donations_df[donations_df["uuid"] == session]

    if not user_donations.empty:
        total_points = user_donations["impact_points"].fillna(0).sum()
        total_amount = (
            user_donations["amount"].fillna(0).sum()
            if "amount" in user_donations.columns
            else 0
        )
        total_donations = len(user_donations)

        volunteer_hours = 0
        if "hours" in user_donations.columns:
            volunteer_hours = (
                user_donations[user_donations["path"] == "SERVICE"]["hours"]
                .fillna(0)
                .sum()
            )
    else:
        total_points = 0
        total_amount = 0
        total_donations = 0
        volunteer_hours = 0

    user_sanitized["total_points"] = int(total_points)
    user_sanitized["total_amount"] = float(total_amount)
    user_sanitized["total_donations"] = int(total_donations)
    user_sanitized["volunteer_hours"] = float(volunteer_hours)

    return {"logged_in": True, "user": user_sanitized}
