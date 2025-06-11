import { useState } from 'react'
import './App.css'

function App() {
  const [isbn, setIsbn] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e:Event) => {
    e.target.value ? setIsbn(e.target.value) : null

  }

  const handlesubmit = async (e:Event) => {
    console.log(isbn);
    setMessage(`Searching for lender codes for ${isbn}...`);
    const newData = await fetchData(isbn);
    setData(newData);
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
      <header></header>
      <main>
        <div className="search-box">
          <input value={isbn} onChange={handleChange} placeholder="Enter ISBN"></input>
          <button onClick={handlesubmit}>Search</button>
        </div>
        <div>{data ? renderData() : loadingMessage}</div>
      </main>
    </div>
  )
}

export default App
