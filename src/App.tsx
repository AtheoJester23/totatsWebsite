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

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/schedule" element={<Schedule/>}/>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }/>
        <Route path="/editSched/:id" element={<SchedDetails/>}/>
        <Route path="/createSched" element={<CreateSched/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
