import {useLocation} from "react-router-dom";
import {MOVIES_API_URL} from "../../utils/constants";
import {useEffect, useState} from "react";

function MoviesCard({ movie, savedMoviesToggle, filmsSaved }) {
    const [favorite, setFavorite] = useState(false);
    const { pathname } = useLocation();


    function handleClickFavorite() {
        const newFavorite = !favorite;
        const savedFilm = filmsSaved.filter((obj) => {
            return obj.movieId == movie.id;
        });
        savedMoviesToggle({ ...movie, _id: savedFilm.length > 0 ? savedFilm[0]._id : null }, newFavorite);
    }

    function handleFavoriteDelete() {
        savedMoviesToggle(movie, false);
    }

    useEffect(() => {
        if (pathname !== '/saved-movies') {
            const savedFilm = filmsSaved.find((obj) =>  obj.movieId == movie.id);
            setFavorite(!!savedFilm);
        }
    }, [pathname, filmsSaved, movie.id]);


    const isSavedMovies = pathname === "/saved-movies";
    const imageUrl = isSavedMovies ? movie.thumbnail : MOVIES_API_URL + movie.image.formats.thumbnail.url;
    const hours = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;
    const link = movie.trailerLink;

    return (
        <article className="card">
            <div className="card__container">

                {pathname === "/saved-movies" ? (
                    <button
                        type="button"
                        className="card__favorite link card__favorite_delete"
                        onClick={handleFavoriteDelete}
                    />
                ) : (
                    <button
                        type="button"
                        className={`card__favorite card__favorite${
                            favorite ? "_active" : ""
                        }`}
                        onClick={handleClickFavorite}
                    />
                )}
                <a href={link} target={"_blank"}>
                    <img className="card__image" src={imageUrl} alt={movie.nameRU}/>
                </a>
            </div>
            <div className="card__footer">
                <h2 className="card__title">{movie.nameRU}</h2>
                <p className="card__duration text color-text">{`${hours}ч ${minutes}м`}</p>
            </div>
        </article>
    );
}

export default MoviesCard;
