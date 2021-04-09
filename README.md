# FLOW TRACKER
 

## Description
I wanted to challenge myself and build a software working in a way similar to what something like Jira does. It is an ambitious project requiring a lot of JavaScript logic, Redux state management, back-end development, dynamic data rendering from API calls, UI/UX design, styling etc. I started on March 3rd and it is now nearly done.<br /> 

## How it works (high level)
The software is used to create Projects and assign registered users to these Projects. Users can then raise Tickets on the Projects they are assigned to, and assign these Tickets to specific Developers also assigned to these Projects.<br />

A specific Role is assigned to each User: An Admin can do everything, a Project Manager can assign users and developers to Projects, a Developer can change a Ticket's status, and a Submitter can create Tickets on the Project(s) he/she is assigned to.<br />

The software features flexible User Management and Project Management functionalities.<br />

Tickets include a priority status, comments, attachments, etc. and the history of each Ticket is tracked and viewable.<br />

The software allows users to be assigned to multiple Projects or Tickets, and everything a user see when he/she logs in is tailored to them.<br />

Before starting this project, I have written an SRS (in the /public folder) that includes further details as well as the development Sprints schedule.<br />

As it is still a work in progress, please bear in mind that I haven't "gold plated" my code yet.<br />


## Features

- User authentication and authorization
- Project creation, edition, and deletion
- Ticket creation, edition, and deletion
- Role assignment 
- Project assignment
- User & Project management
- Ticket history tracking
- Charts with dynamic data rendering
- Customized color themes
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