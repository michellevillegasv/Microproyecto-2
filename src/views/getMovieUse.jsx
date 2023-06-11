import {useState} from "react";
import { fetchMovieNow } from "../utils/now-playing-api";
import { fetchMovieUpcoming } from "../utils/upcoming-api";

export function useMovies(){
    const[movies,setMovies]=useState("");
    const[movieUp,setMovieUp]=useState("");

    
    const getMoviesNow=async()=>{
        const{data}=await fetchMovieNow()
        setMovies(data.results)
    }

    const getMoviesUpcoming=async()=>{
        const{data}=await fetchMovieUpcoming()
        setMovieUp(data.results)
    }
    
    return{
        movies,getMoviesNow,
        movieUp,getMoviesUpcoming
    }
    
}