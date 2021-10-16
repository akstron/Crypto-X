import './OAuthPopup.css'
// Follow :
// https://www.cluemediator.com/create-simple-popup-in-reactjs
const OAuthPopup = (props) => {
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                {props.content}
            </div>
        </div>
  );
}

export default OAuthPopup;