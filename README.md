# FLOW TRACKER
 

## Description
I wanted to challenge myself and build a software with features similar to what something like Jira does. It is an ambitious project requiring a lot of JavaScript logic, Redux state management, back-end development, dynamic data rendering from API calls, UI/UX design, styling etc. 
<br /> 

## How it works (high level)
The software is used to create Projects and assign users to these Projects. Users can then raise Tickets, and assign these Tickets to Developers also assigned to these Projects.<br />

A specific Role is assigned to each User: An 'Admin' can do everything, a 'Project Manager' can assign users and developers to Projects, a 'Developer' can change a Ticket's status, and a 'Submitter' can create Tickets on the Project(s) he/she is assigned to.<br />

The software features flexible User Management and Project Management functionalities.<br />

Tickets include a priority status, comments, attachments, etc. and the history of each Ticket is tracked and viewable.<br />

The software allows users to be assigned to multiple Projects or Tickets, and everything a user sees when he/she logs in is tailored to them. What a user can do within the software is also restricted and depends on his/her Role.<br />

Before starting this project, I have written an SRS (in the /public folder) that includes further details as well as the development Sprints schedule.<br />

## Architecture and Data Flow
Flow Tracker is an SPA built following a Flux / Redux architecure, with a backend built using an MVC-like structure and performing CRUD operations.
<br />
Node & Express was used to build REST APIs and interacts with the PostgreSQL database using the Sequelize ORM.
The React client sends HTTP requests and retrieves HTTP responses via Redux using Axios, then provides the data to the components. React Router is used for navigating to various pages.
The global state of the application and the data flow are managed by Redux; all http requests and global state updates are performed via actions and reducers. I do use local state where data has to come from user inputs (editing, creating etc.).
<br />
As I am more comfortable on the front end, most of the logic is handled by the client rather than by the backend. Redux gets the data from the database, and numerous methods are used within components to manipulate it as required and render the correct data. This also means a lighter back-end and a faster application. 

## Improvements 

The app and my code are not fully polished yet. Here are some immediate tasks I will be undertaking:
<br />
- Improving the Authentication and Authorization.
- There is a warning when mounting the components in Project Details (for the first time). This is because I am using a child's local state to update a parent's local state. I am aware of this, and could use Redux to fix it. I am however trying to figure out another way to fix this, because it is more challenging!
- Implementing a global search function & user settings (top bar), as well as a USer profile page.
- I wrote the pagination system of the List component used across the app. It works well, but if you play around with it you will notice some oddities. 
- Improving the general UI and styling - colors, modals, animations.
- Making the app responsive on mobile & tablet displays.
- Performing extensive testing with Jest.
- General code improvement

## Features

- User authentication and authorization
- Project creation, edition, and deletion
- Ticket creation, edition, and deletion
- Role assignment 
- Project assignment
- User & Project management
- Ticket history tracking
- Charts with dynamic data rendering
- Customized color themes (coming soon)
- And more..!


## Technologies Used
* JavaScript
* React
* Redux
* SASS
* Node.Js
* Express.Js
* Passport.Js
* Sequelize
* PostgreSQL
* NPM
* Postman
* Jest and Enzyme 

