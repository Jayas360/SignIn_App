import React from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import './Home.css';

const Home = () => {
  const { logOut } = useUserAuth();


  return (
    <div className='home-page'>
      <header className='header'>
        <ul>
          <li className='head1'>Home</li>
          <li className='head2'> <button onClick={() => logOut()}>Logout</button></li>
        </ul>
      </header>
      <main className='main'>
        <h1>Home Page</h1>
      </main>
    </div>
  );
};

export default Home;
