from fastapi import FastAPI, HTTPException, Response, Cookie
from fastapi.middleware.cors import CORSMiddleware

import hashlib, base64, re, time, secrets, bcrypt
from typing import Optional
import pandas as pd
import datetime

salt = bcrypt.gensalt()

origins = [
    "http://localhost:3000",  # your React dev server
    "http://127.0.0.1:3000",  # sometimes React uses 127.0.0.1
]

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
        "created_at": datetime.datetime.now(datetime.UTC).isoformat(),
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
    # Sanitize the json output by replacing empty cells with None
    user_df = user_df.where(pd.notnull(user_df), " ")
    return {"donations": user_df.to_dict(orient="records")}


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

    return {"logged_in": True, "user": user_sanitized}
