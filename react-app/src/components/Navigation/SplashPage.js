import { useState } from 'react';
import LoginForm from '../Auth/LoginForm';
import SignUpForm from '../Auth/SignUpForm';
import './SplashPage.css'



const SplashPage = () => {
    const [showLogin, setShowLogin] = useState(true)
    return (
        <>
            <div id="splash-container">
                <div>
                    {showLogin ?
                        <LoginForm showSignUp={() => setShowLogin(false)} />
                        :
                        <SignUpForm showLogin={() => setShowLogin(true)} />
                    }
                </div>
                <div>

                </div>
            </div>
        </>
    )


}


export default SplashPage;
