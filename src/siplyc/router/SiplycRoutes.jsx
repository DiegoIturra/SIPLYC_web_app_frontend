import { Routes, Route, Navigate } from "react-router-dom"
import { NavBar } from "../../components/Navbar"
import { HomePage } from "../pages/HomePage"
import { ChildrenPage } from "../pages/ChildrenPage"
import { KinderGardensPage } from "../pages/KinderGardensPage"
import { TeachersPage } from "../pages/TeachersPage"

export const SiplycRoutes = () => {
  return(
    <>
      <NavBar/>

      <div className="container">
        <Routes>
          <Route path="home" element={<HomePage/>} />
          <Route path="children" element={<ChildrenPage/>} />
          <Route path="kinderGardens" element={<KinderGardensPage/>} />
          <Route path="teachers" element={<TeachersPage/>} />
          <Route path="/" element={<Navigate to="/home" />}/>
        </Routes>
      </div>
    </>
  )
}