import pandas as pd
import random
from main import gen_uuid

# Teams data
teams_data = [
    {"name": "Hope Warriors"},
    {"name": "Courage Collective"},
    {"name": "Protection Guardians"},
    {"name": "Service Stars"},
]

# Create teams with UUIDs
# teams = []
# for team_data in teams_data:
#     team = {"team_id": gen_uuid(), "name": team_data["name"], "leader_uuid": ""}
#     teams.append(team)

# # Create DataFrame
# teams_df = pd.DataFrame(teams)

# df = pd.read_csv("teams.csv")

# teams_df = pd.concat([df, teams_df], ignore_index=True)
# teams_df.to_csv("teams.csv", index=False)

# Now assign users to teams
teams_df = pd.read_csv("teams.csv")
users_df = pd.read_csv("users.csv")

# Get list of team UUIDs
team_uuids = teams_df["team_id"].tolist()[1:]
print(team_uuids)
# exit(1)

# Only assign teams to users who don't already have one
unassigned_users = users_df[users_df["team_id"].isnull()].index.tolist()

print(users_df)

# Randomly assign 70-80% of unassigned users to teams
num_users_to_assign = int(len(unassigned_users) * random.uniform(0.70, 0.80))
users_to_assign = random.sample(unassigned_users, num_users_to_assign)

for idx in users_to_assign:
    # users_df.at[idx, "team_id"] = random.choice(team_uuids)
    users_df.loc[idx, "team_id"] = random.choice(team_uuids)

# Assign a random leader to each team that has members
for team_id in team_uuids:
    team_members = users_df[users_df["team_id"] == team_id]
    if len(team_members) > 0:
        leader = team_members.sample(n=1).iloc[0]
        teams_df.loc[teams_df["team_id"] == team_id, "leader_uuid"] = leader["uuid"]

# Save teams to CSV
teams_df.to_csv("teams.csv", index=False)

# Save updated users
users_df.to_csv("users.csv", index=False)

print(f"Successfully created {len(teams_df)} teams!")
print("\nTeams:")
print(teams_df.to_string(index=False))

print("\n" + "=" * 50)
print(f"\nAssigned {num_users_to_assign} out of {len(users_df)} users to teams")
print(f"Unassigned users: {len(users_df) - num_users_to_assign}")

# Show team distribution with leaders
print("\nUsers per team (with leaders):")
for _, team in teams_df.iterrows():
    team_id = team["team_id"]
    team_name = team["name"]
    team_members = users_df[users_df["team_id"] == team_id]
    count = len(team_members)

    if count > 0:
        leader = users_df[users_df["uuid"] == team["leader_uuid"]]
        if not leader.empty:
            leader_name = f"{leader.iloc[0]['fname']} {leader.iloc[0]['lname']}"
            print(f"  {team_name}: {count} users (Leader: {leader_name})")
        else:
            print(f"  {team_name}: {count} users")
    else:
        print(f"  {team_name}: {count} users (No leader)")

print("\nSample users with teams:")
print(
    users_df[users_df["team_id"] != ""][["fname", "lname", "email", "team_id"]]
    .head(10)
    .to_string(index=False)
)
