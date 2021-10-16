import { FloatingLabel, Form ,Button} from 'react-bootstrap';
import './ProfilePage.css'
//TODO:
const profilePic='https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';
// const Message="Profile Page";

const ProfilePage = ({uName,emailId}) => {
    const changeProfileImage=()=>{}
    const UpdateProfileHandler=()=>{}
    return (
        <div className='profile-container'>
            <h2 className='form'>User Profile</h2>
            <Form className="profile-form form">  
                {/* <p>{Message}</p> */}
                <img className='profile-img' src={profilePic} alt="profils pic" height='215px'/>
                <Form.Group controlId="formCategory4">
                    <FloatingLabel>Profile Image</FloatingLabel>
                    <Form.Control type="file" name="profileImage" onChange={changeProfileImage}/>
                </Form.Group>
                {/* <p>{Message}</p> */}
                <Form.Group controlId="formCategory1">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" defaultValue={uName} readOnly/>
                </Form.Group>
                <Form.Group controlId="formCategory2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" defaultValue={emailId} readOnly/>
                </Form.Group>
                <Form.Group controlId="formCategory3">
                    <Form.Label>Phone : </Form.Label>
                    <Form.Control type="phone" defaultValue={"+91-9424161813"}/>
                </Form.Group>

                <Button variant="primary" onClick={UpdateProfileHandler}>Update Profile</Button>
            </Form>
        </div>
    )
}

export default ProfilePage