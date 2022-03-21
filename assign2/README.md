# _Assignment 2 - Working in AWS CloudFormation_

# Objectives

1. Interpret how the network should be configured through the diagram provided in class 
2. Write the appropriate network environment & servers in YAML and build through AWS CloudFormation
3. Visualize my solution via digram

# Description of Solution

The design requires that the application is to be contained within a Virtual Private Cloud (VPC), as well as to be scaled between two AWS availability zones.

The solution is divided into 3 separate templates, and are created as stacks in this order:
1. `network.yml` - Creates the network environment
2. `databases.yml` - Creates the database servers inside the VPC
3. `servers.yml` - instantiates the servers where the web application will hosted inside the VPC

The setup was created on the us-east-2 (Ohio) availability zone.

## The Network

The core components of the network consists of a VPC containing two public and private subnets residing in different availability zones. Each public subnet contains a NAT Gateway with an Elastic IP assigned, which will route traffic into a corresponding private subnet.

## The Servers

An Auto Scaling Group will generate a minimum of two EC2 (t3.micro) instances of the web application that reside in the private subnet, each loaded with the default Apache configurations. The web application will be accessible via the NAT Gateway routing traffic through the public subnet. A load balancer is placed between the internet gateway and public NAT Gateways that will listen for traffic and determine which avaiability zone to send requests to.

The web application can be reached via the following public link:
WebSe-WebAp-AUA4FYRBR69F-1482301780.us-east-2.elb.amazonaws.com

The MySQL databases are individually set up as EC2 instances, however, but do not have the same setup, as they should no be able to be pinged from the public internet like the web servers. Ideally, they should only be referenced by the web server within the same private subnet.

## Issues during setup

I have come across issues specific to my account that limits me on the number vCPUs that can be active at one time. I have been able to verify that server and database setups are correctly generated, but due to aforementioned issues, I was not able to have both web and database servers up simultaneously at the time of submission.

I have also experienced a scenario where a stack fails to delete after initializing a request, which I had recieved assistance from the professor to correct. In manually deleting a stack, I had learned that resources created in CloudFormation must be deleted in the reverse order which they were created; I could not remove my network stack before I remove my web server stack, for example.

# Current Challenges

One particular challenge I've faced with this project are some concepts that I have trouble wrapping my head around. I understand that system resources are allocated at the time of stack creation, but the concept I struggle with is how and when these resources can be referenced dynamically within a template, especially when (ideally) the database servers should only be open to connections from within the private subnet. As such, I am able to instantiate database servers, but currently have trouble understanding how to expose their location within the context of CloudFormation.