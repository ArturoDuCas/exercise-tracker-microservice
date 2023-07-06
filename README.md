# Exercise Tracker Microservice

This is the fourth project of the **"Back End Development and APIs"** certification by Free Code Camp. The goal of this project is to build a full stack JavaScript app that is functionally similar to [this example](https://exercise-tracker.freecodecamp.rocks).

## Description

The Exercise Tracker Microservice project aims to create an application that allows users to track their exercises. It fulfills the following requirements:

- You can send a POST request to `/api/users` with form data `username` to create a new user.
- The response returned from POST `/api/users` with form data `username` will be an object with `username` and `_id` properties.
- You can make a GET request to `/api/users` to get a list of all users.
- The GET request to `/api/users` returns an array.
- Each element in the array returned from GET `/api/users` is an object literal containing a user's `username` and `_id`.
- You can send a POST request to `/api/users/:_id/exercises` with form data `description`, `duration`, and optionally `date`. If no `date` is supplied, the current date will be used.
- The response returned from POST `/api/users/:_id/exercises` will be the user object with the exercise fields added.
- You can make a GET request to `/api/users/:_id/logs` to retrieve a full exercise log of any user.
- A request to a user's log GET `/api/users/:_id/logs` returns a user object with a `count` property representing the number of exercises that belong to that user.
- A GET request to `/api/users/:_id/logs` will return the user object with a `log` array of all the exercises added.
- Each item in the `log` array that is returned from GET `/api/users/:_id/logs` is an object that should have `description`, `duration`, and `date` properties.
- The `description` property of any object in the `log` array that is returned from GET `/api/users/:_id/logs` should be a string.
- The `duration` property of any object in the `log` array that is returned from GET `/api/users/:_id/logs` should be a number.
- The `date` property of any object in the `log` array that is returned from GET `/api/users/:_id/logs` should be a string. Use the `dateString` format of the Date API.
- You can add `from`, `to`, and `limit` parameters to a GET `/api/users/:_id/logs` request to retrieve part of the log of any user. `from` and `to` are dates in `yyyy-mm-dd` format. `limit` is an integer of how many logs to send back.

## Accessing the Service

You can access and test the Exercise Tracker Microservice by clicking on the following link: [Exercise Tracker Microservice](https://exercise-tracker-microservice-z77c.onrender.com/)

## Technologies Used

This project utilizes the following technologies:

- Node.js
- Express.js
- MongoDB

Feel free to explore and modify the code to further enhance the functionality of the Exercise Tracker Microservice. Happy coding!

