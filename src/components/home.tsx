
import { useState } from 'react'
import { GetGener, GetRandomMovie, GetTrailer, type Gener, type TrailerType } from '../services/apiServices';
import { type Movie } from '../services/apiServices';
import ShowMovie from './showMovie';
import Form from './form';
import { ClipLoader } from 'react-spinners';
import { NavLink } from 'react-router-dom';

export default function Home() {
    const [movie, setMovie] = useState<Movie>();
    const [currentGeners, setCurrentGeners] = useState<Gener[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [trailerInfo, setTrailerInfo] = useState<TrailerType | undefined>()

    const handleOnClick = () => {
        const fetchRandomMovie = async () => {

            setIsLoading(true)
            const fetchMovie: Movie | undefined = await GetRandomMovie();

            setMovie(fetchMovie);

            if (fetchMovie) {
                const genres = await GetGener(fetchMovie?.genre_ids)
                setCurrentGeners(genres?.filteredGenres);
                const trailerInfo = await GetTrailer(fetchMovie.id);
                setTrailerInfo(trailerInfo)
            }
            setIsLoading(false)
        }
        fetchRandomMovie();

    }

    const handleFromForm = async (movie: Movie) => {
        setMovie(movie)
        const geners = await GetGener(movie.genre_ids);
        setCurrentGeners(geners?.filteredGenres)

    }




    return <>
        <header>
            <h2>What to watch today?</h2>
            <p>Not sure what to watch? Out of movie ideas?</p>
            <p>Click the button, and I'll suggest a random movie!</p>
            <button id='button' onClick={handleOnClick}>Surprise me!</button>
            {
                isLoading && <ClipLoader color='black' size={30}></ClipLoader>
            }

        </header>

        <main>
            <section >
                {movie && <ShowMovie movie={movie} currentGeners={currentGeners}
                    trailerInfo={trailerInfo} />}
            </section >
            <aside>
                <div className="box">
                    <Form showMovie={handleFromForm} />
                </div>
            </aside>
        </main>
        <div className='favorite-button'>
            <NavLink id='button' to='/favorites'>my favorite movies</NavLink>
        </div>


    </>
}