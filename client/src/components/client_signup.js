import React, { useState, useEffect } from 'react';
import validator from 'validator';
import { useNavigate,Button } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import getWeb3 from '../web3';

export default function Client_signup() {
    const navigate = useNavigate();

    const [Email, setEmail] = useState('');
    const [Password, setpass] = useState('');
    const [Firstname, setfirstname] = useState('');
    const [Secondname, setsecondname] = useState('');
    const [UserName, setUserName] = useState('');

    const [cookies, setCookie] = useCookies(['user']);


    // Validation
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(false);

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!.*\s)[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [connected, setConnected] = useState(false);

    const connectMetaMask = async () => {
        try {
            // Request MetaMask account access
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
            setConnected(true)
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    };


    useEffect(() => {
        const initialize = async () => {
            try {
                const web3Instance = await getWeb3();
                setWeb3(web3Instance);

                // Get account info
                const accounts = await web3Instance.eth.getAccounts();
                setAccount(accounts[0]);
            } catch (error) {
                console.error('Error initializing web3:', error);
            }
        };

        initialize();
    }, []);


    const signup = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/signup', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                Email,
                Password,
                Firstname,
                Secondname,
                UserName,
                Account:account

            }),
        });

        const data = await res.json();
        console.log(res.status);
        console.log(data);
        if ( res.status==200) {
           console.log("TEsting")
            const authToken = res.headers.get('auth-token');
            
            console.log(authToken);
           await setCookie("jwtoken", authToken, { path: '/' });
             
            window.alert('Registration successful');
            navigate('/dash');

          } else {
            alert('Login failed:', res.statusText);
          }

        if (res.status === 422) {
            alert(`${data.error}`);

        } else {
            console.error('Unexpected error during registration. Please try again');
        }
    };
    const loginpage = () => {
        navigate('./login');
    }

    return (
        <>
            <header className='header'>
                <div>
                    Health APP
                </div>
                <div className='header_buttons'>
                    <div><button onClick={loginpage}>Login</button></div>
                    <div>  {!account && <button onClick={connectMetaMask}>Connect MetaMask</button>}
                    </div>
                </div>
            </header>
            <main>
                <div class="Signupbox">
                    <div class="Signuppage">
                        <h2 class="Loginheading">Registraion Page </h2>
                    </div>
                    <div>
                        <form onSubmit={signup} method="Post">
                            <div class="Names">
                                <label class="Sportsfirstname" for="firstname">
                                    First Name:
                                </label>
                                <div>
                                    <input
                                        type="text"
                                        class="usertextboxsize"
                                        id="firstname"
                                        name="firstname"
                                        onChange={(e) => {
                                            setfirstname(e.target.value);
                                        }}
                                        required
                                    />
                                    {Firstname && <span style={{ color: 'green' }}>&#x2714;</span>}
                                    <br />
                                </div>
                            </div>
                            <div class="Names">
                                <label for="lastname">Last Name:</label>
                                <div>
                                    <input
                                        type="text"
                                        class="usertextboxsize"
                                        id="lastname"
                                        name="lastname"
                                        onChange={(e) => {
                                            setsecondname(e.target.value);
                                        }}
                                        required
                                    />
                                    {Secondname && <span style={{ color: 'green' }}>&#x2714;</span>}
                                    <br />
                                </div>
                            </div>
                            <div class="Names">
                                <label for="username">Username:</label>
                                <div>
                                    <input
                                        type="text"
                                        class="usertextboxsize"
                                        id="username"
                                        name="username"
                                        onChange={(e) => {
                                            setUserName(e.target.value);
                                        }}
                                        required
                                    />
                                    {UserName && <span style={{ color: 'green' }}>&#x2714;</span>}
                                    <br />
                                </div>
                            </div>
                            <div class="Names">
                                {!isValidPassword && Password.length > 0 && (
                                    <span style={{ color: 'red' }}>
                                        Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                                    </span>
                                )}
                                <label for="pass">Password:</label>
                                <div>
                                    <input
                                        type="password"
                                        value={Password}
                                        class="pwdtextboxsize"
                                        id="pass"
                                        name="pwd"
                                        onChange={(e) => {
                                            setpass(e.target.value);
                                            setIsValidPassword(validatePassword(e.target.value));
                                        }}
                                        required
                                    />
                                    {isValidPassword && Password.length > 0 && (
                                        <span style={{ color: 'green' }}>&#x2714;</span>
                                    )}                                    <br />
                                </div>
                            </div>
                            <div class="Names">
                                {!isValidEmail && Email.length > 0 && (
                                    <span style={{ color: 'red' }}>Please enter a valid email address.</span>
                                )}
                                <label for="email">Email:</label>
                                <div>
                                    <input
                                        type="email"
                                        value={Email}
                                        class="mailtextboxsize"
                                        id="email"
                                        name="email"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setIsValidEmail(validator.isEmail(Email));
                                        }}
                                        required
                                    />
                                    {isValidEmail && Email.length > 0 && (
                                        <span style={{ color: 'green' }}>&#x2714;</span>
                                    )}
                                    <br />
                                    <br />
                                </div>
                            </div>

                            <div class="Submitbtn">
                                <button type="submit">SignUp</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}
