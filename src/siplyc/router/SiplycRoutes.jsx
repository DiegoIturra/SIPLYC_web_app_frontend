import { Routes, Route, Navigate } from "react-router-dom"
import { NavBar } from "../../components/Navbar"
import { HomePage } from "../pages/HomePage"
import { ChildrenPage } from "../pages/ChildrenPage"
import { KinderGardensPage } from "../pages/KinderGardensPage"
import { TeachersPage } from "../pages/TeachersPage"
import { FilesPage } from "../pages/FilesPage"
import { GraphicsPage } from "../pages/GraphicsPage"
import { CitiesPage } from "../pages/CitiesPage"

export const SiplycRoutes = () => {
  return(
    <>
      <NavBar/>

      <div>
        <Routes>
          <Route path="home" element={<HomePage/>} />
          <Route path="children" element={<ChildrenPage/>} />
          <Route path="kinderGardens" element={<KinderGardensPage/>} />
          <Route path="teachers" element={<TeachersPage/>} />
          <Route path="files" element={<FilesPage/>}/>
          <Route path="graphics" element={<GraphicsPage/>}/>
          <Route path="cities" element={<CitiesPage/>}/>
          <Route path="/" element={<Navigate to="/home" />}/>
        </Routes>
      </div>
    </>
  )
}