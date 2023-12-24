# Pawtel MERN Application

### Jessica Liong & Luke Wheldale

Client repo: https://github.com/Pawtel/pawtel-client

Server Repo: https://github.com/Pawtel/pawtel-server

Deployed Website : https://pawtel.netlify.app/book

Deployed API : https://pawtel-48da552cecec.herokuapp.com/

Pawtel Part A : https://github.com/Pawtel/PawtelDocs

Welcome to the server side repository of Pawtel Application server! This server is the backend component of the MERN stack application (MongoDB, Express.js, React, Node.js) and deployed with Netlify and Heroku. This API is designed to streamline booking management of your furry loved ones and provides a seamless integration of storing pet details, customer details and booking rooms at Pawtel pet hotel and it can be utilised for similar pet booking applications.

## Getting Started

To get started with the Pawtel server-side application, follow these steps:

1. Clone the repository to your local machine.

```
 git clone https://github.com/Pawtel/pawtel-server
```

2. Navigate to the project directory.

```
cd pawtel-server
```


3. Install dependencies using npm 

```
npm install
```

4. Start the development server.

```
npm run start-dev
```


Open your browser and visit http://localhost:3030 to view the Pawtel application.



## API Endpoints

| Users               | Bookings                | Pets                      | Rooms             |
| ------------------- | ----------------------- | ------------------------- | ------------------|
| POST /register      | GET /bookings/          | GET /pets/                | GET /rooms/       |
| POST /login         | GET /bookings/:id       | GET /pets/id              | GET /rooms/:id    |
|                     | POST /bookings          | POST /pets/               | POST /rooms       |
|                     | PUT /bookings/:id       | DELETE /pets/:id          | DELETE /rooms/:id |
|                     | DELETE /bookings/:id    | PUT /pets/:id             | PUT /rooms/:id    |


## Server Libraries and Dependencies

`express ^4.18.2` - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. The server for this application has been built with the Express framework to allow for secure, simple routing, middleware support and a modular application.
- `mongoose ^8.0.3` - Mongoose is an Object Data Modelling (ODM) library for MongoDB and Node.js. It allows the creation of strongly-typed schemas for MongoDB documents to provide data validation. Several models have been defined within the server containing Mongoose schemas to better structure and validate database documents.
- `cors ^2.8.5` - CORS is a node.js package for middleware that enables cross origin resource sharing between the Express server and React client.
- `dotenv ^8.2.0` - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Env variables have been used to safely store information such as database keys and to conditionally determine which version of the client to connect with.

#### Server Development dependencies:

- `nodemon ^2.0.4` - Nodemon is used to automatically restart the node server when changes have been detected. The `npm start` script has been modified to execute nodemon in development to use this feature.


### Client Libraries & Dependencies:

- `react ^18.2.0`: A Javascript Front-end library for building user interfaces and maintained by Facebook. The client side of this application is built with the react library alongside notable third party complimentary react libraries.
- `react-dom ^18.2.0` - React dom is a complimentary library to react which binds react to the DOM. This enables us to use methods such as `render()` to render components in the browser.
- `react-router-dom ^6.19.0` - Allows for conditional rendering of components in a single page application based on the route being used in the URL. This allows us to build a SPA that acts like a site with multiple pages.
- `axios ^0.19.2` - Axios is a Javascript library used to make HTTP requests to the server from the client. Axios configuration has been set in src/config/api.js to use environment variables via `process.env`. Bookings, auth and fairy services each use axios to make HTTP requests to their dedicated api end points on the server.


#### Client Development dependencies

- `prettier ^2.0.5` - Used to declare a pre-defined code format to maintain consistency across different developer machines.
- `FontAwesome ^6.5.1` - A package containing various fonts to use in the front-end.
- `Vite ^4.4.5` - A platform-agnostic frontend tool which supports TypeScript and jsx. 
- `Vitest ^1.1.0` - A testing framework utilised with Vite to oversee and construct JavaScript-centric web applications. 

### Task Management

#### Trello/Kanban System

Given the collaborative nature of the Pawtel project with Luke Wheldale handling the front end and Jessica Liong managing the back end, we opted for a streamlined approach to task management. Regular stand-up meetings, conducted 1-2 times weekly, allowed us to discuss progress, address challenges, and communicate effectively.

The project management board that we used is in this following link:

https://github.com/orgs/Pawtel/projects/2/views/1?layout=board


### Git Workflow

#### Branch Management

Our Git workflow was integral to maintaining a structured development process. Both Luke and Jessica worked on separate repositories (front end and back end), allowing for modular development. We adhered to a disciplined Git branching strategy, where one was a development branch which was pushed onto the main branch upon complete testing on our local machines. 

#### Deleted Branches

Branch deletion was a part of our Git workflow when deemed necessary. Deleting branches after merging or discarding changes helps keep the repository clean and avoids clutter. Deleted branches, though not explicitly visible, are reflected in the commit history.

### Manual Testing

Manual testing played a crucial role in ensuring the Pawtel app's functionality and user experience. Both developers actively engaged in testing various features, including user authentication, data submission, and page navigation.

### Application Overview

The Pawtel app is a full-stack application designed for a pet hotel. It features a home page, login functionality (with sign-up option), about page, and a contact page. While initially considering a separate admin dashboard, time constraints led to the decision for Luke and Jessica to assume admin roles within the app.

### Conclusion

The collaboration between Luke Wheldale and Jessica Liong resulted in the successful development of the Pawtel app. Despite not using a Trello or Kanban board for task management, our structured Git workflow and frequent stand-up meetings facilitated effective communication and project progress. Manual testing ensured the reliability of key features, and any tweaks made during Part A were carefully documented. The Pawtel app stands as a testament to our collaborative efforts and commitment to quality development.
