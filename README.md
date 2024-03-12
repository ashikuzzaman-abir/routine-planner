# Routine Tracker System 🗓️

The Routine Planner system is designed to cater to the needs of a busy student who is juggling academic commitments with a part-time job. The system aims to assist the student in managing their time effectively, generating personalized study plans, and prioritizing study sessions based on their availability and learning objectives.

## Project Details

### Project Objectives

- [x] Setup an Express server
- [x] Basic Authentication
- [x] Design and implement a Routine Planner using Node.js, MongoDB, Next.js
- [x] Generate study plans for users on a 5-7 day basis, considering their available study time and learning objectives.
- [x] Prioritize study sessions based on duration and priority.
- [x] Free to use dummy data of Students, learning time, class schedule etc. to develop the functionality.
- [x] Write test cases for the endpoints
- [x] Setup Next Application
- [x] Implemented Login, Register and dashboard pages for the user
- [x] Write functional components using Tailwind CSS
- [x] Api integration with Redux Toolkit Query for necessary functionality
- [x] Write DockerFile for backend and frontend
- [x] Test the system thoroughly
- [x] Write README.md file for guidence and elaboration

### **Technology Stack Used:**

For Backend:

- Node.js (v20)
- TypeScript
- Express
- MongoDB
- Mongoose ORM
- Joi
- Jest
- Supertest

For Frontend:

- TypeScript
- Next.js
- React
- Redux Toolkit
- Tailwind CSS

## Project Setup Guidelines

### Start The Server Procedures

First of all clone the repo

For Backend:

