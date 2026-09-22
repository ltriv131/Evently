# Evently

This is my submission for Full Stack at Brown, Evently. This is an event registration website, where users can view, register for, save, and create events.

The framework used for this project is Next.js with React. This project strengthened my understanding of states, props, and a variety of React hooks. The backend is an Express.js server, which is the API endpoint for event requests. This server connects to a firestore database which stores the event data, and also connects to a cloudinary database which stores the images for the events. The backend server sits on the same host as the Next.js server, and uses a reverse proxy layer to distribute api requests to the backend server without CORS.

## Running

Clone this repository, and add the secrets folder which you should have to the root folder of the project (Should be Evently -> secrets).

1. Enter the project

   ```
   cd ./Evently
   ```

2. Install the packages

   ```
   npm install
   ```

3. Run the project (NOTE: You must run both the backend server and the Next.js dev server or else the events will not show up. Do not just run npm run dev!)

   ```
   npm run dev:all
   ```

4. Go to `http://localhost:3000/events`

The website should load!
