# Inspired Movement Web Application

This web application was developed as a practical coursework assignment for the Web Application Development 2 module. Its purpose is to serve as a learning exercise, demonstrating the ability to design, develop, test, and deploy a robust web application utilizing relevant tools and frameworks.

This project focuses on building a website for a local dance organization to manage their courses, enrollments, and user information. It showcases the practical application of Node.js, Express, NeDB, and Mustache templating.

<br>

## ⛓️ Deployment
https://inspired-movement.onrender.com/

<br>

## 🩰 Project Description

The "Inspired Movement" web application aims to provide a platform for a local dance organization to manage their various offerings. The organization runs diverse dance classes catering to users of different fitness levels and abilities. This application seeks to streamline the management of these workshops and user enrollments.

<br>

## <img src="https://img.shields.io/badge/Architecture-MVC-blueviolet" alt="MVC Architecture Badge"> MVC Architecture

The application adheres to the Model-View-Controller pattern:

* **Models:** Responsible for data handling and business logic.
* **Views:** Utilize the Mustache templating engine for dynamic rendering of user interfaces.
* **Controllers:** Handle incoming requests and manage the application's responses.
* **Routes:** Separate route definitions ensure a clear and organized API structure.

<br>

## ✨ Main Features

* **Admin Functionality:**
    * Create, Read, Update, and Delete (CRUD) operations for Workshops/Classes.
    * Create, Read, Update, and Delete (CRUD) operations for Users.
* **User Functionality:**
    * Enroll in available Workshops/Classes.
    * Unenroll from previously enrolled Workshops/Classes.
* **Authentication:**
    * Role-based access control to limit access based on user privileges.
* **Error Handling:**
    * Robust error handling implemented throughout the application.

<br>

## 🚀 Getting Started

To run the application locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/shaira-sardinia/web-dev-2
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd inspired-movement
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables in an .env file in the root directory:**
    ```bash
      ACCESS_TOKEN_SECRET="superSecretString"
      SEED_DATA=true
      PORT=3000
      ```

    <small>*Make sure to use a more secure secret!*</small>

5.  **Run in production mode:**
    ```bash
    npm start
    ```

6.  **Access the application:**
    Open your web browser and navigate to `http://localhost:3000` (or the port specified in your `.env` file).

<br>

## 🛠️ Technologies Used

* **Backend:**
    * [Node.js](https://nodejs.org/)
    * [Express.js](https://expressjs.com/)
* **Database:**
    * [NeDB](https://github.com/louischatriot/nedb)
* **View Engine:**
    * [Mustache](https://mustache.github.io/)
* **CSS Framework:**
    * [Bootstrap](https://getbootstrap.com/)
* **JavaScript:**
    * [ES6+](https://es6.org/)

<br> 

## Author

Shaira Sardinia

ssardi300@caledonian.ac.uk
