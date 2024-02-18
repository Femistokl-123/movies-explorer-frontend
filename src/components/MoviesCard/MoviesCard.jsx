import {useLocation} from "react-router-dom";
import {MOVIES_API_URL} from "../../utils/constants";

function MoviesCard({movie}) {
    const location = useLocation();

    const path = location.pathname;
    const isSavedMovies = path === "/saved-movies";
    const imageUrl = movie.image.formats.thumbnail.url;
    const hours = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;


    function handleClickFavorite(e) {
        const button = e.target;
        if (button.classList.contains("card__favorite_active")) {
            button.classList.remove("card__favorite_active");
        } else {
            button.classList.add("card__favorite_active");
        }
    }

    return (
        <article className="card">
            <div className="card__container">
                <button
                    type="button"
                    className={`card__favorite link ${
                        isSavedMovies && "card__favorite_delete"
                    }`}
                    onClick={handleClickFavorite}
                ></button>
                <img className="card__image" src={`${MOVIES_API_URL}${imageUrl}`} alt={movie.nameRU}/>
            </div>
            <div className="card__footer">
                <h2 className="card__title">{movie.nameRU}</h2>
                <p className="card__duration text color-text">{`${hours}ч ${minutes}м`}</p>
            </div>
        </article>
    );
}

export default MoviesCard;