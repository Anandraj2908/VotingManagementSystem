import { Outlet } from 'react-router-dom'

import Adminbar from './components/adminBar/Adminbar.jsx'
import Footer from "./components/footer/Footer.jsx"

function Dashboard() {

  return (
    <div className="h-screen  flex flex-col justify-between">
      <Adminbar/>
      <Outlet />
      <Footer/>
    </div>
      
  
  )
}

export default Dashboard