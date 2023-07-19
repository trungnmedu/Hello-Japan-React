import procedureBanner from "@assets/images/procedure/procedure.svg"
import { getAllProcedure } from "@services/customer"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


const ProcedureManage = () => {
    const [procedures, setProcedures] = useState([])
    const [procedure, setProcedure] = useState()

    useEffect(() => {
        (
            async () => {
                const { success, payload } = await getAllProcedure()
                if (success) {
                    setProcedures(payload)
                }
            }
        )()
    }, [])

    return (

        <div className="max-w-7xl p-5 mx-auto space-y-5">
            <h2 className="text-2xl font-medium text-catalina-blue">Trạng Thái Hồ Sơ Của Bạn</h2>

            <table className="w-full border-gray-200 border">
                <thead>
                    <tr className="text-sm font-medium text-gray-700 border-gray-200">
                        <th className="w-28 px-4 border text-left">Mã hồ sơ</th>
                        <th className="py-2 px-4 border text-left">Số điện thoại</th>
                        <th className="py-2 px-4 border text-left">Loại hồ sơ</th>
                        <th className="py-2 px-4 border text-left">Địa điểm</th>
                        <th className="py-2 px-4 border text-left">Trạng thái</th>
                        <th className="py-2 px-4 border text-left">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        procedures.map(
                            procedure => (
                                <tr key={procedure.id} className="text-sm text-gray-700 border-gray-200">
                                    <td className="w-28 px-4 border">#{procedure.id}</td>
                                    <td className="py-4 px-4 border">{procedure.phone}</td>
                                    <td className="py-4 px-4 border">{procedure.type === "STUDY" ? "Du Học" : "Lao Động"}</td>
                                    <td className="py-4 px-4 border">{procedure.target.name}</td>
                                    <td className="py-4 px-4 border">
                                        {
                                            procedure.completed ? (
                                                <div className="flex items-center space-x-1 text-green-700 font-medium">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                    </svg>

                                                    <span>Hoàn thành</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center space-x-1 text-dark-blue font-medium">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>Đang xử lý</span>
                                                </div>
                                            )
                                        }


                                    </td>
                                    <td className="py-4 px-4 border">
                                        <button
                                            className="flex items-center space-x-1 hover:text-red-500 transition-all"
                                            onClick={() => setProcedure(procedure)}
                                        >
                                            Xem chi tiết
                                        </button>
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            {
                procedure ? (
                    <div className="w-full grid grid-cols-2 gap-5">
                        <div className="space-y-5">
                            <h1 className="font-medium text-xl text-center">Thông tin nơi đăng ký</h1>
                            <div className="border p-5 rounded space-y-5">
                                <h1 className="font-medium text-xl">{procedure.target.name}</h1>
                                <div className="space-y-1">
                                    <div className="grid grid-cols-4 gap-5">
                                        <div className="col-span-1">
                                            <img alt="logo" src={procedure.target.logo} />
                                        </div>
                                        <div className="col-span-3">
                                            <div className="flex space-x-2">
                                                <p className="w-16 font-medium flex-none">Địa chỉ:</p>
                                                <p>{procedure.target.address}</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <p className="w-16 font-medium flex-none">Website:</p>
                                                <a className="hover:text-red-600 transition-all duration-300" href={procedure.target.link} target="_blank">{procedure.target.link}</a>
                                            </div>
                                            <div className="flex space-x-2">
                                                <p className="w-16 font-medium flex-none">Phone:</p>
                                                <p>{procedure.target.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-center font-medium">Chi tiết</p>
                                        <p className="whitespace-pre-line">{procedure.target.description}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="space-y-5">
                            <h1 className="font-medium text-xl text-center">Trạng thái hồ sơ</h1>
                            <ul className="list-none">
                                {

                                    procedure.steps.map(
                                        (step, index) => (
                                            <li key={index} className="relative">

                                                <div className="absolute z-0 top-0 left-5 -translate-x-1/2 w-0.25 h-full bg-ice-blue"></div>

                                                <div className="space-x-4 flex relative z-10">
                                                    {
                                                        step.status === "DONE" ? (
                                                            <div className="w-10 h-10 p-2 aspect-square border flex justify-center items-center rounded-full bg-green-500 text-white">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                                </svg>
                                                            </div>
                                                        ) : step.status === "PROCESSING" ? (
                                                            <div className="w-10 h-10 p-2 aspect-square border flex justify-center items-center rounded-full bg-orange-600 text-white">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            </div>
                                                        ) : (
                                                            <div className="w-10 h-10 p-2 aspect-square border flex justify-center items-center rounded-full bg-slate-100 text-slate-500">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                                                                </svg>
                                                            </div>
                                                        )
                                                    }

                                                    <div className="w-full overflow-hidden pb-4">
                                                        <p className="mb-2 text-lg font-bold">{step.name}</p>
                                                        <p className="text-gray-700">{step.description}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    )
                                }
                                {
                                    procedure.completed ? (
                                        <li>
                                            <div className="space-x-4 flex">
                                                <div className="w-10 h-10 p-2 aspect-square border flex justify-center items-center rounded-full bg-green-500 text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                    </svg>
                                                </div>
                                                <p className="self-center text-lg font-bold">Hoàn thành</p>
                                            </div>
                                        </li>
                                    ) : null
                                }

                            </ul>
                        </div>
                    </div>

                ) : null
            }

        </div >



    )
}

const Procedure = () => {
    const account = useSelector(state => state.auth.account)
    const isLogin = Object.keys(account).length > 0

    return (
        <>
            {
                isLogin ? (
                    <ProcedureManage />
                ) : (
                    <div className="max-w-7xl p-5 mx-auto space-y-4">
                        <h2 className="text-center text-2xl font-medium text-catalina-blue">Đăng Ký Hồ Sơ</h2>
                        <p className="text-center">Vui lòng đăng nhập để sử dụng tính năng.</p>

                        <div className="flex justify-center space-x-8">
                            <Link className="bg-indigo-900 hover:bg-catalina-blue transition-all duration-300 px-4 py-2 rounded text-white font-medium" to='/register' >Đăng Ký</Link>
                            <Link className="bg-red-500 hover:bg-red-600 transition-all duration-300 px-4 py-2 rounded text-white font-medium" to='/login' >Đăng Nhập</Link>
                        </div>
                        <img
                            className="block max-w-lg mx-auto object-cover"
                            src={procedureBanner}
                        />
                    </div>
                )
            }
        </>
    )
}

export default Procedure