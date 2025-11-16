import pandas as pd
import bcrypt
from main import gen_uuid

# Generate salt (or use your existing salt)
salt = bcrypt.gensalt()

# Your 50 users data
users_data = [
    {"firstName": "Emma", "lastName": "Thompson", "email": "emma.thompson@company.com"},
    {"firstName": "Michael", "lastName": "Chen", "email": "michael.chen@company.com"},
    {
        "firstName": "Sarah",
        "lastName": "Martinez",
        "email": "sarah.martinez@company.com",
    },
    {"firstName": "David", "lastName": "Johnson", "email": "david.johnson@company.com"},
    {"firstName": "Lisa", "lastName": "Anderson", "email": "lisa.anderson@company.com"},
    {"firstName": "James", "lastName": "Wilson", "email": "james.wilson@company.com"},
    {"firstName": "Rachel", "lastName": "Kim", "email": "rachel.kim@company.com"},
    {
        "firstName": "Christopher",
        "lastName": "Brown",
        "email": "christopher.brown@company.com",
    },
    {"firstName": "Amanda", "lastName": "Davis", "email": "amanda.davis@company.com"},
    {"firstName": "Ryan", "lastName": "Garcia", "email": "ryan.garcia@company.com"},
    {
        "firstName": "Jennifer",
        "lastName": "Taylor",
        "email": "jennifer.taylor@company.com",
    },
    {"firstName": "Daniel", "lastName": "Lee", "email": "daniel.lee@company.com"},
    {
        "firstName": "Michelle",
        "lastName": "White",
        "email": "michelle.white@company.com",
    },
    {"firstName": "Kevin", "lastName": "Harris", "email": "kevin.harris@company.com"},
    {"firstName": "Nicole", "lastName": "Clark", "email": "nicole.clark@company.com"},
    {"firstName": "Brandon", "lastName": "Lewis", "email": "brandon.lewis@company.com"},
    {
        "firstName": "Stephanie",
        "lastName": "Walker",
        "email": "stephanie.walker@company.com",
    },
    {"firstName": "Jason", "lastName": "Hall", "email": "jason.hall@company.com"},
    {"firstName": "Lauren", "lastName": "Allen", "email": "lauren.allen@company.com"},
    {"firstName": "Matthew", "lastName": "Young", "email": "matthew.young@company.com"},
    {"firstName": "Ashley", "lastName": "King", "email": "ashley.king@company.com"},
    {"firstName": "Brian", "lastName": "Wright", "email": "brian.wright@company.com"},
    {"firstName": "Megan", "lastName": "Lopez", "email": "megan.lopez@company.com"},
    {"firstName": "Eric", "lastName": "Hill", "email": "eric.hill@company.com"},
    {
        "firstName": "Samantha",
        "lastName": "Scott",
        "email": "samantha.scott@company.com",
    },
    {"firstName": "Anthony", "lastName": "Green", "email": "anthony.green@company.com"},
    {"firstName": "Rebecca", "lastName": "Adams", "email": "rebecca.adams@company.com"},
    {"firstName": "Justin", "lastName": "Baker", "email": "justin.baker@company.com"},
    {
        "firstName": "Katherine",
        "lastName": "Nelson",
        "email": "katherine.nelson@company.com",
    },
    {"firstName": "Tyler", "lastName": "Carter", "email": "tyler.carter@company.com"},
    {
        "firstName": "Olivia",
        "lastName": "Mitchell",
        "email": "olivia.mitchell@company.com",
    },
    {"firstName": "Joshua", "lastName": "Perez", "email": "joshua.perez@company.com"},
    {
        "firstName": "Victoria",
        "lastName": "Roberts",
        "email": "victoria.roberts@company.com",
    },
    {"firstName": "Nathan", "lastName": "Turner", "email": "nathan.turner@company.com"},
    {
        "firstName": "Emily",
        "lastName": "Phillips",
        "email": "emily.phillips@company.com",
    },
    {
        "firstName": "Andrew",
        "lastName": "Campbell",
        "email": "andrew.campbell@company.com",
    },
    {
        "firstName": "Melissa",
        "lastName": "Parker",
        "email": "melissa.parker@company.com",
    },
    {"firstName": "Patrick", "lastName": "Evans", "email": "patrick.evans@company.com"},
    {
        "firstName": "Jessica",
        "lastName": "Edwards",
        "email": "jessica.edwards@company.com",
    },
    {
        "firstName": "Steven",
        "lastName": "Collins",
        "email": "steven.collins@company.com",
    },
    {
        "firstName": "Angela",
        "lastName": "Stewart",
        "email": "angela.stewart@company.com",
    },
    {"firstName": "Jacob", "lastName": "Sanchez", "email": "jacob.sanchez@company.com"},
    {
        "firstName": "Christina",
        "lastName": "Morris",
        "email": "christina.morris@company.com",
    },
    {
        "firstName": "Alexander",
        "lastName": "Rogers",
        "email": "alexander.rogers@company.com",
    },
    {"firstName": "Laura", "lastName": "Reed", "email": "laura.reed@company.com"},
    {"firstName": "Timothy", "lastName": "Cook", "email": "timothy.cook@company.com"},
    {
        "firstName": "Brittany",
        "lastName": "Morgan",
        "email": "brittany.morgan@company.com",
    },
    {"firstName": "Jonathan", "lastName": "Bell", "email": "jonathan.bell@company.com"},
    {
        "firstName": "Natalie",
        "lastName": "Murphy",
        "email": "natalie.murphy@company.com",
    },
    {
        "firstName": "Gregory",
        "lastName": "Bailey",
        "email": "gregory.bailey@company.com",
    },
]

# Default password for all users (you can change this)
default_password = "123"

# Create users list
users = []
for user_data in users_data:
    encrypted_password = bcrypt.hashpw(default_password.encode("utf-8"), salt).decode(
        "utf-8"
    )

    user = {
        "uuid": gen_uuid(),
        "email": user_data["email"],
        "password": encrypted_password,
        "fname": user_data["firstName"],
        "lname": user_data["lastName"],
        "team_id": "",
    }
    users.append(user)

# Create DataFrame
df = pd.DataFrame(users)

# Save to CSV
# Append to csv:

df = pd.concat([pd.read_csv("users.csv"), df], ignore_index=True)

df.to_csv("users.csv", index=False)

print(f"Successfully created {len(users)} users!")
print(f"Default password for all users: {default_password}")
print("\nFirst 5 users:")
print(df[["email", "fname", "lname"]].head())
