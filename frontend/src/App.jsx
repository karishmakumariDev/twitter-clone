

import { Route,Routes } from "react-router-dom"
import HomePage from "./pages/home/Homepage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/singup/SignUpPage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import NotificationPage from "./pages/notification/NotificationPage";



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
         </Routes>
         <RightPanel/>
      </div>
    </>
  )
}

export default App
