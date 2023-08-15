# WooCart E-Commerce Microservices Project

Welcome to the WooCart E-Commerce Microservices Project. This project is designed to demonstrate the implementation of an e-commerce platform using a microservices architecture. The application is built using a diverse tech stack, including NextJS, NodeJS, MongoDB, PostgreSQL, Redis, Golang, Apache Kafka, Docker, Kubernetes, and GitHub Actions for CI/CD.

## Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Microservices Architecture](#microservices-architecture)
- [Deployment](#deployment)
  - [Docker](#docker)
  - [Kubernetes](#kubernetes)
- [CI/CD](#cicd)
- [Communication](#communication)

## Introduction

The E-Commerce Microservices Project is a comprehensive example of building a scalable and modular e-commerce platform. It focuses on utilizing microservices to manage different aspects of the application, such as user authentication, product management, order processing, and more. This project aims to provide developers with insights into designing, developing, and deploying microservices-based applications using cutting-edge technologies.

## Tech Stack

The project leverages the following technologies:

- **NodeJS**: JavaScript runtime for server-side scripting.
- **Golang**: Backend programming language for microservices.
- **NextJS**: Frontend framework for building user interfaces.
- **MongoDB**: NoSQL database for flexible and scalable data storage.
- **PostgreSQL**: Relational database for structured data storage.
- **Redis**: In-memory data store for caching and session management.
- **Apache**: Kafka: Distributed event streaming platform for communication.
- **TypeScript**: Typescript for more bug free code.
- **Docker**: Containerization platform for packaging applications.
- **Kubernetes**: Container orchestration for managing deployment and scaling.
- **GitHub Actions**: CI/CD workflow automation.

## Microservices Architecture

The project embraces a microservices architecture, where specialized services handle distinct functionalities. Notable microservices include:

- **Authentication Service**: Manages user registration, login, and authentication.
- **Product Service**: Handles product catalog management and details.
- **Order Service**: Deals with order creation, payment, and fulfillment.

And there's more...

Microservices communicate through APIs and events, facilitated by Apache Kafka.

## Deployment

### Docker

You can containerize the application using Docker. Dockerfiles for each microservice are located within their respective directories. Docker Compose can be employed to manage and orchestrate the containers.

### Kubernetes

For production-grade deployment, Kubernetes is recommended. Kubernetes manifests for each microservice can be found in the `k8s` directory. Utilize the command `kubectl apply -f` to deploy these manifests.

## Continuous Integration and Continuous Deployment (CI/CD)

GitHub Actions automates CI/CD. Upon pushing code to the repository, predefined workflows will build, test, and deploy the application to your Kubernetes cluster.

## Communication

If you have queries or require assistance, don't hesitate to reach out to our community:

- Join me on LinkedIn [LinkedIn](https://www.linkedin.com/in/majumdarsourav/)
