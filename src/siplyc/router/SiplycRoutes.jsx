import { AssignTeacherStudents } from "../pages/AssignTeacherStudents"
import { ChildrenPage } from "../pages/ChildrenPage"
import { CitiesPage } from "../pages/CitiesPage"
import { FilesPage } from "../pages/FilesPage"
import { GraphicsPage } from "../pages/GraphicsPage"
import { HomePage } from "../pages/HomePage"
import { KinderGardensPage } from "../pages/KinderGardensPage"
import { NavBar } from "../../components/Navbar"
import { Routes, Route, Navigate } from "react-router-dom"
import { SessionsPage } from "../pages/SessionsPage"
import { TeachersPage } from "../pages/TeachersPage"

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
          <Route path="assing_teacher_student" element={<AssignTeacherStudents/>}/>
          <Route path="sessions" element={<SessionsPage/>}/>
          <Route path="/" element={<Navigate to="/login" />}/>
        </Routes>
      </div>
    </>
  )
}