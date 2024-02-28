import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './home.css';

function Home() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "3236b12665df6cf56dc569a0f7802f83",
                    language: "pt-BR",
                    page: 1,
                }
            });

            setMovies(response.data.results.slice(0, 10));
            setLoading(false);
        }

        loadFilmes();
    }, [])


    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando filmes....</h2>
            </div>
        )
    }
    return (
        <div className='container'>
            <div className='movie-list'>
                {movies.map((movie) => {
                    return (
                        <article key={movie.id}>
                            <strong>{movie.title}</strong>
                            <img src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                            <Link to={`/movie/${movie.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;