1. Go to the project's backend directory
2. Run the following command to install packages in terminal `npm i`
3. To **start the development** server run this command in terminal `npm run dev`
4. To **build** the project run this command in terminal `npm run build`
5. To **start the production** server run this command in terminal `npm run start`
6. Server will start on [localhost:5000](http://localhost:5000)

For Frontend:

1. Go to the project's frontend directory
2. Run the following command to install packages in terminal `npm i`
3. To **start the development** server run this command in terminal `npm run dev`
4. To **build** the project run this command in terminal `npm run build`
5. To **start the production** server run this command in terminal `npm run start`
6. Server will start on [localhost:3000](http://localhost:3000)

## Start Test Procedures

1. Go to the project's backend directory
2. Start the server in one terminal window by running this command `npm run dev` or `npm run build:start`
3. Open another terminal window in the project's directory and run this command `npm run test`

## Docker Setup Procedures

1. Install docker in the system "_follow the guide_ [Docker Doocumentation](https://docs.docker.com/)"
2. Run "Docker Destop" application in windows to run docker locally

For Backend:

1. Go to the projects backend directory from the terminal
2. Run this command to build with docker in terminal `docker build -t routine-tracker .`
3. Run this command to start the app with Docker in terminal `docker run -p 5000:5000 routine-tracker`
4. Server will start on [localhost:5000](http://localhost:5000)

For Frontend:

- Go to the projects frontend directory from the terminal
- Run this command to build with docker in terminal `docker build -t routine-tracker-frontend .`
- Run this command to start the app with Docker in terminal `docker run -p 3000:3000 routine-tracker-frontend`
- Next.js web application will start on [localhost:3000](http://localhost:3000)

## System Architechture Overview

The Routine Planner system is designed to cater to the needs of a busy student who is juggling academic commitments with a part-time job. The system aims to assist the student in managing their time effectively, generating personalized study plans, and prioritizing study sessions based on their availability and learning objectives. Below is an overview of the system architecture:

**1. Frontend:**

- **Framework:** React.js or Next.js is used to build the frontend of the Routine Planner, providing a dynamic and responsive user interface.
- **UI Components:** Tailwind CSS is utilized to design the UI components, ensuring a visually appealing and intuitive user experience.
- **State Management:** Redux is integrated for efficient state management, enabling the application to handle complex data and user interactions effectively.

**2. Backend:**

- **Framework:** Node.js and Express.js are used to develop the backend of the Routine Planner, providing a robust and scalable server-side architecture.
- **Database Management:** MongoDB is chosen as the database management system, depending on the project requirements and scalability needs.
- **ORM/ODM:** Mongoose is integrated to facilitate seamless interaction with the chosen database, simplifying data manipulation and retrieval.
- **Input Validation:** Joi is utilized for input validation, ensuring the integrity and security of user data.
- **Testing:** supertest is employed for backend testing, verifying the functionality and performance of the server-side endpoints.

**3. Authentication:**

- **Basic Authentication:** Basic authentication is implemented using Jsonwebtoken to ensure secure user authentication, safeguarding user accounts and data.

**4. Routine Planner Functionality:**

- **Generation of Study Plans:** The system generates personalized study plans for users on a 5-7 day basis, considering their available study time and learning objectives.
- **Prioritization of Study Sessions:** Study sessions are prioritized based on duration and priority, ensuring that the most critical topics receive adequate attention within the student's schedule.

**5. Development Environment:**

- **Dockerization:** The frontend and backend applications can be dockerized for enhanced scalability, portability, and ease of deployment across various environments.

By adhering to this system architecture, the Routine Planner is equipped to address the specific needs of the busy student effectively, providing a comprehensive solution for managing their academic and work commitments seamlessly.

## Testing Strategies

The tests are organized into two `describe` blocks, each containing multiple `test` cases.

1. **Auth Testing**: This block tests the authentication endpoints of the API.
   - **login testing**: This test sends a POST request to the `/auth/login` endpoint with an email and password. It expects a 200 status code in response, indicating a successful login, and checks that a token is returned in the response body.
   - **register user**: This test sends a POST request to the `/auth/register` endpoint with a user's details. It expects a 201 status code in response, indicating a successful registration. After registration, it sends a DELETE request to the `/users/{id}` endpoint to delete the newly created user. It expects a 200 status code in response, indicating successful deletion.
2. **Routines test**: This block tests the routines endpoints of the API.
   - **Create routine**: This test first registers a new user as in the previous block. Then, it sends a POST request to the `/routine` endpoint to create a new routine. It expects a 201 status code in response, indicating successful creation. After creating the routine, it sends a DELETE request to the `/routine/{id}` endpoint to delete the newly created routine, and another DELETE request to the `/users/{id}` endpoint to delete the newly created user. It expects a 200 status code in response to both DELETE requests, indicating successful deletion.
   - **Get All Routines**: This test first registers a new user and creates a new routine as in the previous test. Then, it sends a GET request to the `/routine` endpoint to get all routines. It expects a 200 status code in response, indicating successful retrieval. After getting the routines, it deletes the newly created routine and user as in the previous test.

These tests follow the strategy of setting up necessary data (like registering a user), performing the action to be tested (like creating a routine), checking the results (like the status code and response body), and then cleaning up the data (like deleting the user). This ensures that each test is independent and doesn't affect the others.

## Generate Routine For User Algorithm Explanation

This function, `generateTasks`, is designed to distribute tasks over a number of days based on the available time per day. The tasks are taken from a JSON file and each task has a duration and a priority. The function uses a greedy algorithm to assign tasks to each day.

Here's a step-by-step explanation of the function:

1. The function takes `availableTime` as a parameter, which represents the available time for tasks each day.
2. It filters out tasks that have a duration longer than the available time per day. This is done using the `filter` method on the `tasks` array.
3. The remaining tasks are sorted based on their priority using the `sort` method. The tasks with lower priority values are placed at the beginning of the array.
4. The function then initializes an empty array `days` to hold the tasks for each day, and two variables `day` and `dayTime` to keep track of the current day and the remaining available time for the current day.
5. The function enters a loop that continues until all tasks have been assigned. In each iteration of the loop, it:
   - Removes the first task from the `tasks` array using the `shift` method.
   - Checks if the task can be completed within the remaining time for the current day (`dayTime`) and if the current day has less than 2 tasks. If both conditions are met, it adds the task to the current day and subtracts the task's duration from `dayTime`.
   - If the task can't be completed within the remaining time for the current day or if the current day already has 2 tasks, it increments the `day` variable to move to the next day and resets `dayTime` to the initial available time.
6. Finally, the function returns the `days` array, which contains the tasks assigned to each day.

This algorithm ensures that tasks are assigned in order of their priority and that no more than 2 tasks are assigned per day. It also ensures that tasks are not assigned to a day if they can't be completed within the available time for that day.

## Developer Comments

- You might be wondering why I have implemented some unused models, controllers, and routes in the backend. Actually, I misunderstood the project requirements initially, and I overcomplicated the system. However, I later realized that the project's actual requirements are quite simple. Therefore, I re-implemented the actual requirements and left the unused code so that you can evaluate my thought process and my initial intentions.You might think that why I have implemented some unused models, controllers and routes in the backend, actually I misunderstood the project requirements initially. I over complicated the system initially but then I realised that the project's actual requirements are pretty simple so I reimplemented the actual requirement and I left the unused codes so that you can evaluate my thought process and my initial intensions.
- I have Intentionally pushed the .env files so that it will be easy for you to quickly start the servers without editing the source codes and setup another mongo instence.
- Maybe my UI is not as polished as it could be. Actually, I have a day job, and the project timeline is colliding with my work schedule, so I could not dedicate much time to refining the frontend UI. I am confident that I can provide a better UI and backend implementation than what is currently presented. I would appreciate it if you could take a look at some of my professional works that I have completed:
  [Bazar365 - E-commerce Application](https://bazar365.com),
  [thinkcrypt.io - My Current Company's Portfolio](https://thinkcrypt-portfolio.vercel.app/),
  [This a backend I've done recently for another assessment](https://github.com/ashikuzzaman-abir/uss-assessment),
  Also visit my [Github Profile](<[https://](https://github.com/ashikuzzaman-abir)https://>) to know about my opensource interesting projects that I've done 💪🏼
