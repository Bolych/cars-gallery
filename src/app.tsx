import './App.css'
import {MainGallery} from "./components/main-gallery";
import { Route, Routes } from 'react-router-dom';
import {CarDetails} from "./components/car-details";
import AddCar from "./components/add-car";


function App() {

  return (
      <Routes>
        <Route path="/" element={  <MainGallery/>} />
        <Route path="/add-car" element={  <AddCar/>} />
        <Route path="/car/:id" element={<CarDetails />} />
      </Routes>


  )
}

export default App
