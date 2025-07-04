import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { GetTrailer, type FavoriteMovie } from "../services/apiServices"
import '../style/card.css'
type MoviePropType = {
    movie: FavoriteMovie,
    removeFavorite: (id: number) => void,
}

export default function Card({ movie, removeFavorite }: MoviePropType) {


    const handleWatchTrailer = async () => {
        const trailerInfo = await GetTrailer(movie.id);
        console.log(trailerInfo)
        if (trailerInfo?.site === 'YouTube') {
            const trailerUrl = (`https://www.youtube.com/watch?v=${trailerInfo.key}`
            )
            window.open(trailerUrl, "_blank");
        }
    }



    return <div className="card" key={movie.id}>
        <div className="image">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="the poster of the movie" />
        </div>
        <div className="card-titel">
            <h3>{movie.title}</h3>
        </div>
        <div className="card-body">
            <p>{Math.floor(movie.vote_average)} ⭐</p>
            <p>{movie.genres.map((gener) => gener.name).join(', ')}</p>
            <div className="rate-favorite">
                <p>
                    <span>
                        {movie.release_date}
                    </span></p>
                <p>
                    <span >
                        <FontAwesomeIcon icon={faHeartSolid} onClick={() => removeFavorite(movie.id)} />
                    </span>


                </p>
            </div>
            <button id="button" onClick={handleWatchTrailer}>Trailer</button>
        </div>
    </div>
}