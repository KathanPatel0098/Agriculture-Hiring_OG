import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Route, Routes } from 'react-router-dom'
import { UserSidebar } from './components/layouts/UserSidebar'
// import "./assets/css/adminlte.css"
// import "./assets/css/adminlte.min.css"
import { Signup } from './components/common/Signup'
import { Login } from './components/common/Login'
import { Home } from './components/common/Home'
// import "./assets/css/bootstrap.min.css"
// import "./assets/css/owl.carousel.min.css"
// import "./assets/css/login_style.css"
// import "./assets/fonts/icomoon/style.css"
// import "./assets/Signup_fonts/material-design-iconic-font/css/material-design-iconic-font.min.css" 
// import "./assets/css/signup_style.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    // <body className='layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar-open'>
    //   <div className='app-wrapper'>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signin' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/user' element={<UserSidebar/>}></Route>
        </Routes>
    //    </div> 
    //  </body>
  )
}

export default App
