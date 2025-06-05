Personal Notes App
A modern, responsive Personal Notes App built with React.js (Vite), Node.js, Express, MongoDB, and vite-plugin-pwa. The app allows users to create, read, update, and delete (CRUD) notes, with a sleek UI styled using pure CSS and offline support via Progressive Web App (PWA) features.
Features
CRUD Operations: Create, read, update, and delete notes stored in MongoDB.

Responsive UI: A clean, modern interface with a modal form, search functionality, and note grid layout.

Offline Support: PWA with vite-plugin-pwa enables offline note viewing and queued delete operations.

Background Sync: Offline delete requests are queued and synced when the network is restored.

Search: Filter notes by title or content in real-time.

Toast Notifications: User feedback for create, update, delete, and offline actions using react-toastify.

Pure CSS Styling: Custom CSS for a polished look without external frameworks like Tailwind.

Error Handling: Displays errors in the UI and via toast notifications.

Tech Stack
Frontend: React.js, Vite, vite-plugin-pwa, Axios, react-toastify, Lucide React (icons)

Backend: Node.js, Express, MongoDB (Mongoose)

Styling: Pure CSS

PWA: Offline support and background sync with Workbox

Project Structure

personal-notes-app/
├── backend/
│   ├── models/
│   │   └── Note.js
│   ├── routes/
│   │   └── notes.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── icon-192x192.png
│   │   ├── icon-512x512.png
│   │   └── offline.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── .env
│   └── package.json
└── README.md

Prerequisites
Node.js (v16 or higher)

MongoDB (local or MongoDB Atlas)

Git

Setup Instructions
1. Clone the Repository
bash

git clone <repository-url>
cd personal-notes-app

2. Backend Setup
Navigate to the backend directory:
bash

cd backend

Install dependencies:
bash

npm install

Create a .env file in the backend directory:
env

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/notesDB?retryWrites=true&w=majority
PORT=5000

Replace MONGO_URI with your MongoDB connection string (local or Atlas).

Start the backend server:
bash

node server.js

The server runs on http://localhost:5000.

3. Frontend Setup
Navigate to the frontend directory:
bash

cd ../frontend

Install dependencies:
bash

npm install

Create a .env file in the frontend directory:
env

VITE_API_URL=http://localhost:5000

Add PWA icons:
Place icon-192x192.png and icon-512x512.png in frontend/public/ (generate icons using tools like Favicon.io).

Start the frontend development server:
bash

npm run dev

The app runs on http://localhost:5173.

4. Testing
Open http://localhost:5173 in your browser.

Create/Edit Notes: Click "New Note," enter a title and content, and save.

Delete Notes: Click the trash icon on a note. Verify it’s removed from the UI and MongoDB.

Search: Use the search bar to filter notes by title or content.

Offline Mode: Go offline (Chrome DevTools > Network > Offline), delete a note, and check the toast notification ("Delete request queued"). Go online to confirm the delete syncs.

PWA: Install the app via the browser’s "Add to Home Screen" prompt for offline access.

API Endpoints
Method

Endpoint

Description

GET

/api/notes

Fetch all notes

POST

/api/notes

Create a new note

PUT

/api/notes/:id

Update a note by ID

DELETE

/api/notes/:id

Delete a note by ID

PWA Features
Offline Support: Notes are cached using a NetworkFirst strategy for API requests.

Background Sync: Offline delete requests are queued and synced when online.

Installable: The app can be installed as a PWA on supported browsers.

Custom Offline Page: Displays offline.html when the app is offline (configurable in vite.config.js).

To enhance PWA features:
Add push notifications for sync events (requires a push server).

Implement app shortcuts in the manifest for quick actions (e.g., "New Note").

Deployment
Backend
Deploy to a platform like Render, Heroku, or Vercel.

Set up MongoDB Atlas for a cloud database.

Update MONGO_URI in backend/.env with the Atlas connection string.

Ensure CORS allows the deployed frontend URL:
javascript

app.use(cors({ origin: '<frontend-url>' }));

Frontend
Build the app:
bash

cd frontend
npm run build

Deploy the dist folder to Netlify, Vercel, or GitHub Pages.

Update VITE_API_URL in frontend/.env to the deployed backend URL.

Ensure HTTPS for PWA features.

Troubleshooting
Delete Button Not Working:
Check browser console for errors in handleDelete.

Verify the DELETE request in the Network tab (should return 200).

Ensure the note _id is valid in MongoDB (use MongoDB Compass).

Confirm CORS is enabled in backend/server.js.

Offline Issues:
Test offline deletes using Chrome DevTools > Network > Offline.

Check localStorage for pendingDeletes and ensure sync occurs when online.

MongoDB Errors:
Verify MONGO_URI in backend/.env.

Ensure MongoDB is running and accessible.

Future Enhancements
Add user authentication (e.g., JWT) for private notes.

Implement push notifications for sync events.

Add a rich text editor for note content.

Enhance search with tags or categories.

License
MIT License. Feel free to use and modify this project.

