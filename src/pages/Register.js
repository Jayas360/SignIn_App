import React, { useState } from 'react';
import { setAppElement } from 'react-modal';
import Modal from 'react-modal';
import './Register.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserAuth } from '../context/UserAuthContext';
import { async } from '@firebase/util';
toast.configure();

const customStyles = {
  content: {
    top: '10%',
    left: '30%',
    right: '30%',
    bottom: '10%',
  },
};

let initialData = {
  email: "",
  password: "",
  confPassword: ""
};

setAppElement(document.getElementById('root'));

function Register(props) {
  const [userData, setUserData] = useState(initialData);
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [confPassError, setConfPassError] = useState("");
  const [error, setError] = useState("");

  const { email, password, confPassword } = userData;
  const { signUp } = useUserAuth();

  function openModal() {
    //setIsOpen(true);f
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    props.setIsShown(false);
  }

  const registerUser = async (e) => {
    e.preventDefault();
    if (validation()) {
      setError("");
      try {
        await signUp(email, password);
        toast.success("User registered successfully...", { autoClose: 1500 });
        setTimeout(() => closeModal(), 800);
      } catch (error) {
        setError(error.code);
      }
    }
  }

  function validation() {
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
    else if (confPassword.length === 0) {
      setConfPassError("Field can not be empty.");
    }
    else if (password !== confPassword) {
      setConfPassError("Password don't match.");
      flag = 0;
    }
    return flag;
  }


  const handleInputChange = (event) => {
    setEmailError("");
    setPassError("");
    setConfPassError("");
    setError();
    const name = event.target.name;
    const value = event.target.value;
    setUserData({ ...userData, [name]: value });
  }

  return (

    <div >
      <Modal
        isOpen={true}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"

      >
        <div className='modal-form'>
          {error && (
            <p className='auth-error'>{error}</p>
          )}
          <div className='form-head'>
            <p>Sign up</p>
          </div>
          <form className='reg-form' >
            <div className="form-input">
              <input type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Email"
              /><br />
              <p className='error'>{emailError}</p>
            </div>

            <div className="form-input">
              <input type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="Password"

              /><br />
              <p className='error'>{passError}</p>
            </div>

            <div className="form-input">
              <input type="password"
                name="confPassword"
                value={confPassword}
                onChange={handleInputChange}
                placeholder="Confirm Passsword"
              /><br />
              <p className='error'>{confPassError}</p>
            </div>

            <div className="form-input">
              <button
                onClick={registerUser} >
                Register
              </button>
            </div>

          </form>
          <div className="form-input logbtn">
            <button onClick={closeModal}>Login</button>
          </div>

        </div>
      </Modal>
    </div>
  );
}

export default Register;

