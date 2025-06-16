import './LoadingMessage.css';
import loadingIcon from '../assets/loading.svg';

export default function LoadingMessage(message:string){
    return (
      <div>
        <p>{message}</p>
        <img className="loading-icon" src={loadingIcon}></img>
      </div>
    )
  }

