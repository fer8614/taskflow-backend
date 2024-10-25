# TaskFlow Backend

Backend for the TaskFlow web application, a Full Stack MERN project (MongoDB, Express, React, Node) with TypeScript, React Query, Next.js, and Tailwind CSS.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Docs SWAGGER](#API-Documentation)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

TaskFlow is a task management web application designed to help users organize and manage their tasks efficiently. This repository contains the backend code for the TaskFlow application, built using Node.js, Express, and MongoDB, with TypeScript for type safety.

## Features

- User authentication and authorization
- Task creation, updating, and deletion
- Task categorization and prioritization
- Real-time updates with WebSockets
- RESTful API design

## Technologies

- **Backend**: Node.js, Express, MongoDB, TypeScript
- **Frontend**: React, Next.js, React Query, Tailwind CSS

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/fer8614/taskflow-backend.git
    cd taskflow-backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```plaintext
    DATABASE_URL=your_mongodb_connection_string
    PORT=your_preferred_port
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

## Usage

Once the server is running, you can access the API at `http://localhost:your_preferred_port`. You can use tools like Postman or Insomnia to test the API endpoints.

## API Documentation

## API Endpoints
> [!NOTE]
> With "Nested Resource Routing" as a design pattern in the construction of URLs for APls, especially in RESTful APls.
It is implemented through a Middleware that will allow us to give better order to our routes.
Because Middleware is executed on HTTP requests and
before the controller, they make them a great place to be able to execute certain actions regarding whether the projects exist or if the user has permissions to access it.

Here are some of the main API endpoints available:

- **User Authentication**
  - `POST /api/projects` - Register a new project

- **Routes For Project**
  - `POST /api/projects` - Create a new project
  - `GET /api/projects/:id` - Get all projects
  - `PUT /api/projects/:id` - Update project by id
  - `DELETE /api/projects/:id` - Delete a task
    
> [!NOTE]
> Mongoose Populate() Method
The Populate method provided in mongoose ODM (Object Document Model) is used to replace the specified path in the document of one collection with the actual document from the other collection. In this case all the project data.

- **Routes For Task**

  - `POST /api/projects/:projectId/tasks` - Create a new task
  - `GET /api/projects/:projectId/tasks` - Get all tasks by project
  - `GET /api/projects/:projectId/tasks/:taskId` - Get task by projectId and taskId
  - `PUT /api/projects/:projectId/tasks/:taskId` - Update task by projectId and taskId
  - `DELETE /api/projects/:projectId/tasks/:taskId` - Delete task by projectId and taskId
  - `POST /api/projects/:projectId/tasks/:taskId` - Update status of task by projectId and taskId

For a complete list of endpoints and their details, refer to the API documentation.

## Testing

This document provides an overview of the testing suite for the project API endpoints. The tests are written using [Jest](https://jestjs.io/) and [Supertest](https://github.com/visionmedia/supertest) to ensure the API endpoints are functioning correctly.

## Table of Contents

- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Cases](#test-cases)
  - [GET /api](#get-api)
  - POST /api/projects
  - GET /api/projects/
  - GET /api/projects/:id
  - PUT /api/projects/:id
  - DELETE /api/projects/:id
  - POST /api/projects/:projectId/tasks
  - GET /api/projects/:projectId/tasks
  - GET /api/projects/:projectId/tasks/:taskId
  - PUT /api/projects/:projectId/tasks/:taskId
  - DELETE /api/projects/:projectId/tasks/:taskId
  - POST /api/projects/:projectId/tasks/:taskId/status

## Installation

To run the tests, you need to have Node.js installed. Follow the steps below to set up the testing environment:

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Running Tests

To run the tests, use the following command:
```sh
npm test
```

## Test Cases

### GET /api

#### Description
Tests the `/api/projects` endpoint to ensure it returns a JSON response.

## Contributing

We welcome contributions to improve TaskFlow! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

---

Thank you for using TaskFlow! If you have any questions or feedback, feel free to open an issue or contact us.
