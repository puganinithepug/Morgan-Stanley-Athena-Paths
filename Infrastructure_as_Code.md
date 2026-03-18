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

## Run Terraform Commands:

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

## 1. Terraform reads _*.tf_ and applies configurations, to provision infrustructure:

The AWS EC2 instance is configured with respect to the *.tf files:
- Terraform reads _compute.tf_ to provision an EC2 instance with specified instance type, VPC security groups and subnet
- _variables.tf_ defines configurable values for Terraform deployment
- Associates the instance with a subnet and a security group from _networking.tf_ 
- The _user_data.sh_ script is included in the _compute.tf_ configuration
  
## 2. The AWS EC2 instance is launched using Amazon Linux 2 AMI, when it boots the _user_data.sh_ script runs automatically

This script performs the following:
- Installs Docker and Git on the instance
- Starts the Docker service and ensures it runs on boot
- Installs Docker Compose to manage multi-container applications
- Clones your app repository from GitHub
- Starts the application using docker-compose in detached mode (docker-compose up -d)

## 3. The AWS EC2 instance is placed in a public subnet,in a VPC with internet access, secured by security groups
- _security.tf_ defines the security group to control inbound and outbound traffic to the EC2 instance
- _versions.tf_ specifies version required for Terraform and version for AWS provider, the AWS provider is defined in _provider.tf_

## 4. Elastic IP is associated with the EC2 instance for static access
- The instance does not have a public IP initially, via _compute.tf_ the instance gets an elastic IP associated with it for access via static IP 

## 5 After deployment, Terraform outputs:
- the outputs are defined in the _outputs.tf_ configuration
  - Public IP: this is the public IP address of the EC2 where the Athena Paths web application is running
  - Application URL: Unless the domain has been configured, is the IP address for accessing the Athena Paths web application

## Destroy Infrastructure:
```bash
terraform destroy
```
