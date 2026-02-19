import { BrowserRouter, Route, Routes } from "react-router-dom"
import PageNotFound from "./pages/PageNotFound"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Pricing from "./pages/Pricing"
import Login from "./pages/Login"
import Schedule from "./pages/Schedule"
import Dashboard from "./pages/Dashboard"
import CreateSched from "./pages/CreateSched"
import ProtectedRoute from "./components/ProtectedRoute"
import SchedDetails from "./pages/SchedDetails"
import Chatbot from "./components/Chatbot"
import Shop from './pages/Shop'
import EditProduct from "./pages/EditProduct"
import Schedules from "./components/dashboard/Schedules"
import CreateProduct from "./components/dashboard/CreateProduct"
import Footer from "./components/Footer"
import StudioPolicies from "./pages/StudioPolicies"

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Chatbot/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/schedule" element={<Schedule/>}/>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }>
          <Route index element={<Schedules/>}/>
          <Route path="createSchedule" element={<CreateSched/>}/>
          <Route path="shop" element={<Shop/>}/>
          <Route path="shop/edit/:id" element={<EditProduct/>}/>
          <Route path="shop/createProduct" element={<CreateProduct/>}/>
        </Route>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/editSched/:id" element={<SchedDetails/>}/>
        <Route path="/tpc" element={<StudioPolicies/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
