# 🎬 MoviePicker

**MoviePicker** is a responsive web application that helps users find a movie to watch — randomly or based on filters such as genre, release year, and minimum rating. Users can also add or remove movies from their favorites list, which is accessible through a dedicated favorites page.

---

## 🔥 Features

* Random movie suggestion
* Filter by genre, year, and rating
* Add/remove movies to/from favorites
* Favorites stored locally (localStorage)
* Responsive design for mobile and desktop
* Navigation using React Router

---

## 🛠️ Tech Stack

* **React** (with Vite)
* **TypeScript**
* **CSS**
* **TMDB API** for movie data

---
## 📦 Installation

```bash
npm install
npm run dev
```

---

## 🗂️ Pages

* `/` – Home page: random movie picker + filters
* `/favorites` – Your saved favorite movies

---

## 📡 API

This app uses [The Movie Database (TMDB) API](https://developer.themoviedb.org/). You will need to generate an API key from TMDB and store it securely.

### 🔐 How to configure your API key

1. Create a `.env` file in the root of your project.
2. Add the following lines to it:

   ```env
   VITE_API_KEY=your_api_key_here
   VITE_HEADER_API_KEY=your_header_key_here
   ```
3. In your code, access the key using:

   ```ts
   const API_KEY = import.meta.env.VITE_API_KEY;
   const HEADER_KEY = import.meta.env.VITE_HEADER_API_KEY;
   ```
4. Make sure `.env` is listed in your `.gitignore` file.

---

## 🔗 Live Demo


Currently available at: [vercel] (https://movie-picker-opal.vercel.app/))

---

## 🙋‍♀️ Author

Created by **\Moriya Arami** as part of a personal portfolio project to showcase frontend development skills.
