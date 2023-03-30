import { useState } from 'react';
import LoginForm from '../Auth/LoginForm';
import SignUpForm from '../Auth/SignUpForm';


const SplashPage = () => {
    const [showLogin, setShowLogin] = useState(true)
    return (
        <>
        <h1>Splash Page</h1>
        {showLogin ?
            <LoginForm showSignUp={()=>setShowLogin(false)} />
            :
            <SignUpForm showLogin={()=>setShowLogin(true)}/>
        }
        </>
    )


}


export default SplashPage;
