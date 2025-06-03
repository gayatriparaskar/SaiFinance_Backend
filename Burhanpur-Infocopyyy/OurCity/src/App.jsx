import { useState } from 'react'
 
import './App.css'
// import Navbar from './Components/ui/Navbar'
 
import RouteShow from './Components/AllRoutes/RouteShow'
import AdminDashboard from './Components/AdimLogin/AdminDashboard/AdminCategory'
import { Toaster } from 'react-hot-toast'
// import RouteShow from './Components/AllRoutes/RouteShow'
 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       {/* <AdminDashboard/> */}
       {/* <Navbar/> */}
       {/* <RouteShow/> */}
       <Toaster position="top-right" />
       <RouteShow/>
       

        
    </>
  )
}

export default App
