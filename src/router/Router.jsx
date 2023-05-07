import { useSelector } from "react-redux"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import LaborExport from "@/pages/LaborExport"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import StudyAboard from "@/pages/StudyAboard"

import AdminChat from "@components/Admin/Chat/Chat"
import AdminConsultancy from "@components/Admin/Consultancy/Consultancy"
import AdminLaborExportProcedure from "@components/Admin/LaborExport/LaborExport"
import AdminPartnerStudy from "@components/Admin/PartnerStudy/PartnerStudy"
import AdminStudyAboardProcedure from "@components/Admin/StudyAbroad/StudyAbroad"
import Admin from "@layouts/Admin"

import Procedure from "@components/Home/Procedure/Procedure"
import Main from "@layouts/Main"
import Home from "@pages/Home"
import Introduction from "@pages/Introduction"

const AppRouter = () => {
    const { role = "CUSTOMER" } = useSelector(state => state.auth.account)

    return (
        <BrowserRouter>
            <Routes>
                {
                    role === "ADMIN" ? (
                        <>
                            <Route path="admin" element={<Admin />} >
                                <Route index element={<AdminConsultancy />} />
                                <Route path="study-abroad-procedure" element={<AdminStudyAboardProcedure />} />
                                <Route path="labor-export-procedure" element={<AdminLaborExportProcedure />} />
                                <Route path="partner-study" element={<AdminPartnerStudy />} />
                                <Route path="chat" element={<AdminChat />} />
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
        </BrowserRouter>
    )
}

export default AppRouter