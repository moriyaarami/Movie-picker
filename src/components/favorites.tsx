

import { useEffect, useState } from 'react';
import { GetMovieById, type FavoriteMovie } from '../services/apiServices';
import { getFromLocalStorage, saveToLocalStorage } from '../services/localStorageUtils'
import '../style/favorite.css'
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from 'react-router-dom';
import Card from './card';

export default function Favorite() {

    const [favoritesIds, setFavoritesIds] = useState(getFromLocalStorage<number[]>('favoriteList'));
    const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovie[]>([])

    useEffect(() => {

        const fetchMovies = async () => {
            if (!favoritesIds || favoritesIds.length === 0) {
                setFavoriteMovies([]);
                return;
            }
            const results = await Promise.all(
                favoritesIds?.map(async (favoriteId) => {
                    const data: FavoriteMovie | undefined = await GetMovieById(favoriteId);
                    return data;
                })
            );
            const movies: FavoriteMovie[] = results.filter((movie): movie is FavoriteMovie => movie !== undefined)
            setFavoriteMovies(movies)

        }
        fetchMovies()

    }, [favoritesIds])

    const handleFavorite = (id: number) => {
        const status = confirm('are you sure you want remove this movie from your favorite list movies ?')
        if (!status || !favoriteMovies) return;

        const newFavoriteList = favoritesIds!.filter((fav) => fav !== id)

        saveToLocalStorage('favoriteList', newFavoriteList)
        setFavoritesIds(newFavoriteList)

    }

    return <>
        <header className='header-favorite'>
            <h1>Your Favorites movies</h1>
            <NavLink to={'/'} title={'back to home page'} className='back-page' >
                <FontAwesomeIcon icon={faBackward} />
            </NavLink>
        </header>
        {favoriteMovies.length == 0 ? <div className='message'>You have not favorite movies yet, lets add one.</div> :
            <div className="cards-wrapper">
                <div className="cards-container">

                    {favoriteMovies.map((favoriteMovie) => {
                        return <Card movie={favoriteMovie} removeFavorite={handleFavorite} key={favoriteMovie.id}></Card>
                    })}

                </div>

            </div>
        }

    </>
}