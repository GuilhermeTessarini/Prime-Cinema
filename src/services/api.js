import axios from 'axios'

//https://api.themoviedb.org/3/movie/now_playing?api_key=3236b12665df6cf56dc569a0f7802f83&language=pt-BR

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
});

export default api;