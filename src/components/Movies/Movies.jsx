import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies({ moviesList, loading }) {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList moviesList={moviesList} loading={loading} />
    </div>
  );
}

export default Movies;
