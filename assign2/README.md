# _Assignment 2 - Working in AWS CloudFormation_

In our assignment, we were tasked to define a template that can be used to define an infrastructure for a web application in AWS CloudFormation.

# Objectives

1. Interpret how the network should be configured through the diagram provided in class 
2. Write the appropriate network environment & servers in YAML and build through AWS CloudFormation
3. Visualize the interpreted solution via diagram

# Description of Solution

The design requires that the application should be contained within a Virtual Private Cloud (VPC) that can be scaled between two AWS availability zones.

The solution is divided into 3 separate templates, and are created as stacks in this order:
1. `network.yml` - Creates the network environment
2. `databases.yml` - Creates the database servers inside the VPC
3. `servers.yml` - instantiates the servers where the web application will hosted inside the VPC

The setup was created on the us-east-2 (Ohio) region.

## The Network

The core components of the network consists of a VPC containing two public and private subnets across 2 availability zones. Each public subnet contains a NAT Gateway with an Elastic IP assigned, which will route traffic into the corresponding private subnet in its availability zone. Each subnet has the CIDR addresses blocks reserved:
- Public Subnet 1: `10.0.0.0/24`
- Public Subnet 2: `10.0.1.0/24`
- Private Subnet 1: `10.0.2.0/24`
- Private Subnet 2: `10.0.3.0/24`

## The Servers

An Auto Scaling Group will generate a minimum of two EC2 (t3.micro) instances of the web application using the standard free tier Amazon Linux 2 AMI that resides in the private subnet. Each server has a configured firewall to only allow connections through ports 22 (SSH) and 80 (HTTP) with a Apache configuration installed. The web application will be accessible via the NAT Gateway routing traffic through the public subnet. A load balancer is placed between the internet gateway and public NAT Gateways that will listen for traffic and determine which avaiability zone to send requests to.

The MySQL databases are individually set up as EC2 instances with similar firewall configurations to account for port 3306 (MySQL) connections, however differ in that they can't be accessed publically, as they should no be able to be pinged from the public internet; ideally, they should only be referenced by the web server within the private subnet.

## Issues during setup

I have come across issues specific to my account that limits me on the number vCPUs that can be active at one time. I have been able to verify that server and database setups are correctly generated, but due to aforementioned issues, I was not able to have both web and database servers up simultaneously at the time of submission.

I have also experienced a scenario where a stack fails to delete after initializing a request, which I had recieved assistance from the professor to correct. In manually deleting a stack, I had learned that resources created in CloudFormation must be deleted in the reverse order which they were created; I could not remove my network stack before I remove my web server stack, for example.

# Current Challenges

One particular challenge I've faced with this project are some concepts that I have trouble wrapping my head around. I understand that system resources are allocated at the time of stack creation, but the concept I struggle with is how and when these resources can be referenced dynamically within a template, especially when (ideally) the database servers should only be open to connections from within the private subnet. As such, I am able to instantiate database servers, but currently have trouble understanding how to expose their location within the context of CloudFormation.
