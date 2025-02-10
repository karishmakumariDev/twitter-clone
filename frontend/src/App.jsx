

import { Route,Routes } from "react-router-dom"
import HomePage from "./pages/home/Homepage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/singup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";

import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import { Toaster } from "react-hot-toast";


function App() {
  
  return (
    <>
      <div className='flex mx-auto max=w-6xl ='>
        <Sidebar/>
         <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<SignUpPage/>} />
          <Route path ='/notificationS' element={<NotificationPage/>} />
          <Route path ='/profile/:username' element={<ProfilePage/>} />
         </Routes>
         <RightPanel/>
         <Toaster />
      </div>
    </>
  )
}

export default App
