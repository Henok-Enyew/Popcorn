# 🍿 Popcorn Movies

**Popcorn Movies** is a web application that allows users to search for any movie, view detailed information including ratings, and rate the movie themselves. Users can also add movies to their watched list, which is saved using localStorage, so the list is persistent even after a page refresh.

## 🚀 Live Demo

Check out the live demo here: [Popcorn Movies](https://pop-corn-movies.netlify.app/)

## 🛠️ Features

- **Search for Movies**: Users can search for any movie using the search bar.
- **Movie Details**: Detailed information about the movie, including its rating, release year, and poster, is displayed.
- **User Rating**: Users can rate the movie and submit their rating.
- **Watched List**: Users can add movies to a watched list, and their selection is saved using `localStorage` so that the list persists even after refreshing the page.

## 🧰 Technologies Used

- **Frontend**: React (via Vite)
- **State Management**: React Hooks
- **Styling**: CSS
- **Local Storage**: Used to store the user's watched list
- **Deployment**: Hosted on Netlify

## 🛠️ How to Install and Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/popcorn-movies.git
   ```

2. Navigate to the project directory:
   ```bash
   cd popcorn-movies
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Run the app locally:
   ```bash
   npm run dev
   ```
5. Open your browser and visit http://localhost:3000 to view the app.

## 📂 Project Structure
``` 
src/
├── assets/ # Static images and assets
├── components/ # Reusable components
├── hooks/ # Custom hooks (e.g., useLocalStorage)
├── pages/ # Page components (Home, MovieDetails)
├── utils/ # Utility functions
├── App.jsx # Main app component
└── index.jsx # Entry point
   ```
## 🧑‍💻 Author

- **Henok Enyew 🐱‍👤**
  - GitHub: [Henok-Enyew](https://github.com/henok-enyew)
  - Live App: [Popcorn Movies](https://pop-corn-movies.netlify.app/)
