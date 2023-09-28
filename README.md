## MERN_TODOS_APP

It's todo's app built with MERN Stack . It's my final project at CTD

## Tech Stack

- **Frontend:** React.js, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

**Client:** React JS , Vite JS, CSS

**Server:** Node, Express , MongoDB .

**Authentication :** JSON Web Tokens (JWT)

## API Endpoints

- `GET /check-auth`: Checks if the user is authenticated.
- `POST /signup`: Handles user signup.
- `POST /login`: Handles user login.
- `GET /logout`: Handles user logout.
- `GET /user`: Retrieves user information.
- `PUT /user/update`: Updates user profile.
- `DELETE /user/delete`: Deletes user account.
- `POST /addtodo`: Adds a new todo.
- `GET /todos`: Retrieves all todos.
- `GET /completedTodos`: Retrieves completed todos.
- `GET /pendingTodos`: Retrieves pending todos.
- `PUT /todo/updateStatus`: Updates todo status (completed or pending).
- `PUT /todo/update`: Updates todo.
- `DELETE /todo/delete`: Deletes todo.

## Key Features:

- **User Authentication:** Users can signup, login, and logout from the application.
- **Profile Management:** Users can update their profile information, including name and email.
- **Password Management:** Users can change their password and request a password reset if forgotten.
- **Todo Management:** Users can add, remove, and update their todos.
- **Todo Status:** Users can mark todos as completed or pending.
- **Todo Sections:** The app categorizes todos into All Todos, Completed Todos, and Pending Todos sections.
- **Extensibility:** The app is designed with extensibility in mind, making it easy to add new features in the future.
- **Page Not Found:** A custom 404 page is displayed when users try to access non-existent pages.

## Run Locally

Clone the project :

```bash
  git clone <repository-url>
```

Go to the project directory :

```bash
  cd MERN_TODO_APP
```

## Running the App

1. Start the backend server:

```bash
  cd backend
```

Install the dependencies :

```bash
  npm install
```

To run this project, you will need to create an .env file and add the following environment variables to your .env file:

```
PORT=<server-port>
MONGO_URL=<mongodb-connection-string>
CLIENT_URL=<client-side-url>
SECRET=<jwt-secret-key>

```

Launch the server :

```bash
  npm start
```

2. Start the frontend server:

```bash
   cd client
```

Install the dependencies :

```bash
  npm install
```

Launch the server :

```bash
  npm run dev
```

To run this project, you will need to create an .env file and add the following environment variables to your .env file:

```
VITE_REACT_APP_API_KEY= backend_url
```

3. Access the app in your web browser:

Open a web browser and access the application at `http://localhost:3000`

**Note:** Make sure to update the port number (`3000`) according to your client server configuration.

Feel free to customize and enhance the project according to your needs and send pull requests.

**NB:** IF YOU MEET AN ERROR WHEN YOU TRY TO LOGIN OR SIGN UP , TRY TO DELETE `bycrpt` FOLDER IN THE `node_modules` FOLDER AND RE-INSTALL IT :

```bash
npm install bycrpt
```

You can meet this problem with `OS X 10.13`
