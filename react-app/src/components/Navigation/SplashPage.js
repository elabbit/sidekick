import { useState } from 'react';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';


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
