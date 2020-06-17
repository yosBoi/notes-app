# note-making web app

Web app made using MERN stack.

React context is used for maintaining auth state and user.
React hooks are used for state management.

Users can register/log in and create/edit/delete notes.
Users can reset password (using recovery code sent to their registered email ID).
User info and notes are stored in a mongoDB database.

User passwords are hashed using bcrypt, and session authentication is done using JWT

App live at [yos-notes.herokuapp.com](https://yos-notes.herokuapp.com/)
