import { useState } from 'react'
import './App.css'
import loadingMessage from './loadingMessage/loadingMessage';

type ApiResponse = {
  title: string,
  author: string,
  publisher: string,
  isbn: string,
  oclc: string,
  lenderData: Array<string>
}

function App() {
  const [isbn, setIsbn] = useState("");
  const [message, setMessage] = useState("");
  const [searching, setSearching] = useState(false);
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
    setSearching(true);
    setMessage(`Searching for lender codes for ${isbn}...`);

    const newData = await fetchData(isbn);
    setData(newData);
    setSearching(false);
    console.log(newData);
  }

  const fetchData = async(query:string) => {
    const url = "http://localhost:8000/search?code=";
    const response = await fetch(url + query);
    return response.json();
  }

  /* new component */
  const renderData = () => {
    return (
      <div className="book-data">
        <ul className="book-data__list">
          <li><strong>Title:</strong> {data.title}</li>
          <li><strong>Author:</strong> {data.author}</li>
          <li><strong>Publisher:</strong> {data.publisher}</li>
          <li><strong>ISBN:</strong> {data.isbn}</li>
          <li><strong>OCLC:</strong> {data.oclc}</li>
        </ul>
        <h2>Lender Codes</h2>
        <ul className="lender-list">
        {data.lenderData.map((item:string) => <li>{item}</li>)}
        </ul>
      </div>
    )
  }

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
            {searching ? loadingMessage(message) : renderData()}
        </div>
      </main>
    </div>
  )
}

export default App
