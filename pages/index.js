import { useState } from "react";
import axios from "axios";
import cheerio from "cheerio";

export default function Home() {

  const [title, setTitle] = useState('Alan Walker');
  const [searchResults, setSearchResults] = useState(null);
  const [lyrics, setLyrics] = useState(null);


  const getResults = async () => {
    try {
      const res = await axios.get('api/search/', {
        params: { title }
      });
      console.log(res);
      setSearchResults(res.data.hits);
    } catch (error) {
      console.log(`here is error`);
      console.log(error);
    }
    console.log(`exiting getResults`)
  };

  async function lyricScraper(lyricsUrl) {
    try {
      setSearchResults(null);
      const response = await axios.get('http://localhost:8080/getLyrics', {
        params: { url: lyricsUrl }
      });
      if (response.status === 200) {
        console.log(response);
        const $ = cheerio.load(response.data);
        const lyricsContainer = $('[data-lyrics-container="true"]').text();
        console.log(lyricsContainer);
        setLyrics(lyricsContainer);
      }
    }
    catch (error) {
      console.log(`bruh we fucked up`)
      console.error('Error:', error);
    }
  }

  return (
    <div className="flex flex-col md:px-12 px-0 relative bg-background font-poppins items-center min-h-screen">
      <h1 className="text-6xl font-bold text-primary mt-10">
        <span className="text-active">Lyrics</span> App
      </h1>
      <h2 className="text-primary text-2xl font-light mt-6">
        Get the complete lyrics of any given track.
      </h2>

      <form className="sm:mx-auto mt-20 justify-center sm:w-full sm:flex"
        onSubmit={e => {
          getResults();
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <input type="text"
          className="flex w-full sm:w-1/3 rounded-lg px-5 py-3 text-base text-background font-semibold focus:outline-none focus:ring-2 focus:ring-active"
          placeholder="Enter a track or artist name eg: Alan Walker"
          onChange={e => {
            setTitle(e.target.value);
            setSearchResults(null);
            setLyrics(null);
          }}
        />

        <div className="mt-4 sm:mt-0 sm:ml-3">
          <button
            className="block w-full rounded-lg px-5 py-3 bg-active text-base text-primary font-bold hover:text-active hover:bg-primary sm:px-10"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>

      {searchResults && (
        <div className="mt-10">
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.map(song => {
              // This will log the song object
              return (
                <div key={song.result.id} className="pt-6">
                  <div className="flow-root bg-light rounded-lg px-4 pb-8">
                    <div className="-mt-6">
                      <div className="flex items-center justify-center">
                        <span className="p-2">
                          <img src={song.result.song_art_image_thumbnail_url}
                            className="w-full h-full rounded-lg"
                            alt={song.result.song_art_image_thumbnail_url}
                          />
                        </span>
                      </div>
                      <div className="text-center justify-center items-center">
                        <h3 className="mt-4 text-lg font-bold w-full break-words overflow-x-auto text-primary tracking-tight">
                          {song.result.title}
                        </h3>
                        <span className="mt-2 text-sm text-secondary block">
                          {song.result.artist_names}
                        </span>
                        <button className="mt-5 text-md text-active"
                          onClick={() => {
                            console.log(song.result.url);
                            lyricScraper(song.result.url);
                            console.log(lyrics)
                          }}
                        >
                          Get Lyrics
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {lyrics && (
        <div className="mt-10 max-w-2xl">
          <h2 className="text-2xl font-bold text-center text-active">
            Lyrics for niggas
          </h2>
          <p className="mt-6 leading-loose text-primary text-xl">
            {lyrics}
          </p>
        </div>
      )}
    </div>
  );
}
