export function Movie({ movie, onSelectedId }) {
  const altTitle =
    movie.Title.length > 10 ? movie.Title.slice(0, 15) + "..." : movie.Title;

  return (
    <li onClick={() => onSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${altTitle} poster`} className="text-sm" />
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
