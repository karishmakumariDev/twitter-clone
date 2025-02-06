
import { Router } from "express"
import { Route,Routes } from "react-router-dom"

function App() {
  
  return (
    <>
      <div className='flex mx-auto max=w-6xl ='>
         <Router>
          <Route path='/' element={<HomePage/>} />
          <Route path='/ loging' element={<LoginPage/>} />
          <Route path='/signup' element={<SingUpPage/>} />
         </Router>
      </div>
    </>
  )
}

export default App
