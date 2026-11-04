
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import Units from './pages/Units'
import UnitsDetails from './pages/UnitsDetails'
import Zones from './pages/Zones'
import Developers from './pages/Developers'
import DevelopersDetails from './pages/DevelopersDetails'
import Contactus from './pages/Contactus'
import ZonesDetails from './pages/ZonesDetails'
import ZoneProjectDetails from './pages/ZoneProjectDetails'

function App() {
  

  return (
    <>
    
    <Navbar/>
    

    <Routes>
      <Route path="/" element={<Home/>}/>
     <Route path="/home" element={<Home/>}/>
     <Route path="/units" element={<Units/>}/>
     <Route path="/units/:id" element={<UnitsDetails/>}/>
     <Route path="/zones" element={<Zones/>}/>
     <Route path="/zones/:id" element={<ZonesDetails/>}/>
     <Route path="/zones/:zoneId/projects/:projectId" element={<ZoneProjectDetails/>}/>
     <Route path="/developers" element={<Developers/>}/>
     <Route path="/developers/:id" element={<DevelopersDetails/>}/>
     <Route path="/contact-us" element={<Contactus/>}/>
    </Routes>

  

     <Footer/>

     
    </>
  )
}

export default App
