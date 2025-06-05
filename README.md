# Personal Notes App

A modern, responsive Personal Notes App built with React.js (Vite), Node.js, Express, MongoDB, and vite-plugin-pwa. The app allows users to create, read, update, and delete (CRUD) notes, with a sleek UI styled using pure CSS and offline support via Progressive Web App (PWA) features.

## Features

* **CRUD Operations:** Create, read, update, and delete notes stored in MongoDB.
* **Responsive UI:** A clean, modern interface with a modal form, search functionality, and note grid layout.
* **Offline Support:** PWA with vite-plugin-pwa enables offline note viewing and queued delete operations.
* **Background Sync:** Offline delete requests are queued and synced when the network is restored.
* **Search:** Filter notes by title or content in real-time.
* **Toast Notifications:** User feedback for create, update, delete, and offline actions using react-toastify.
* **Pure CSS Styling:** Custom CSS for a polished look without external frameworks like Tailwind.
* **Error Handling:** Displays errors in the UI and via toast notifications.

## Tech Stack

* **Frontend:** React.js, Vite, vite-plugin-pwa, Axios, react-toastify, Lucide React (icons)
* **Backend:** Node.js, Express, MongoDB (Mongoose)
* **Styling:** Pure CSS
* **PWA:** Offline support and background sync with Workbox

## Project Structure

```
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
```

## Prerequisites

* Node.js (v16 or higher)
* MongoDB (local or MongoDB Atlas)
* Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd personal-notes-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/notesDB?retryWrites=true&w=majority
PORT=5000
```

Start the backend server:

```bash
node server.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```
VITE_API_URL=http://localhost:5000
```

Add PWA icons to `frontend/public/`.
Start the frontend development server:

```bash
npm run dev
```

### 4. Testing

* Open [http://localhost:5173](http://localhost:5173)
* Create/Edit Notes, Delete Notes, Use Search
* Test Offline Mode using Chrome DevTools
* Install the PWA

## API Endpoints

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| GET    | /api/notes      | Fetch all notes     |
| POST   | /api/notes      | Create a new note   |
| PUT    | /api/notes/\:id | Update a note by ID |
| DELETE | /api/notes/\:id | Delete a note by ID |

## PWA Features

* **Offline Support:** Cached with a NetworkFirst strategy
* **Background Sync:** Queued deletes when offline
* **Installable:** Works as a PWA
* **Offline Page:** Shows `offline.html` when offline

To enhance PWA features:

* Add push notifications for sync events
* Add app shortcuts in the manifest

## Deployment

### Backend

* Deploy to Render, Heroku, or Vercel
* Use MongoDB Atlas
* Update `MONGO_URI` in `backend/.env`
* Allow CORS in `server.js`

```js
app.use(cors({ origin: '<frontend-url>' }));
```

### Frontend

```bash
cd frontend
npm run build
```

* Deploy `dist` to Netlify, Vercel, or GitHub Pages
* Update `VITE_API_URL` in `.env`
* Use HTTPS for full PWA features

## Troubleshooting

* **Delete Button Not Working:** Check console and Network tab, validate note ID, check CORS
* **Offline Issues:** Check `localStorage` for pendingDeletes
* **MongoDB Errors:** Verify `.env`, ensure MongoDB is accessible

## Future Enhancements

* User authentication (JWT)
* Push notifications
* Rich text editor
* Search with tags or categories

## License

This project is released for personal and educational use. You are free to explore, modify, and build upon it, but redistribution or commercial use may require permission.
