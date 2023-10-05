import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="flex flex-col md:px-12 px-0 relative bg-background font-poppins items-center min-h-screen">
      <h1 className="text-6xl font-bold text-primary mt-10">
        <span className="text-active">Lyrics</span> App
      </h1>
      <h2 className="text-primary text-2xl font-light mt-6">
        Get the complete lyrics of any given track.
      </h2>

      <form className="sm:mx-auto mt-20 justify-center sm:w-full sm:flex">
        <input type="text"
          className="flex w-full sm:w-1/3 rounded-lg px-5 py-3 text-base text-background font-semibold focus:outline-none focus:ring-2 focus:ring-active"
          placeholder="Enter a track or artist name eg: Alan Walker"
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
    </div>
  );
}
