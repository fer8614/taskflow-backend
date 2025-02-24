# TaskFlow Backend

Backend for the TaskFlow web application, a Full Stack MERN project (MongoDB, Express, React, Node) with TypeScript, React Query, Next.js, and Tailwind CSS.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Docs SWAGGER](#API-Documentation-Swagger)
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
    SMTP_HOST=your-HOST-for-EMAIL-SERVICE
    SMTP_PORT=your-PORT-for-EMAIL-SERVICE
    SMTP_USER=your-USER-for-EMAIL-SERVICE
    SMTP_PASS=your-password-for-EMAIL-SERVICE
    JWT_SECRET=your-password-for-JWT
    ```
> [!NOTE]
> To have a real email sending service you must configure one, which can be RESEND, in this case MAILTRAP is configured in order to test the services and verify the operation of the application.

4. Start the development server:

    ```bash
    npm run dev:api
    ```

## Usage

Once the server is running, you can access the API at `http://localhost:your_preferred_port`. You can use tools like Postman or Insomnia to test the API endpoints.

## API Documentation Swagger

Our project includes comprehensive API documentation generated with Swagger. You can access the interactive API documentation through the following endpoint:

### Accessing Swagger API Documentation

To view the API documentation, navigate to the following URL in your web browser:

```
http://<your-domain>/api-docs
```

Replace `<your-domain>` with the actual domain or IP address where your API is hosted.

### Features

The Swagger API documentation provides the following features:

- **Interactive API Explorer**: Easily test API endpoints directly from the documentation.
- **Detailed Endpoint Information**: View detailed information about each API endpoint, including request parameters, response formats, and status codes.
- **Schema Definitions**: Understand the structure of request and response payloads with detailed schema definitions.
- **Authentication**: Learn how to authenticate and authorize API requests.

### Example

Here is an example of how to access the API documentation:

```
http://localhost:3000/api-docs
```

### Usage

1. Open your web browser.
2. Enter the URL `http://<your-domain>/api-docs`.
3. Explore the API endpoints and test them directly from the Swagger UI.

### Notes

- Ensure that your API server is running and accessible.
- The Swagger documentation is automatically generated based on the API specifications defined in your project.

For more information on how to use Swagger, visit the [Swagger official documentation](https://swagger.io/docs/).

---

Feel free to reach out if you have any questions or need further assistance with the API documentation.

This markdown provides a clear and concise description of how to access and use the Swagger API documentation for your project. Adjust the `<your-domain>` placeholder to match your specific setup.

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

## API Endpoints
> [!NOTE]
> To perform the test in the server.ts file, you must disable the line where the call to cors is made:
> // app.use(cors(corsConfig));

## Table of Contents

- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Cases](#test-cases)
  - GET /api
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
