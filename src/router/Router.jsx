import { useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"

import LaborExport from "@src/pages/LaborExport"
import Login from "@src/pages/Login"
import Register from "@src/pages/Register"
import StudyAboard from "@src/pages/StudyAboard"

import AdminChat from "@components/Admin/Chat/Chat"
import AdminConsultancy from "@components/Admin/Consultancy/Consultancy"
import AdminPartner from "@components/Admin/Partner/Partner"
import AdminProcedure from "@components/Admin/Procedure/Procedure"
import Admin from "@layouts/Admin"

import Procedure from "@components/Home/Procedure/Procedure"
import Main from "@layouts/Main"
import Home from "@pages/Home"
import Introduction from "@pages/Introduction"

const AppRouter = () => {
    const { role = "CUSTOMER" } = useSelector(state => state.auth.account)

    return (
        <Routes>
            {
                role === "ADMIN" ? (
                    <>
                        <Route path="admin" element={<Admin />} >
                            <Route index element={<AdminConsultancy />} />
                            <Route path="procedure" element={<AdminProcedure />} />
                            <Route path="partner" element={<AdminPartner />} />
                            <Route path="chat/*" element={<AdminChat />} />
                        </Route>
                        <Route path="*" element={<Navigate to='/admin' />} />
                    </>
                ) : (
                    <Route path="*" element={<Main />}>
                        <Route index element={<Home />} />
                        <Route path="introduction" element={<Introduction />} />
                        <Route path="japanese-study-abroad" element={<StudyAboard />} />
                        <Route path="japanese-labor-export" element={<LaborExport />} />
                        <Route path="procedure" element={<Procedure />} />
                    </Route>
                )
            }
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
        </Routes>
    )
}

export default AppRouter