import SignIn from './pages/SignIn';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext';
import ProtectedRoute from './ProtectedRoute';

function App() {

  return (
    <BrowserRouter >
      <UserAuthContextProvider>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </Routes>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
