import { useState } from 'react'
import './App.css'
import LoadingMessage from './LoadingMessage/LoadingMessage';
import BookData from './BookData/BookData';
import { type ApiResponse } from './types/types';
import { ErrorBoundary } from 'react-error-boundary';
import dotenv from 'dotenv';


function App() {
  const [isbn, setIsbn] = useState("");
  const [message, setMessage] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchIsComplete, setSearchIsComplete] = useState(false);
  const [data, setData] = useState<ApiResponse>(
    {
      title: "",
      author: "",
      publisher: "",
      isbn: "",
      oclc: "",
      lenderData: []
    }
  );

  const handleChange = (e:Event) => {
    setIsbn(e.target.value);
  }

  const handlesubmit = async (e:Event) => {
    setSearchIsComplete(false);
    setSearching(true);
    setMessage(`Searching for lender codes for ${isbn}. Do not navigate away from this page... `);

    const newData = await fetchData(isbn);
    console.log(newData);
    setData(newData);
    setSearching(false);
    setSearchIsComplete(true);
  }

  const fetchData = async(query:string) => {
    const url = import.meta.env.VITE_QUERYENDPOINT;
    const response = await fetch(url + query);
    return response.json();
  }

  const errorFallback = <p>Something went wrong. Double check the supplied lookup code and try again.</p>

  

return (
    <div>
      <header className="header">
        <div className={"header-texture " + (searching ? "animate-texture" : "")}></div>
      </header>
      <main>
        <div className="search-box">
          <input value={isbn} onChange={handleChange} placeholder="Enter ISBN or OCLC number"></input>
          <button onClick={handlesubmit}>Search</button>
        </div>
        <div className="data-display">
            {searching && LoadingMessage(message)}
            {searchIsComplete && 
              <ErrorBoundary fallback={errorFallback}>
                <BookData data={data} />
              </ErrorBoundary>
            }
        </div>
      </main>
    </div>
  )
}

export default App
