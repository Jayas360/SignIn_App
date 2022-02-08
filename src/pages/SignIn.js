import React, { useState } from 'react';
import './SignIn.css';
import Register from './Register';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { async } from '@firebase/util';

const initialData = {
    email: "",
    password: ""
};
const SignIn = () => {
    const [data, setData] = useState(initialData);
    const [isShown, setIsShown] = useState(false);
    const [error, setEroor] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");

    const { logIn } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validation(data.email, data.password)) {
            try {
                await logIn(data.email, data.password);
                navigate("/home");
            }
            catch (error) {
                setEroor(error.code);
            }
        }
    }

    const validation = (email, password) => {
        let flag = 1;
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (email.length === 0) {
            setEmailError("Field can not be empty.");
            flag = 0;
        }
        else if (!pattern.test(email)) {
            setEmailError("Invalid email.");
            flag = 0;
        }

        if (password.length === 0) {
            setPassError("Field can not be empty.");
            flag = 0;
        }
        else if (password.length > 0 && password.length < 8) {
            setPassError("Password should contain atleast 8 characters.");
            flag = 0;
        }
        return flag;
    }

    const handleRegister = event => {
        event.preventDefault();
        setIsShown(true);
    }

    const handleChange = e => {
        setEmailError("");
        setPassError("");
        setEroor("");
        const { name, value } = e.target;
        setData(() => ({ ...data, [name]: value }))
    }

    return (
        <>
            {isShown && (
                <Register setIsShown={setIsShown} />)}
            <div className='signin'>
                <section className='sec-1'>
                    <div>
                        <span style={{ color: "brown" }}>" Do one thing </span><br />
                        <span style={{ color: "green" }}>everday that</span><br />
                        <span style={{ color: "grey" }}>scares you "</span> <br />
                        <span style={{ fontSize: "8vh" }}>-Eleanor Roosevelt</span>
                    </div>

                </section>
                <section className='sec-2'>
                    <div className='signin-div' >
                        <p className='sign-error'>{error}</p>
                        <h3>Welcome Back </h3>
                        <div className='signin-form'>
                            <form>
                                <input
                                    className='email-field'
                                    type="text"
                                    name='email'
                                    value={data.email}
                                    placeholder="Enter registered email..."
                                    onChange={handleChange}
                                /><p className='sign-error'>{emailError}</p>
                                <input
                                    className='pass-field'
                                    type="text"
                                    name='password'
                                    value={data.password}
                                    placeholder="Enter password..."
                                    onChange={handleChange}
                                /> <p className='sign-error'>{passError}</p>
                                <button className='sign-btn' onClick={handleSubmit} > Sign In</button>
                                <button className='reg-btn' onClick={handleRegister}>Register</button>
                            </form>
                        </div>
                    </div>
                </section >
            </div>
        </>
    );
};

export default SignIn;
