import { useEffect, useRef, useState, type FormEvent } from "react"
import { filterSearch, GetGener, type Gener, type Movie } from "../services/apiServices"
import { ClipLoader } from "react-spinners";

type FormProps = {
    showMovie: (movie: Movie) => void
}
export default function Form({ showMovie }: FormProps) {
    const numberForShowYear = Math.floor(new Date().getFullYear() - (25 / 2));
    const [ShowYear, setShowYear] = useState<string>(numberForShowYear.toString());
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const gener = useRef<HTMLSelectElement>(null);
    const year = useRef<HTMLInputElement>(null);
    const rating = useRef<HTMLInputElement>(null);

    const [geners, setGeners] = useState<Gener[]>();
    useEffect(() => {
        const fetchGeners = async () => {
            try {
                const geners = await GetGener();
                setGeners(geners?.genres)
            } catch (err) {
                console.log(err)
            }
        }
        fetchGeners();
    }, [])
    const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        const currentGener = gener.current!.value;
        const currentYear = year.current!.value;
        const currentRating = rating.current!.value;

        const movie: Movie = await filterSearch({ currentGener: currentGener, currentYear: currentYear, currentRating: currentRating })
        if (movie == undefined) {
            setMessage(`We couldn't find anything random for you to watch. Let's try again!`);
            setTimeout(() => setMessage(''), 5000)
        }
        showMovie(movie)
        setIsLoading(false)


    }
    return <>
        <h2>Filter Options:</h2>
        <form action="submit" onSubmit={handlesubmit}>

            <div>
                <p>Genres:</p>
                <span>
                    <select name="geners" id="geners" ref={gener}>
                        {
                            geners?.map((gener, index) => {
                                return <option key={index} value={gener.id}>{gener.name}</option>
                            })
                        }
                    </select>
                </span>
            </div>
            <div>
                <p>Year:</p>
                <span className="showYear">{ShowYear}</span>
                <span>
                    <input type="range"
                        name="year-slider"
                        id="year-slider"
                        min={2000}
                        max={new Date().getFullYear()}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShowYear(e.target.value)}
                        ref={year}

                    />
                </span>
            </div>
            <div>
                <p>Minimum Rating:</p>
                <span><input type="number" min={0} max={10} ref={rating} /></span>
            </div>

            <button id='button'>Surprise me!</button>
            {message && <div className="error-section">
                <p>{message}</p>
            </div>}

        </form>
        {
            isLoading && <ClipLoader className="clipLoader" color='black' size={30}></ClipLoader>
        }


    </>
}