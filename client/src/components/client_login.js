import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { Button } from 'react-bootstrap';
import '../css/Client_dashboard.css';

export default function Client_login() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setpass] = useState("");



    // Validation
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(false);


    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!.*\s)[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };
    const login_user=async(e)=>{
        e.preventDefault();
        // alert("Login succesful")
        // navigate('./dash')
        try {
            const res = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            crossDomain: true,
            headers: {
                "content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                Email,
                Password,

            }),

        });
        const data = await res.json();
        
     
       
        if (res.status === 200|| res.status=="ok") {
            window.alert("Login successfull");
            navigate('/dash')

        } else {
            window.alert("No Such user Found");

        }
            
        } catch (error) {
            console.log(error)
            
          }
    }

    const signupPage=()=>{
        navigate('/');
        
    }
  return (
    <>
      <header className='header'>
               <div>
                 HEALTH APP
               </div>
               <div className='header_buttons'>
                    <div><button onClick={signupPage}>Create Account</button></div>
                </div>
      </header>

      <main>
                <div class="Loginbox">
                    <div class="Loginpage">
                        <h2 class="Loginheading">Login Page</h2>
                    </div>
                    <div>
                        <form  onSubmit={login_user} >
                            <div class="Names">
                                {!isValidEmail && Email.length > 0 && (
                                    <span style={{ color: 'red' }}>Please enter a valid email address.</span>
                                )}
                                <label for="Email">Email:</label>
                                <div>
                                    <input type="email" class="usertextboxsize" value={Email} id="Email" name="Email" placeholder="Enter your Email"
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                            setIsValidEmail(validator.isEmail(Email));
                                        }} required />
                                    {isValidEmail && Email.length > 0 && (
                                        <span style={{ color: 'green' }}>&#x2714;</span>
                                    )}
                                    <br />
                                </div>
                            </div>
                            <div class="Names">
                                {!isValidPassword && Password.length > 0 && (
                                    <span style={{ color: 'red' }}>
                                        Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                                    </span>
                                )}
                                <label for="password">Password:</label>
                                <div>
                                    <input type="password" class="pwdtextboxsize" value={Password} id="password" name="pwd"
                                        placeholder="Enter your password" onChange={(e) => {
                                            setpass(e.target.value);
                                            setIsValidPassword(validatePassword(e.target.value));
                                        }} required />

                                    {isValidPassword && Password.length > 0 && (
                                        <span style={{ color: 'green' }}>&#x2714;</span>
                                    )} <br /><br />
                                </div>
                            </div>
                            <div class="Submitbtn">
                                <Button type='submit' style={{ marginRight: "10%" }}>Login</Button>
                            </div>
                        </form>
                    </div>
                </div>
      </main>
    </>
  )
}
