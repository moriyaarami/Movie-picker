import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { type Gener, type Movie, type TrailerType } from "../services/apiServices"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { getFromLocalStorage, saveToLocalStorage } from "../services/localStorageUtils"
import '../style/section.css'


type componentProps = {
    movie: Movie,
    currentGeners: Gener[] | undefined,
    trailerInfo: TrailerType | undefined

}

export default function ShowMovie({ movie, currentGeners, trailerInfo }: componentProps) {

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favoriteMovies = getFromLocalStorage<number[]>('favoriteList')
        if (favoriteMovies == null) {
            return;
        }
        setIsFavorite(favoriteMovies?.includes(movie.id))


    }, [movie])


    const handleFavorite = (movieId: number) => {

        setIsFavorite(prev => !prev)
        const favoriteMovies = getFromLocalStorage<number[]>('favoriteList')

        if (favoriteMovies?.includes(movieId)) {
            const updateFavorites = favoriteMovies.filter(id => id !== movieId)
            saveToLocalStorage('favoriteList', updateFavorites);

        } else {
            const updateFavorites = [...(favoriteMovies || []), movieId];
            saveToLocalStorage('favoriteList', updateFavorites)

        }

    }

    const handleWatchTrailer = async () => {
        if (trailerInfo) {

            if (trailerInfo?.site === 'YouTube') {
                const trailerUrl = (`https://www.youtube.com/watch?v=${trailerInfo.key}`
                )
                window.open(trailerUrl, "_blank");
            }

        }

    }

    return <>
        <>
            <div className="image">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="the poster of the movie" />
            </div>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>

            <p className='gener'>
                {currentGeners?.map((gener, index) => {
                    return <span key={index} className='gener'>{gener.name}</span>
                })}
            </p>
            <p>{movie.release_date}</p>
            <div className="rate-favorite">
                <p>
                    <span>{Math.floor(movie.vote_average
                    )}⭐</span>
                </p>
                <p>
                    <span onClick={() => handleFavorite(movie.id)} title="add to favorite" className="heart-icon">
                        <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeart} />
                    </span>


                </p>


            </div>
            {trailerInfo && <button className="trailer" id="button" onClick={handleWatchTrailer}>Trailer</button>}


        </>

    </ >
}