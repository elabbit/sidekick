import { useState } from 'react';
import LoginForm from '../Auth/LoginForm';
import SignUpForm from '../Auth/SignUpForm';
import './SplashPage.css'
import logo from '../../images/sidekick-logo.png'


const SplashPage = () => {
    const [showLogin, setShowLogin] = useState(true)
    return (
        <>
            <div id="splash-container">
                <img src={logo} id='splash-logo' alt='Sidekick logo' />
                <div id="splash-form-container">
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
