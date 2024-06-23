import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { SiplycRoutes } from "../siplyc/router/SiplycRoutes"
import { PrivateRoute } from "./PrivateRoute"

export const AppRouter = () => {
  return(
    <>
      <Routes>
        <Route path="login" element={<LoginPage/>} />

        <Route path="/*" element=
          {
            <PrivateRoute>
              <SiplycRoutes/>
            </PrivateRoute>
          } 
        />

      </Routes>
    </>
  )
}