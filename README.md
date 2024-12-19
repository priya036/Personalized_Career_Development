# CareerDev 

Welcome to the Personalised Career Development Platform, a web application designed to help users navigate their career paths by providing personalized insights, skills requirements, project ideas, and resume templates tailored to specific career roles.

## Features

- **Chatbot**             : An interactive chatbot that assists users with various queries related to career development.
- **Skill Requirements**  : Get personalized insights on essential skills needed for different career paths.
- **Project Ideas**       : Discover project ideas that align with your career ambitions to enhance your portfolio.
- **Resume Builder**      : Create professional resumes tailored for specific job roles.
- **User  Profiles**      : Manage user profiles and save user data for a personalized experience.

## Technologies Used

- **Frontend**             : React, React Router, Axios, CSS
- **Backend**              : Node.js, Express, MongoDB
- **Authentication**       : Firebase Authentication
- **Chatbot Integration**  : Groq SDK for AI-driven responses

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/CareerDev.git
   cd CareerDev
   ```

2. **Install dependencies**:
   
   For the client-side:

   ```bash
   cd client
   npm install
   ```
   For the server-side:

   ```bash
   cd server
   node server.js
   ```

3. **Set up environment variables**:

   Create a .env file in the client and server directories and add the following variables:
   
   For the client:

   ```bash
   REACT_APP_API_ENDPOINT        = http://localhost:5000
   REACT_APP_FIREBASE_API_KEY    = <your_firebase_api_key>
   REACT_APP_AUTH_DOMAIN         = <your_auth_domain>
   REACT_APP_PROJECT_ID          = <your_project_id>
   REACT_APP_STORAGE_BUCKET      = <your_storage_bucket>
   REACT_APP_MESSAGING_SENDER_ID = <your_messaging_sender_id>
   REACT_APP_APP_ID              = <your_app_id>
   ```
   For the server:

   ```bash
   MONGO_URI    = <your_mongodb_connection_string>
   GROQ_API_KEY = <your_groq_api>
   ```
   
4. **Run the Application**:
   
   For the server-side:

   ```bash
   cd server
   node server.js
   ```
   For the client-side:

   ```bash
   cd client
   npm start
   ```
5. Open your browser and navigate to http://localhost:3000 to access the application.

   
## Usage
**Authentication**   : Users can sign in using Google or through Auth0.
**Chatbot**          : Users can interact with the chatbot for guidance on career-related questions.
**Explore Features** : Navigate through the different features such as Skills, Projects, and Resume Builder.

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
Thanks to the developers of the libraries and frameworks used in this project
