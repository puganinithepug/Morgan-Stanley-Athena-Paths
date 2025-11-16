import pandas as pd
from datetime import datetime

# Load data
users_df = pd.read_csv("users.csv")
donations_df = pd.read_csv("donations.csv")
teams_df = pd.read_csv("teams.csv")

# Badge definitions matching your frontend
BADGE_IDS = {
    "FIRST_DONATION": "first_donation",
    "WISDOM_SUPPORTER": "wisdom_supporter",
    "COURAGE_SUPPORTER": "courage_supporter",
    "PROTECTION_SUPPORTER": "protection_supporter",
    "SERVICE_SUPPORTER": "service_supporter",
    "ALL_PATHS": "all_paths",
    "HUNDRED_CLUB": "hundred_club",
    "FIVE_HUNDRED_CLUB": "five_hundred_club",
    "SERVICE_VOLUNTEER": "service_volunteer",
    "TEAM_PLAYER": "team_player",
    "TEAM_LEADER": "team_leader",
}


def check_badges_for_user(user, user_donations, team_member_count=0):
    """Check which badges a user has earned"""
    badges = []

    # Calculate total points and volunteer hours
    total_points = user_donations["impact_points"].sum()
    volunteer_hours = user_donations["hours"].sum()

    # FIRST_DONATION: Made at least one donation
    if len(user_donations) >= 1:
        badges.append(BADGE_IDS["FIRST_DONATION"])

    # Path-specific supporters (5 donations to each path)
    wisdom_count = len(user_donations[user_donations["path"] == "WISDOM"])
    if wisdom_count >= 5:
        badges.append(BADGE_IDS["WISDOM_SUPPORTER"])

    courage_count = len(user_donations[user_donations["path"] == "COURAGE"])
    if courage_count >= 5:
        badges.append(BADGE_IDS["COURAGE_SUPPORTER"])

    protection_count = len(user_donations[user_donations["path"] == "PROTECTION"])
    if protection_count >= 5:
        badges.append(BADGE_IDS["PROTECTION_SUPPORTER"])

    service_count = len(user_donations[user_donations["path"] == "SERVICE"])
    if service_count >= 5:
        badges.append(BADGE_IDS["SERVICE_SUPPORTER"])

    # ALL_PATHS: Donated to all paths (WISDOM, COURAGE, PROTECTION)
    paths = set(user_donations["path"].unique())
    if {"WISDOM", "COURAGE", "PROTECTION"}.issubset(paths):
        badges.append(BADGE_IDS["ALL_PATHS"])

    # HUNDRED_CLUB: 100+ impact points
    if total_points >= 100:
        badges.append(BADGE_IDS["HUNDRED_CLUB"])

    # FIVE_HUNDRED_CLUB: 500+ impact points
    if total_points >= 500:
        badges.append(BADGE_IDS["FIVE_HUNDRED_CLUB"])

    # SERVICE_VOLUNTEER: 10+ volunteer hours
    if volunteer_hours >= 10:
        badges.append(BADGE_IDS["SERVICE_VOLUNTEER"])

    # TEAM_PLAYER: Has a team_id
    if user["team_id"] and user["team_id"] != "":
        badges.append(BADGE_IDS["TEAM_PLAYER"])

    # TEAM_LEADER: Is a team leader with 5+ members
    if team_member_count >= 5:
        badges.append(BADGE_IDS["TEAM_LEADER"])

    return badges


# Generate badges for all users
all_badges = []

for _, user in users_df.iterrows():
    user_uuid = user["uuid"]

    # Get user's donations
    user_donations = donations_df[donations_df["uuid"] == user_uuid]

    # Check if user is a team leader and get member count
    team_member_count = 0
    if user["team_id"] and user["team_id"] != "":
        user_team = teams_df[teams_df["leader_uuid"] == user_uuid]
        if not user_team.empty:
            # Count team members
            team_id = user["team_id"]
            team_member_count = len(users_df[users_df["team_id"] == team_id])

    # Get badges for this user
    user_badges = check_badges_for_user(user, user_donations, team_member_count)

    # Add earned_at timestamp for each badge
    # earned_at = datetime.now().isoformat()

    for badge_id in user_badges:
        all_badges.append({"uuid": user_uuid, "badge_id": badge_id})

# Create badges DataFrame
badges_df = pd.DataFrame(all_badges)

# Save to CSV
badges_df.to_csv("badges.csv", index=False)

print(f"Successfully generated {len(all_badges)} badges for {len(users_df)} users!")
print(f"\nBadge distribution:")
if len(badges_df) > 0:
    badge_counts = badges_df["badge_id"].value_counts()
    for badge_id, count in badge_counts.items():
        print(f"  {badge_id}: {count} users")

    print(f"\nUsers with badges: {badges_df['uuid'].nunique()}")
    print(f"Users without badges: {len(users_df) - badges_df['uuid'].nunique()}")

    # Show some sample badges
    print(f"\nSample badges:")
    sample = badges_df.head(10).merge(
        users_df[["uuid", "fname", "lname"]], on="uuid", how="left"
    )
    print(sample[["fname", "lname", "badge_id"]].to_string(index=False))
else:
    print("No badges were awarded. Users may not have enough donations yet.")
