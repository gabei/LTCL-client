import './BookData.css'
import { type ApiResponse } from "../types/types"
import { ErrorBoundary } from 'react-error-boundary';

export default function BookData(data:ApiResponse) {

  function listItem(heading:string = "",data: string){
    return (
      <li>
        <strong>{heading}:</strong> {data}
      </li>
    )
  }

  const errorFallback = <p>Something went wrong. Double check the supplied lookup code and try again.</p>

  function LenderList(data:ApiResponse){
    return (
      <ul className="lender-list">
        {data.lenderData.map((item:string) => <li>{item}</li>)}
      </ul>
    )
  }

  
  return (
    
      <div className="BookData">
        <span className="warning">Double-check this information before making an ILL request!</span>
        <ul className="BookData__list">
          {listItem("Title", data.title)}
          {listItem("Author", data.author)}
          {listItem("Publisher", data.publisher)}
          {listItem("ISBN", data.isbn)}
          {listItem("OCLC", data.oclc)}
        </ul>
        <h2>Lender Codes</h2>
        <ErrorBoundary fallback={errorFallback}>
          <LenderList data={data}/>
        </ErrorBoundary>
      </div>
  )
 
}