

import { Route,Routes } from "react-router-dom"
import HomePage from "./pages/home/Homepage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/singup/SignUpPage";


function App() {
  
  return (
    <>
      <div className='flex mx-auto max=w-6xl ='>
         <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<SignUpPage/>} />
         </Routes>
      </div>
    </>
  )
}

export default App
