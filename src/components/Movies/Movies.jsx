import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import {MOVIES_COUNT_CONFIG} from "../../utils/constants";
import {useEffect, useState} from "react";
import useResize from "../../hooks/useResize";
import {useMovies} from "../../hooks/useMovies";
import {moviesApi} from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";

function getMoviesCount(width) {
    let countCards;
    const MoviesCountConfig = MOVIES_COUNT_CONFIG;

    Object.keys(MoviesCountConfig)
        .sort((a, b) => a - b)
        .forEach((key) => {
            if (width > +key) {
                countCards = MoviesCountConfig[key];
            }
        });

    return countCards;
}

function Movies() {
    const [filmsSaved, setFilmsSaved] = useState([]);
    const [MoviesCount, setMoviesCount] = useState([]);
    const [filmsShowed, setFilmsShowed] = useState([]);

    const screenWidth = useResize();

    const {
        handleSetSearch,
        handleSetShortFilms,
        filteredFilms,
        notFound,
        initFilms,
        shortFilms,
        search,
        loading
    } = useMovies(moviesApi.getMovies.bind(moviesApi));


    const mainApi = new MainApi(localStorage.getItem("jwt"));

    useEffect(() => {
        setMoviesCount(getMoviesCount(screenWidth));
    }, [screenWidth]);

    function handleMore() {
        const newFilmsShowed = filmsShowed.concat(
            filteredFilms.slice(filmsShowed.length, MoviesCount[1] + filmsShowed.length)
        );
        setFilmsShowed(newFilmsShowed);
    }

    useEffect(() => {
        const sliceData = filteredFilms.slice(0, getMoviesCount(screenWidth)[0]);
        setFilmsShowed(sliceData);
    }, [filteredFilms, screenWidth]);

    async function savedMoviesToggle(film, favorite) {
        const jwt = localStorage.getItem("jwt");
        const api = new MainApi(jwt);
        if (favorite) {
            const objFilm = {
                image: "https://api.nomoreparties.co" + film.image.url,
                trailerLink: film.trailerLink,
                thumbnail: "https://api.nomoreparties.co" + film.image.url,
                movieId: film.id,
                country: film.country || "Неизвестно",
                director: film.director,
                duration: film.duration,
                year: film.year,
                description: film.description,
                nameRU: film.nameRU,
                nameEN: film.nameEN,
            };
            try {
                const res = await api.save(objFilm);
                const savedMovies = JSON.parse(localStorage.getItem("savedFilms"));
                const newSaved = savedMovies.concat(res);
                setFilmsSaved(newSaved);
                localStorage.setItem("savedFilms", JSON.stringify(newSaved));
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await api.delete(film._id);
                const savedMovies = JSON.parse(localStorage.getItem("savedFilms"));
                const newSaved = savedMovies.filter((element) => {
                    return element._id !== film._id;
                });
                setFilmsSaved(newSaved);
                localStorage.setItem("savedFilms", JSON.stringify(newSaved));
            } catch (err) {
                console.log(`${err}`);
            }
        }
    }

    useEffect(() => {
        const localStorageFilmsSaved = localStorage.getItem("savedFilms");

        if (!localStorageFilmsSaved) {
            mainApi.getSaved().then((savedFilms) => {
                setFilmsSaved(savedFilms);
                localStorage.setItem("savedFilms", JSON.stringify(savedFilms));
            });
        } else {
            const savedLocalFilms = JSON.parse(localStorageFilmsSaved);
            setFilmsSaved(savedLocalFilms);
        }
    }, []);
  return (
    <div className="movies">
        <SearchForm
            isChecked={shortFilms}
            handleSetSearch={handleSetSearch}
            handleShortFilms={handleSetShortFilms}
            search={search}
        />
        {loading && <Preloader />}
        {filteredFilms !== null && filmsShowed !== null && (
            <MoviesCardList
                filmsRemains={filteredFilms.length - filmsShowed.length}
                handleMore={handleMore}
                moviesList={filmsShowed}
                savedMoviesToggle={savedMoviesToggle}
                filmsSaved={filmsSaved}
                notFound={notFound}
            />
        )}
    </div>
  );
}

export default Movies;
