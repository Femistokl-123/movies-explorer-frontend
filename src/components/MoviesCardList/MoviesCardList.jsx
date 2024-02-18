import { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ moviesList, loading }) {
  const [countMovies, setCountMovies] = useState(12);

  function handleClickMoreMovies() {
    setCountMovies(countMovies + 12);
  }

  return (
    <div className="cards">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <section className="cards__list">
            {moviesList.slice(0, countMovies).map((movie) => (
              <MoviesCard movie={movie} key={movie.id} />
            ))}
          </section>

          {countMovies < moviesList.length && (
            <button type="button" className="cards__button text link" onClick={handleClickMoreMovies}>
              Ещё
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default MoviesCardList;