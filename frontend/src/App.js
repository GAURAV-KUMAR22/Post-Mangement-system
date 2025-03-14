import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Ragister from './Components/Auth/Ragister';
import Login from './Components/Auth/Login';
import Home from './Components/Home';
import ForgotPassword from './Components/Auth/ForgotPassword';
import ResetPassword from './Components/Auth/ResetPassword';
import ProtectedRoute from './services/ProtectedRoute';
import { Bounce, ToastContainer } from 'react-toastify';
import NewPost from './Components/Posts/NewPost';
import UserDashboard from './Components/Profile/UserDashboard';
import Layout from './Components/Layout/Layout';
import PostList from './Components/Posts/PostList'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index path='/ragister' element={<Ragister />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path='/' element={<Home />}></Route>
              <Route path='/forgot-password' element={<ForgotPassword />}></Route>
              <Route path='/reset-password/?' element={<ResetPassword />}></Route>
              <Route path='/new-post' element={<NewPost />}></Route>
              <Route path='/posts' element={<PostList />}></Route>
              <Route path='/getuser/:id' element={<UserDashboard />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </BrowserRouter>
  );
}

export default App;
