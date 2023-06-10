import {useState,useEffect} from "react";
import Hero from "../components/Hero";
import { fetchMovieNow } from "../utils/now-playing-api";

export default function HomePage() {
  const[moviesNow, setMoviesNow]=useState("")

  const getMoviesNow=async()=>{
    const response=await fetchMovieNow();
    
    console.log(response);
  }
  useEffect(()=>{
    getMoviesNow();
  },[]);

  return (
    <div>
      <Hero />
    </div>
  );
}
