import { useState } from 'react'
import './App.css'

function App() {
  const [isbn, setIsbn] = useState("");
  const [data, setData] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e:Event): => {
    e.target.value ? setIsbn(e.target.value) : null

  }

  const handlesubmit = async (e:Event) => {
    console.log(isbn);
    setMessage(`Searching for lender codes for ${isbn}...`);
    const newData = await fetchData(isbn);
    setData(newData);
  }

  const fetchData: = async(query:string): => {
    const url = "https://localhost/search";
    const response = await fetch(url + query);
    return response.json();
  }

return (
    <div>
      <main>
        <input value={isbn}  onChange={handleChange} placeholder="Enter ISBN"></input>
        <button onClick={handlesubmit}>Search</button>
        <div>{data ? data : message}</div>
      </main>
    </div>
  )
}

export default App
