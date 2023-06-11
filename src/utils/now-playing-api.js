import axios from "axios";

const URL="https://api.themoviedb.org/3/movie/now_playing?api_key=ade26c6c913e41cd213c246a4e12b1e2"
const options={
    method:"GET",
    headers:{
        accept: "aplication/json",
        Authorization: 'Bearer ade26c6c913e41cd213c246a4e12b1e2'
    }
};



export async function fetchMovieNow(){
    return axios.get(URL,options)
}