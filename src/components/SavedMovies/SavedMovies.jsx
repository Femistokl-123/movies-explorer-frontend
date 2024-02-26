import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ moviesList }) {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList moviesList={moviesList} loading={false} />
    </div>
  );
}

export default SavedMovies;
