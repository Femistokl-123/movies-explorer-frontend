import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import MainApi from "../../utils/MainApi";
import {useSavedMovies} from "../../hooks/useSavedMovies";

function SavedMovies() {
    const mainApi = new MainApi(localStorage.getItem("jwt"));

    const {
        handleSetSearch,
        handleSetShortFilms,
        filteredFilms,
        shortFilms,
        search,
        handleDeleteSaved,
    } = useSavedMovies(mainApi);

  return (
    <div className="movies">
      <SearchForm
          isChecked={shortFilms}
          handleSetSearch={handleSetSearch}
          handleShortFilms={handleSetShortFilms}
          search={search}
      />
        <MoviesCardList
            filmsRemains={0}
            savedMoviesToggle={handleDeleteSaved}
            moviesList={filteredFilms}
        />
    </div>
  );
}

export default SavedMovies;
