import './App.css';
import Signin from './pages/Signin';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup'
import Settings from './pages/Settings';
import ProfilePage from './pages/ProfilePage';
import { userAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
// import Home from './pages/Home';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = userAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });
  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex  items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser && authUser._id ? <Home /> : <Navigate to="/signin" />} />  
        <Route path='/signup' element={ authUser && authUser._id ? <Navigate to="/" replace/> : <Signup />} />
        <Route path="/signin" element={authUser && authUser._id ? <Navigate to="/" replace /> : <Signin />}/>
        <Route path='/settings' element={<Settings />} />
        <Route path='/profile' element={authUser && authUser._id ? <ProfilePage /> : <Navigate to="/signin"/>} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
