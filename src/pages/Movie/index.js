import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

import api from '../../services/api';

import './movie.css'

function Movie() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovie() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "3236b12665df6cf56dc569a0f7802f83",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setMovies(response.data);
                    //console.log(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    navigate("/", { replace: true });
                    return;
                });
        }

        loadMovie();
    }, [navigate, id])

    function saveMovie() {

        const myList = localStorage.getItem('@primecinema');

        let savedMovies = JSON.parse(myList) || [];

        const hasMovie = savedMovies.some((savedMovie) => savedMovie.id === movies.id);

        if (hasMovie) {
            toast.warn("Esse filme já está na sua lista!")
            return;
        }

        savedMovies.push(movies);
        localStorage.setItem('@primecinema', JSON.stringify(savedMovies));
        toast.success("Filme salvo com sucesso!")
    }

    if (loading) {
        return (
            <div className="movie-info">
                <h2>Carregando detalhes....</h2>
            </div>
        )
    }

    return (
        <div className="movie-info">
            <h1>{movies.title}</h1>
            <img src={`http://image.tmdb.org/t/p/original/${movies.backdrop_path}`} alt={movies.title} />

            <h3>Sinopse</h3>
            <span>{movies.overview}</span>

            <strong>Avaliação: {movies.vote_average} /10</strong>

            <div className='area-buttons'>
                <button onClick={saveMovie}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${movies.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}

export default Movie;