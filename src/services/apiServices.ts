

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const HEADER_KEY = import.meta.env.VITE_HEADER_API_KEY;


export type Movie = {
    id: number,
    poster_path: string
    title: string;
    overview: string;
    vote_average: number;
    genre_ids: number[];
    release_date: string;
}

export type FavoriteMovie = {
    id: number,
    poster_path: string
    title: string;
    overview: string;
    vote_average: number;
    genres: { id: number, name: string }[];
    release_date: string;
}

export type TrailerType = {
    id: string,
    key: string,
    site: string
}

export async function GetTrailer(id: number) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
        const data = await response.json();
        const results = data.results;
        const trailerInfo = results.find((info: any) => info.type === 'Trailer'
        )
        console.log(trailerInfo)

        return trailerInfo;
    } catch (err) {
        console.log(err)
    }


}

export async function GetRandomMovie() {
    const randomPage: number = Math.floor(Math.random() * 300) + 1

    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${randomPage}$video==true`

    try {
        const response = await fetch(url);
        const data = await response.json();

        const movies = data.results;

        const randomIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomIndex];

        return randomMovie;

    } catch (err) {
        console.log(err)

    }
}
export type Gener = {
    id: number,
    name: string
}

export type GenersResults = {
    filteredGenres: Gener[] | undefined,
    genres: Gener[]
}
export async function GetGener(ids: number[] | Gener[] = []): Promise<GenersResults | undefined> {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: HEADER_KEY
        }
    };

    try {
        const resopnse = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        const data = await resopnse.json();

        let genres: Gener[] = data.genres;

        const filteredGenres: Gener[] = ids.map((id) => {

            return genres.find((genre: any) => {
                return genre.id === id
            }
            )
        }).filter((genre): genre is Gener => genre !== undefined);


        return {
            filteredGenres,
            genres
        }

    } catch (err) {
        console.log(err)
    }
}

type FilterSearchProps = {
    currentGener: string,
    currentYear: string,
    currentRating: string
}
export async function filterSearch({ currentGener, currentYear, currentRating }: FilterSearchProps) {
    const randomPage = Math.floor(Math.random() * 5) + 1
    const url = `${BASE_URL}/discover/movie?language=en-US&page=${randomPage}&primary_release_year=${currentYear}&vote_average.gte=${currentRating}&with_genres=${currentGener}`

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: HEADER_KEY
        }
    }

    try {
        const response = await fetch(url, options)
        const data = await response.json();
        const movies = data.results;

        const randomIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomIndex]
        return randomMovie;
    } catch (err) {
        console.log(err)
    }
}



export async function GetMovieById(id: number) {

    const url = `${BASE_URL}/movie/${id}?language=en-US`

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: HEADER_KEY
        }
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        return data;
    } catch (err) {
        console.log(err)
    }
}