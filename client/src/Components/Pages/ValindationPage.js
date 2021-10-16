import { useLocation, useParams } from "react-router";
import {Redirect} from 'react-router-dom'
import OtpBox from "../OTPBox/OtpBox";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const ValindationPage = ({match}) => {
    const {emailId}=useParams();
    const isValidEmail=validateEmail(emailId);
    const userInfo = new URLSearchParams(useLocation().search);
    return (
        (isValidEmail?(
            <div className="container otp-div">
                <OtpBox emailId={emailId} name={userInfo.get("name")}/>
            </div>
        ):(
            <div>
                {/* Redirect to 404 */}
                <Redirect to="/signup"/>
            </div>
        ))

    )
}

export default ValindationPage;