import pandas as pd
import random
from datetime import datetime, timedelta

# Read existing users
users_df = pd.read_csv("users.csv")

# Donation paths
paths = ["PROTECTION", "COURAGE", "WISDOM", "SERVICE", "JUSTICE"]


# Function to generate random amount
def random_amount():
    return round(random.uniform(0.5, 15.0), 0) * 10


# Function to calculate impact points (seems to be amount * 1.5 for most, or based on hours)
def calculate_impact_points(amount, hours):
    if hours > 0:
        return hours * 10.0  # 10 points per hour for SERVICE
    else:
        return amount * 1.5


# Function to generate random date in the last 30 days
def random_date():
    days_ago = random.randint(0, 30)
    date = datetime.now() - timedelta(days=days_ago)
    # Randomly choose format (some with timezone, some without)
    if random.choice([True, False]):
        return date.isoformat() + "+00:00"
    else:
        return date.isoformat()


# Generate donations
donations = []

# Generate 2-5 donations per user
for _, user in users_df.iterrows():
    print(f"Generating donations for user {user['email']}")
    num_donations = random.randint(2, 5)
    print(f"  Number of donations to create: {num_donations}")

    for _ in range(num_donations):
        path = random.choice(paths)

        # SERVICE donations can have hours instead of amount
        if path == "SERVICE":
            hours = round(random.uniform(1.0, 4.0), 0)
            amount = 0
            impact_points = calculate_impact_points(0, hours)
        else:
            amount = random_amount()
            hours = 0.0
            impact_points = calculate_impact_points(amount, 0)

        donation = {
            "uuid": user["uuid"],
            "path": path,
            "amount": amount,
            "impact_points": impact_points,
            "hours": hours,
            "created_at": random_date(),
        }
        donations.append(donation)

# Sort by created_at
# donations_df = donations_df.sort_values("created_at")
original_donations = pd.read_csv("donations.csv")
donations_df = pd.DataFrame(donations)

donations_df = pd.concat([original_donations, donations_df], ignore_index=True)

# Save to CSV
donations_df.to_csv("donations.csv", index=False)

print(f"Successfully created {len(donations)} donations!")
print(f"\nDonations by path:")
print(donations_df["path"].value_counts())
print(f"\nTotal donation amount: ${donations_df['amount'].sum():,.2f}")
print(f"\nTotal volunteer hours: {donations_df['hours'].sum():.1f}")
print(f"\nTotal impact points: {donations_df['impact_points'].sum():,.1f}")
print(f"\nSample donations:")
print(donations_df.head(10))
