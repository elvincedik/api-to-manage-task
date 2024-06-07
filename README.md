# api-to-manage-task
api's to perform CRUD operation on task

Task Model
Each task has the following fields:

id (string): Unique identifier for the task.
title (string): Title of the task.
description (string): Description of the task.
completed (boolean): Completion status of the task.
created_at (date): Timestamp when the task was created.
updated_at (date): Timestamp when the task was last updated.

Endpoints
GET /tasks
Retrieve all tasks.
Response:
[
  {
    "id": "1",
    "title": "Sample Task",
    "description": "This is a sample task.",
    "completed": false,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]


POST /tasks
Create a new task.
Request:
{
  "title": "New Task",
  "description": "This is a new task.",
  "completed": false
}
Response:
{
  "id": "2",
  "title": "New Task",
  "description": "This is a new task.",
  "completed": false,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}


GET /tasks/
Retrieve a single task by its ID.
Response:
{
  "id": "2",
  "title": "New Task",
  "description": "This is a new task.",
  "completed": false,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}

PUT /tasks/
Update a task by its ID.
Request:
{
  "title": "Updated Task",
  "description": "This task has been updated.",
  "completed": true
}
Response:
{
  "id": "2",
  "title": "Updated Task",
  "description": "This task has been updated.",
  "completed": true,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-02T00:00:00.000Z"
}

DELETE /tasks/
Delete a task by its ID.

Response:
{}


SETUP PREREQUISITES

1. Node.js
2. npm (Node Package Manager)

INSTALLATION
1. Clone the repository.

2. Install dependencies:
run 'npm install'

3. Start the server:
run the command 'node index.js' to start your server, 
The server will run on http://localhost:3000.

TESTING ENDPOINTS

you can make use of postman for testing the endpoints.


MIDDLEWARE
A middleware function is implemented to log the details of each request (method, URL, timestamp).


VALIDATION
Input data for creating and updating tasks is validated to ensure:
title and description are strings.
completed is a boolean.


ERROR HANDLING
The API properly handles errors, including validation errors and cases where a task is not found.