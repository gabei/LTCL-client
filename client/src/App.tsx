import { useState } from 'react'
import './App.css'
import loadingMessage from './loadingMessage/loadingMessage';

function App() {
  const [isbn, setIsbn] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [searching, setSearching] = useState(false);

  const handleChange = (e:Event) => {
    setIsbn(e.target.value);
  }

  const handlesubmit = async (e:Event) => {
    setSearching(true);
    setMessage(`Searching for lender codes for ${isbn}...`);

    const newData = await fetchData(isbn);
    setData(newData);
    setSearching(false);
  }

  const fetchData = async(query:string) => {
    const url = "http://localhost:8000/search?code=";
    const response = await fetch(url + query);
    return response.json();
  }

  const renderData = () => {
    return (
      <ul>
        {data.map((item) => <li>{item}</li>)}
      </ul>
    )
  }

return (
    <div>
      <header className="header">
        <div className={"header-texture " + (searching ? "animate-texture" : "")}></div>
      </header>
      <main>
        <div className="search-box">
          <input value={isbn} onChange={handleChange} placeholder="Enter ISBN"></input>
          <button onClick={handlesubmit}>Search</button>
        </div>
        <div className="data-display">
            {searching ? loadingMessage(message) : renderData()}
        </div>
      </main>
    </div>
  )
}

export default App
