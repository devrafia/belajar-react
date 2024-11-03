/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

export default function App() {
  const [animes, setAnimes] = useState([]);
  const [allAnimes, setAllAnimes] = useState([]);
  const [page, setPage] = useState(1);

  async function getAnimes(page) {
    const res = await fetch(`https://api.jikan.moe/v4/anime?page=${page}`);
    const json = await res.json();
    const result = json.data.map((res) => {
      return {
        mal_id: res.mal_id,
        title: res.title,
        year: res.year,
        image: res.images.jpg.image_url,
        score: res.score,
        synopsis: res.synopsis,
      };
    });
    setAnimes(result);
    setAllAnimes(result);
  }

  useEffect(() => {
    getAnimes(page);
  }, [page]);

  function handleClickPage(condition) {
    if (condition == "prev" && page == 1) {
      return;
    } else if (condition == "next" && page == 1000) {
      return;
    }
    setPage(condition == "next" ? page + 1 : page - 1);
  }

  return (
    <>
      <NavBar>
        <Search allAnimes={allAnimes} setAnimes={setAnimes}>
          <NumResult animes={animes} />
        </Search>
      </NavBar>
      <Main animes={animes} />
      <Page onClickPage={handleClickPage}>
        <ButtonPage
          text={"Prev Page"}
          onClickPage={() => handleClickPage("prev")}
        />
        <ButtonPage
          text={"Next Page"}
          onClickPage={() => handleClickPage("next")}
        />
      </Page>
    </>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Header />
      {children}
    </nav>
  );
}

function Header() {
  return (
    <div className="logo">
      <span role="img">🍥</span>
      <h1>WeeBoo</h1>
      <span role="img">🍥</span>
    </div>
  );
}

function Search({ children, allAnimes, setAnimes }) {
  function handleChange(value) {
    const newAnimes = allAnimes.filter((anime) =>
      anime.title.toLowerCase().includes(value.toLowerCase())
    );
    setAnimes(newAnimes);
  }

  return (
    <div className="search-container">
      <input
        className="search"
        type="text"
        placeholder="Search anime..."
        onChange={(e) => handleChange(e.target.value)}
      />
      {children}
    </div>
  );
}

function NumResult({ animes }) {
  return (
    <p className="search-results">
      Found <strong>{animes.length}</strong> results
    </p>
  );
}

function Main({ animes }) {
  const [selectedAnime, setSelectedAnime] = useState(null);

  useEffect(() => {
    if (animes.length > 0) {
      setSelectedAnime(animes[0]);
    }
  }, [animes]);

  return (
    <main className="main">
      <ListBox animes={animes} setSelectedAnime={setSelectedAnime} />
      <DetailBox selectedAnime={selectedAnime} />
    </main>
  );
}

function ListBox({ animes, setSelectedAnime }) {
  const [isOpen1, setIsOpen1] = useState(true);

  function handleSelectedAnime(id) {
    const newAnime = animes.filter((anime) => anime.mal_id === id);
    setSelectedAnime(newAnime[0]);
  }

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && (
        <AnimeList animes={animes} onSelectedAnimes={handleSelectedAnime} />
      )}
    </div>
  );
}

function AnimeList({ animes, onSelectedAnimes }) {
  return (
    <ul className="list list-anime">
      {animes?.map((anime) => (
        <Anime
          key={anime.mal_id}
          anime={anime}
          onSelectedAnimes={onSelectedAnimes}
        />
      ))}
    </ul>
  );
}

function Anime({ anime, onSelectedAnimes }) {
  return (
    <li onClick={() => onSelectedAnimes(anime.mal_id)}>
      <img src={anime.image} alt={`${anime.title} cover`} />
      <h3>{anime.title}</h3>
      <div>
        <p>
          <span>{anime.year}</span>
        </p>
      </div>
    </li>
  );
}

function DetailBox({ selectedAnime }) {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && <AnimeDetail selectedAnime={selectedAnime} />}
    </div>
  );
}

function AnimeDetail({ selectedAnime }) {
  if (!selectedAnime) return;
  return (
    <div className="details">
      <header>
        <img src={selectedAnime.image} alt={`${selectedAnime.title} cover`} />
        <div className="details-overview">
          <h2>{selectedAnime.title}</h2>
          <p>
            {selectedAnime.year} &bull; {selectedAnime.score}
          </p>
        </div>
      </header>
      <section>
        <p>
          <em>{selectedAnime.synopsis}</em>
        </p>
      </section>
    </div>
  );
}

function Page({ children }) {
  return <div className="page">{children}</div>;
}

function ButtonPage({ text, onClickPage }) {
  return (
    <button className="outpulser" onClick={onClickPage}>
      <span> {text} </span>
    </button>
  );
}
