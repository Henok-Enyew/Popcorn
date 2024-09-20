import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import StarRating from "./StarRating";
import "./index.css";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "98c96d4c";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() =>
    JSON.parse(localStorage.getItem("watched"))
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectedID(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseSelectedId() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(movie) {
    setWatched((watched) => watched.filter((m) => m.imdbID !== movie.imdbID));
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }
      handleCloseSelectedId();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Nav>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>
      <Main>
        <Box>
          {isLoading && <Loader loading={isLoading} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedId={handleSelectedID} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              watched={watched}
              selectedId={selectedId}
              onCloseSelectedId={handleCloseSelectedId}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function MovieDetails({
  watched,
  selectedId,
  onCloseSelectedId,
  onAddWatched,
}) {
  const [movieDetails, setMovieDetials] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const isWatched = watched.map((w) => w.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (w) => w.imdbID === selectedId
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;
  function handleAdd() {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newMovie);
    onCloseSelectedId();
  }

  useEffect(
    function () {
      async function fetchDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}&plot=full`
        );
        const data = await res.json();
        setMovieDetials(data);
        setIsLoading(false);
      }
      selectedId && fetchDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "Popcorn Movies";
      };
    },
    [title]
  );

  useEffect(
    function () {
      function escape(e) {
        if (e.code === "Escape") onCloseSelectedId();
      }
      document.addEventListener("keydown", escape);
      return function () {
        document.removeEventListener("keydown", escape);
      };
    },
    [onCloseSelectedId]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseSelectedId}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie `} />
            <div className="details-overview">
              <h2>{title}</h2>

              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating size={24} maxRating={10} onRate={setUserRating} />
                  {userRating > 0 && !isWatched && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You have rated this movie {watchedUserRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>👀 </span> {message}
    </p>
  );
}
function Loader({ loading }) {
  return (
    <div className="loader">
      {" "}
      <PulseLoader size={32} color="#7950f2" loading={loading} />
    </div>
  );
}
function Nav({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {/* <Search /> */}
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>Popcorn Movies</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{0}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function WatchedList({ watched, onDeleteWatched }) {
  return (
    <ul className="list ">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  function handleDelete() {
    onDeleteWatched(movie);
  }
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={handleDelete}>
          &times;
        </button>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(1);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating)
  ).toFixed(1);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(1);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectedId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectedId={onSelectedId} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectedId }) {
  return (
    <li onClick={() => onSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
