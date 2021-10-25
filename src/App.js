import React, { useEffect, useState } from "react";
import './App.css'
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando o Featured
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    };
    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () =>{
      if(window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, []);


  return (
    <div className="page">

      <Header black = {blackHeader}/>

      {featuredData && <FeaturedMovie item = {featuredData}/>}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key = {key} title = {item.title} items = {item.items}/>
        ))}
      </section>

      <footer>
        Desenvolvido por iuri0072<br/>
        Direitos de imagem para Netflix<br/>
        Dados adquiridos no site Themoviedb.org<br/><br/>
        <div>
          <a href="https://linkedin.com/in/iuri0072" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/></a>
           	
          <a href="https://github.com/iuri0072/" target="_blank"><img src="https://img.shields.io/badge/github-333?style=for-the-badge&logo=github&logoColor=white" target="_blank"/></a>
            	
          <a href="https://codepen.io/iuri0072" target="_blank"><img src="https://img.shields.io/badge/CodePen-000000?style=for-the-badge&logo=codepen&logoColor=white" target="_blank"/></a>
        </div>
      </footer>

      {movieList.length <=0 &&

      <div className = "loading">
        <img src = "https://www.rchandru.com/images/portfolio/loading.gif" />

      </div>
      }

    </div>
  );
};
