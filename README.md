# TaskFlow Backend

Backend for the TaskFlow web application, a Full Stack MERN project (MongoDB, Express, React, Node) with TypeScript, React Query, Next.js, and Tailwind CSS.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
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

## API Endpoints
> [!NOTE]
> With "Nested Resource Routing" as a design pattern in the construction of URLs for APls, especially in RESTful APls.
It is implemented through a Middleware that will allow us to give better order to our routes.
Because Middleware is executed on HTTP requests and
before the controller, they make them a great place to be able to execute certain actions regarding whether the projects exist or if the user has permissions to access it.

Here are some of the main API endpoints available:

- **User Authentication**
  - `POST /api/projects` - Register a new project

- **Tasks**
  - `GET /api/projects` - Get all tasks
  - `POST /api/projects/:projectId/tasks` - Create a new task
  - `PUT /api/projects/:projectId/tasks` - Update a task
  - `DELETE /api/projects/:projectId/tasks` - Delete a task

For a complete list of endpoints and their details, refer to the API documentation.

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
