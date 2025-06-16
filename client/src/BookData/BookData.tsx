import './BookData.css'
import { type ApiResponse } from "../types/types"

export default function BookData(data:ApiResponse) {

  function handleCopy(data: string):void {
      navigator.clipboard.writeText(data);
  }
      

  function listItem(listHeading:string = "",data: string){
    return (
      <li>
        <strong>{listHeading}:</strong> {data}
      </li>
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
      <ul className="lender-list">
        {data.lenderData.map((item:string) => <li>{item}</li>)}
      </ul>
    </div>
  )
}