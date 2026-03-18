Infrastructure as Code

Infrastructure directory organization:
  infrastructure/
  ├── *.tf
  └── user_data.sh

Prerequisites:
  - AWS account
  - EC2 key pair
  - AWS credentials configured locally
  - Terraform

Install Terraform (Kali Linux):
```bash
sudo apt-get update && sudo apt-get install -y gnupg software-properties-common curl
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update
sudo apt install terraform
```

Verify:
```bash
terraform -version
```
Configure AWS Credentials:
```bash
export AWS_ACCESS_KEY_ID=****
export AWS_SECRET_ACCESS_KEY=****
export AWS_DEFAULT_REGION=us-east-1
```

Run Terraform commands:
## 1. Terraform applies configurations:
The AWS EC2 instance is configured with respect to the *.tf files:
- Terraform reads the _compute.tf_ file and provisions an EC2 instance using the latest Amazon Linux 2 AMI
- _variables.tf_ defines configurable values for Terraform deployment
- Associates the instance with a subnet and a security group from _networking.tf_
- The _user_data.sh_ script is included in the EC2 instance configuration
- When the instance boots for the first time, the script runs automatically
- _security.tf_ defines the security group to control inbound and outbound traffic to the EC2 instance.
- _versions.tf_ specifies version required for Terraform and version for AWS provider, the AWS provider is defined in _provider.tf_
This script performs the following:
- Installs Docker and Git on the instance.
- Starts the Docker service and ensures it runs on boot.
- Installs Docker Compose to manage multi-container applications.
- Clones your app repository from GitHub.
- Starts the application using docker-compose in detached mode (docker-compose up -d).


```bash
cd infrastructure
chmod +x user_data.sh
terraform init
terraform apply
```
When the user runs _terraform apply_ command:
- Terraform provisions the necessary AWS resources (EC2 instance) according to configurations in the *.tf files
- Terraform launches an EC2 instance that is configured with the settings in the user_data.sh file and other *.tf configurations
- When the EC2 instance starts, Terraform executes the user_data.sh script 
- user_data.sh script runs once, it installs Docker, pulls the Docker image, clones the repo, and starts the app

After deployment, Terraform outputs:
- the outputs are defined in the _outputs.tf_ configuration
  - Public IP: this is the public IP address of the EC2 where the Athena Paths web application is running
  - Application URL: Unless the domain has been configured, is the IP address for accessing the Athena Paths web application

Destroy Infrastructure:
```bash
terraform destroy
```
