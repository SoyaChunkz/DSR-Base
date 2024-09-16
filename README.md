# Dead Stock Register (DSR) 📋✨

Welcome to the Dead Stock Register (DSR) project!

A MERN Stack Dead Stock Registry (DSR) system, automating the transition from traditional manual registers to a modern web portal, effectively eliminating paperwork by 100%.

Dive into the live application here: [DSR ](https://dsr-final.vercel.app) 🌐

Video demonstration here: [Click](https://www.youtube.com/watch?v=hI9SUc-b4-Y) 📽️

Owners and Developers: [Rutam Kulkarni](https://github.com/rutamk), [Sameer Ahmad Maroof](https://github.com/SoyaChunkz), [Khushi Gala](https://github.com/khushi-gala)

## 📝 Problem Statement

The **Dead Stock Register (DSR) Management System** is designed to address the inefficiencies and inaccuracies inherent in the traditional, manual process of tracking non-consumable lab inventory. The existing system is prone to errors, time-consuming, and lacks the ability to provide real-time updates or secure access to different stakeholders.

## Screenshots

- **Login Page**
  
![CleanShot 2024-09-04 at 15 08 22@2x](https://github.com/user-attachments/assets/7240bbcc-e9ba-4d60-aef4-c434d108e304)

- **DSR Page**
  
![CleanShot 2024-09-04 at 15 09 31@2x](https://github.com/user-attachments/assets/c29dfb4f-7827-4fde-b89c-8e4a025cffff)

![CleanShot 2024-09-04 at 15 09 52@2x](https://github.com/user-attachments/assets/0a0aa27c-67d2-48f1-b2e0-5d8296ddb0a8)

![CleanShot 2024-09-04 at 15 10 45@2x](https://github.com/user-attachments/assets/4c8eda37-d3c2-4c2a-b815-26e46b191bc0)

-**PDF Conversion**

![CleanShot 2024-09-04 at 15 12 18@2x](https://github.com/user-attachments/assets/ebff3eae-e962-4223-9dba-9e2d249df215)

-**Admin Page**

![CleanShot 2024-09-04 at 15 04 43@2x](https://github.com/user-attachments/assets/4d422554-d60c-4cf6-a053-6cf76dd013cd)

![CleanShot 2024-09-04 at 15 04 58@2x](https://github.com/user-attachments/assets/1ee1d4fb-445e-4f9e-9c3d-8be8d12b0ad8)

![CleanShot 2024-09-04 at 15 05 16@2x](https://github.com/user-attachments/assets/c3565582-b29e-45ae-bbb3-9cc915cfe52a)

![CleanShot 2024-09-04 at 15 07 16@2x](https://github.com/user-attachments/assets/9cb27438-98b8-491b-bd52-9c98adf98138)

## 🚀 Features 🌟

- **Seamless MERN Stack Integration**: Embrace a fully digital approach with our comprehensive system built on the MERN stack. Transform traditional physical Dead Stock Registers into a modern, efficient digital solution. 💻🔧
- **Currently in Use**: Proudly utilized by VIT, our application boasts a sleek, intuitive frontend UI that enhances user experience and efficiency. 🏛️✨
- **Robust User Authentication**: Secure and streamlined login system to ensure only authorized users access the system. Your data’s security is our priority. 🔒🛡️
- **Role-Based Access Control (RBAC)**: Tailored access levels based on user roles, providing a customized experience and safeguarding sensitive information. 👤🔐
- **Effortless PDF Conversion**: Generate and download PDF reports of your stock data with just a few clicks, making documentation and sharing a breeze. 📄✍️
- **Automated Email Notifications**: Stay informed with automatic email updates sent to relevant mail IDs whenever changes are made to the register or the users. Never miss a critical update! 📧🔔
- **Feature-Rich Admin Panel**: Manage users and departments with ease through our comprehensive admin panel, designed for efficient CRUD (Create, Read, Update, Delete) operations. ⚙️👨‍💼

## 🛠️ Technologies Used 🚀

### 🌐 Frontend
- **React**: Used to build the dynamic and interactive user interface of the DSR system, including forms for user input, the dashboard, and real-time updates for managing the stock register.
- **Tailwind CSS**: Employed to create a sleek, responsive design for the entire application, ensuring that the UI is both modern and mobile-friendly.
- **react-icons**: Integrated for adding intuitive icons throughout the application, improving visual cues for actions like editing, deleting, and navigating the UI.
- **react-modal**: Utilized to create custom modals for user confirmations, such as confirming the deletion of a department or prompting for additional details.

### 🖥️ Backend
- **Node.js**: Powers the backend server, handling API requests, processing business logic, and serving data to the frontend.
- **Express**: Manages routing and middleware on the backend, enabling CRUD operations for users, departments, and register entries. It handles the core logic for role-based access control (RBAC) and data validation.
- **Mongoose**: Facilitates interaction with MongoDB, allowing for the definition of schemas for users, departments, and register entries. It also manages relationships and data validation within the database.
- **JWT (jsonwebtoken)**: Implements secure user authentication, generating tokens that verify a user’s identity and role before allowing access to protected routes and operations.
- **Multer**: Used for handling file uploads within the application, particularly for uploading documents or images related to the stock register entries.

### 💾 Database
- **MongoDB**: Stores all the data for the DSR, including user information, departments, register entries, and logs of changes. The flexibility of MongoDB allows for easy updates and queries on the hierarchical data structure.
- **MongoDB Atlas**: Hosts the MongoDB database in the cloud, providing automated backups, scaling, and monitoring, ensuring the DSR system is always available and performant.

### 📜 PDF Generation and Emailing
- **jsPDF**: Generates PDF versions of the Dead Stock Register entries, allowing users to download or print reports directly from the application.
- **jsPDF autoTable**: Adds structured tables to the PDFs, ensuring that the generated reports are well-organized and easy to read, especially when handling large datasets.
- **Nodemailer**: Automatically sends emails to relevant users when updates are made to the register, such as when a new entry is added or an existing entry is modified. This keeps all stakeholders informed in real-time.

### 🔒 Security and Environment Management
- **dotenv**: Manages environment variables, keeping sensitive information like database URIs, API keys, and JWT secrets secure and easily configurable across different environments.
- **CORS**: Configured to allow secure cross-origin requests from the frontend to the backend API, ensuring that only authorized clients can interact with the server.

### 🔄 Development Tools
- **Nodemon**: Used during development to automatically restart the Node.js server whenever changes are made to the backend code, improving developer efficiency.
- **axios**: Handles HTTP requests from the frontend to the backend, used extensively for fetching and submitting data such as user authentication, register entries, and department details.


## 📚 Libraries Used

- **React**: For building dynamic, interactive user interfaces. 🌐
- **Tailwind CSS**: For crafting beautiful, responsive designs with utility-first CSS. 🎨
- **Express**: To manage backend routes and handle HTTP requests. 🛣️
- **Node.js**: As the server-side runtime environment. 🖥️
- **Mongoose**: For object data modeling (ODM) to interact with MongoDB. 🔗
- **JWT (jsonwebtoken)**: For secure user authentication and authorization. 🔑
- **jsPDF**: For generating PDF documents within the application. 📜
- **jsPDF autoTable**: For creating structured tables within PDFs. 📊
- **Nodemailer**: For sending automated email notifications. 📧
- **CORS**: For enabling Cross-Origin Resource Sharing in the backend. 🌍
- **axios**: For making HTTP requests from the frontend. 📡
- **Multer**: For handling file uploads in the application. 📂
- **Nodemon**: For automatically restarting the server during development. 🔄
- **react-icons**: For integrating beautiful icons into the frontend. 🎨
- **react-modal**: For creating accessible and customizable modals in the application. 🪟

## ⚙️ Installation

### 🖥️ Client-Side Setup

- 1 - Navigate to the client folder:
    ```bash
   cd client
    ```

- 2 - Then, move to the DSR folder:
   ```bash
   cd DSR
    ```

- 3 - Install the necessary dependencies:
    ```bash
   npm i
    ```

- 4 - Start the frontend development server:
    ```bash
   npm run dev
    ```
    
### 🗄️ Server-Side Setup

- 1 - Navigate to the server folder:
    ```bash
   cd server
    ```

- 2 - Install the necessary dependencies:
    ```bash
   npm i
    ```

- 3 - Create a `.env` file in the server folder and define the following variables:

   - ACCESS_TOKEN_SECRET: This is a secret key used for signing and verifying JSON Web Tokens (JWTs) to secure user authentication.

   - MAILER_TRANSPORTER_SERVICE: Set this to gmail to configure Nodemailer to use Gmail as the email service provider.

   - MAILER_AUTH_ID: This is the email ID used for sending emails via the Nodemailer transporter.

   - MAILER_AUTH_PASS: This is the password or app-specific password for the MAILER_AUTH_ID account, required for authentication. [Youtube Guide](https://youtu.be/MkLX85XU5rU?si=A1eVoJwHBZDsg15i)

   - MAILER_FROM_ID: The email address that will appear in the "From" field when sending emails through the system.

   Example `.env` file:
   ```bash
   ACCESS_TOKEN_SECRET=your_jwt_secret_key
   MAILER_TRANSPORTER_SERVICE=gmail
   MAILER_AUTH_ID=your_email@gmail.com
   MAILER_AUTH_PASS=your_email_app_password (not email id password)
   MAILER_FROM_ID=your_email@gmail.com
   ```

- 4 . Start the backend server:
  ```bash
   npm start
  ```

## 📋 Usage

- **User Authentication**: Easily register and log in to access tailored features based on your role. Enjoy a secure and personalized experience. 🔐👥
- **Admin Panel**: Manage users and departments efficiently from a user-friendly admin interface. Perform CRUD operations with ease. ⚙️🛠️
- **PDF Generation**: Generate detailed reports in PDF format for documentation and sharing. Perfect for record-keeping and communication. 📄💼
- **Email Notifications**: Receive automatic email alerts about changes to the register, ensuring you stay updated in real time. 📧🔔



For any issues or questions, feel free to open an issue or reach out to us at:
systems.dsr@gmail.com.

We're here to help! 🌟💬
# Dead Stock Register (DSR) 📋✨

Welcome to the Dead Stock Register (DSR) project!

A MERN Stack Dead Stock Registry (DSR) system, automating the transition from traditional manual registers to a modern web portal, effectively eliminating paperwork by 100%.

Dive into the live application here: [DSR ](https://dsr-final.vercel.app) 🌐

Video demonstration here: [Click](https://www.youtube.com/watch?v=hI9SUc-b4-Y) 📽️

Owners and Developers: [Rutam Kulkarni](https://github.com/rutamk), [Sameer Ahmad Maroof](https://github.com/SoyaChunkz), [Khushi Gala](https://github.com/khushi-gala)

## 📝 Problem Statement

The **Dead Stock Register (DSR) Management System** is designed to address the inefficiencies and inaccuracies inherent in the traditional, manual process of tracking non-consumable lab inventory. The existing system is prone to errors, time-consuming, and lacks the ability to provide real-time updates or secure access to different stakeholders.

## Screenshots

- **Login Page**
  
![CleanShot 2024-09-04 at 15 08 22@2x](https://github.com/user-attachments/assets/7240bbcc-e9ba-4d60-aef4-c434d108e304)

- **DSR Page**
  
![CleanShot 2024-09-04 at 15 09 31@2x](https://github.com/user-attachments/assets/c29dfb4f-7827-4fde-b89c-8e4a025cffff)

![CleanShot 2024-09-04 at 15 09 52@2x](https://github.com/user-attachments/assets/0a0aa27c-67d2-48f1-b2e0-5d8296ddb0a8)

![CleanShot 2024-09-04 at 15 10 45@2x](https://github.com/user-attachments/assets/4c8eda37-d3c2-4c2a-b815-26e46b191bc0)

-**PDF Conversion**

![CleanShot 2024-09-04 at 15 12 18@2x](https://github.com/user-attachments/assets/ebff3eae-e962-4223-9dba-9e2d249df215)

-**Admin Page**

![CleanShot 2024-09-04 at 15 04 43@2x](https://github.com/user-attachments/assets/4d422554-d60c-4cf6-a053-6cf76dd013cd)

![CleanShot 2024-09-04 at 15 04 58@2x](https://github.com/user-attachments/assets/1ee1d4fb-445e-4f9e-9c3d-8be8d12b0ad8)

![CleanShot 2024-09-04 at 15 05 16@2x](https://github.com/user-attachments/assets/c3565582-b29e-45ae-bbb3-9cc915cfe52a)

![CleanShot 2024-09-04 at 15 07 16@2x](https://github.com/user-attachments/assets/9cb27438-98b8-491b-bd52-9c98adf98138)

## 🚀 Features 🌟

- **Seamless MERN Stack Integration**: Embrace a fully digital approach with our comprehensive system built on the MERN stack. Transform traditional physical Dead Stock Registers into a modern, efficient digital solution. 💻🔧
- **Currently in Use**: Proudly utilized by VIT, our application boasts a sleek, intuitive frontend UI that enhances user experience and efficiency. 🏛️✨
- **Robust User Authentication**: Secure and streamlined login system to ensure only authorized users access the system. Your data’s security is our priority. 🔒🛡️
- **Role-Based Access Control (RBAC)**: Tailored access levels based on user roles, providing a customized experience and safeguarding sensitive information. 👤🔐
- **Effortless PDF Conversion**: Generate and download PDF reports of your stock data with just a few clicks, making documentation and sharing a breeze. 📄✍️
- **Automated Email Notifications**: Stay informed with automatic email updates sent to relevant mail IDs whenever changes are made to the register or the users. Never miss a critical update! 📧🔔
- **Feature-Rich Admin Panel**: Manage users and departments with ease through our comprehensive admin panel, designed for efficient CRUD (Create, Read, Update, Delete) operations. ⚙️👨‍💼

## 🛠️ Technologies Used 🚀

### 🌐 Frontend
- **React**: Used to build the dynamic and interactive user interface of the DSR system, including forms for user input, the dashboard, and real-time updates for managing the stock register.
- **Tailwind CSS**: Employed to create a sleek, responsive design for the entire application, ensuring that the UI is both modern and mobile-friendly.
- **react-icons**: Integrated for adding intuitive icons throughout the application, improving visual cues for actions like editing, deleting, and navigating the UI.
- **react-modal**: Utilized to create custom modals for user confirmations, such as confirming the deletion of a department or prompting for additional details.

### 🖥️ Backend
- **Node.js**: Powers the backend server, handling API requests, processing business logic, and serving data to the frontend.
- **Express**: Manages routing and middleware on the backend, enabling CRUD operations for users, departments, and register entries. It handles the core logic for role-based access control (RBAC) and data validation.
- **Mongoose**: Facilitates interaction with MongoDB, allowing for the definition of schemas for users, departments, and register entries. It also manages relationships and data validation within the database.
- **JWT (jsonwebtoken)**: Implements secure user authentication, generating tokens that verify a user’s identity and role before allowing access to protected routes and operations.
- **Multer**: Used for handling file uploads within the application, particularly for uploading documents or images related to the stock register entries.

### 💾 Database
- **MongoDB**: Stores all the data for the DSR, including user information, departments, register entries, and logs of changes. The flexibility of MongoDB allows for easy updates and queries on the hierarchical data structure.
- **MongoDB Atlas**: Hosts the MongoDB database in the cloud, providing automated backups, scaling, and monitoring, ensuring the DSR system is always available and performant.

### 📜 PDF Generation and Emailing
- **jsPDF**: Generates PDF versions of the Dead Stock Register entries, allowing users to download or print reports directly from the application.
- **jsPDF autoTable**: Adds structured tables to the PDFs, ensuring that the generated reports are well-organized and easy to read, especially when handling large datasets.
- **Nodemailer**: Automatically sends emails to relevant users when updates are made to the register, such as when a new entry is added or an existing entry is modified. This keeps all stakeholders informed in real-time.

### 🔒 Security and Environment Management
- **dotenv**: Manages environment variables, keeping sensitive information like database URIs, API keys, and JWT secrets secure and easily configurable across different environments.
- **CORS**: Configured to allow secure cross-origin requests from the frontend to the backend API, ensuring that only authorized clients can interact with the server.

### 🔄 Development Tools
- **Nodemon**: Used during development to automatically restart the Node.js server whenever changes are made to the backend code, improving developer efficiency.
- **axios**: Handles HTTP requests from the frontend to the backend, used extensively for fetching and submitting data such as user authentication, register entries, and department details.


## 📚 Libraries Used

- **React**: For building dynamic, interactive user interfaces. 🌐
- **Tailwind CSS**: For crafting beautiful, responsive designs with utility-first CSS. 🎨
- **Express**: To manage backend routes and handle HTTP requests. 🛣️
- **Node.js**: As the server-side runtime environment. 🖥️
- **Mongoose**: For object data modeling (ODM) to interact with MongoDB. 🔗
- **JWT (jsonwebtoken)**: For secure user authentication and authorization. 🔑
- **jsPDF**: For generating PDF documents within the application. 📜
- **jsPDF autoTable**: For creating structured tables within PDFs. 📊
- **Nodemailer**: For sending automated email notifications. 📧
- **CORS**: For enabling Cross-Origin Resource Sharing in the backend. 🌍
- **axios**: For making HTTP requests from the frontend. 📡
- **Multer**: For handling file uploads in the application. 📂
- **Nodemon**: For automatically restarting the server during development. 🔄
- **react-icons**: For integrating beautiful icons into the frontend. 🎨
- **react-modal**: For creating accessible and customizable modals in the application. 🪟

## ⚙️ Installation

### 🖥️ Client-Side Setup

- 1 - Navigate to the client folder:
    ```bash
   cd client
    ```

- 2 - Then, move to the DSR folder:
   ```bash
   cd DSR
    ```

- 3 - Install the necessary dependencies:
    ```bash
   npm i
    ```

- 4 - Start the frontend development server:
    ```bash
   npm run dev
    ```
    
### 🗄️ Server-Side Setup

- 1 - Navigate to the server folder:
    ```bash
   cd server
    ```

- 2 - Install the necessary dependencies:
    ```bash
   npm i
    ```

- 3 - Create a `.env` file in the server folder and define the following variables:

   - ACCESS_TOKEN_SECRET: This is a secret key used for signing and verifying JSON Web Tokens (JWTs) to secure user authentication.

   - MAILER_TRANSPORTER_SERVICE: Set this to gmail to configure Nodemailer to use Gmail as the email service provider.

   - MAILER_AUTH_ID: This is the email ID used for sending emails via the Nodemailer transporter.

   - MAILER_AUTH_PASS: This is the password or app-specific password for the MAILER_AUTH_ID account, required for authentication. [Youtube Guide](https://youtu.be/MkLX85XU5rU?si=A1eVoJwHBZDsg15i)

   - MAILER_FROM_ID: The email address that will appear in the "From" field when sending emails through the system.

   Example `.env` file:
   ```bash
   ACCESS_TOKEN_SECRET=your_jwt_secret_key
   MAILER_TRANSPORTER_SERVICE=gmail
   MAILER_AUTH_ID=your_email@gmail.com
   MAILER_AUTH_PASS=your_email_app_password (not email id password)
   MAILER_FROM_ID=your_email@gmail.com
   ```

- 4 . Start the backend server:
  ```bash
   npm start
  ```

## 📋 Usage

- **User Authentication**: Easily register and log in to access tailored features based on your role. Enjoy a secure and personalized experience. 🔐👥
- **Admin Panel**: Manage users and departments efficiently from a user-friendly admin interface. Perform CRUD operations with ease. ⚙️🛠️
- **PDF Generation**: Generate detailed reports in PDF format for documentation and sharing. Perfect for record-keeping and communication. 📄💼
- **Email Notifications**: Receive automatic email alerts about changes to the register, ensuring you stay updated in real time. 📧🔔



For any issues or questions, feel free to open an issue or reach out to us at:
systems.dsr@gmail.com.

We're here to help! 🌟💬
