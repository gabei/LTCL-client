import { useState } from 'react'
import loadingIcon from './assets/loading.svg';
import './App.css'

function App() {
  const [isbn, setIsbn] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [searching, setSearching] = useState(false);

  const handleChange = (e:Event) => {
    setIsbn(e.target.value);
  }

  const handlesubmit = async (e:Event) => {
    console.log(isbn);
    setSearching(true);
    setMessage(`Searching for lender codes for ${isbn}...`);
    const newData = await fetchData(isbn);
    setData(newData);
    setSearching(false);
  }

  const fetchData = async(query:string) => {
    const url = "http://localhost:8000/search?code=";
    const response = await fetch(url + query);
    console.log(response);
    return response.json();
  }

  const renderData = () => {
    return (
      <ul>
        {data.map((item) => <li>{item}</li>)}
      </ul>
    )
  }

  const loadingMessage = <p>{message}</p>

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
          <div>{searching ? loadingMessage : renderData()}</div>
          <img className="loading-icon" src={loadingIcon}></img>
          </div>
      </main>
    </div>
  )
}

export default App
