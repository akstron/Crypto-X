import { useState } from 'react';
import './OtpBox.css'

const OtpBox = ({name,emailId}) => {
    const [otp,setOtp]=useState(new Array(6).fill(""))

    const handleChange = (element, index) => {

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling && element.value!=='') {
            element.nextSibling.focus();
            // element.prevSibling.focus();
        }
    };

    return (
        <div className='otp-box'>
            <h2>Hi {name} !</h2>
            <div className="row">
                <div className="col text-center">
                    <h2>Welcome to the Baniya Trade!!!</h2>
                    <p>Enter the OTP sent to your {emailId} to verify your identity</p>

                    {otp.map((data, index) => {
                        return (
                            <input
                                className="otp-field"
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                            />
                        );
                    })}

                    <p>OTP Entered - {otp.join("")}</p>
                    <p>
                        <button
                            className="btn btn-secondary mr-2"
                            onClick={e => setOtp([...otp.map(v => "")])}
                        >
                            Clear
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={e =>
                                alert("Entered OTP is " + otp.join(""))
                            }
                        >
                            Verify OTP
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default OtpBox;