import './loadingMessage.css';
import loadingIcon from '../assets/loading.svg';

export default function loadingMessage(message:string){
    return (
      <div>
        <p>{message}</p>
        <img className="loading-icon" src={loadingIcon}></img>
      </div>
    )
  }

