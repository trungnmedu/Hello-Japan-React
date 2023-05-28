import { getAllProcedure, updateProcedure } from "@services/admin";
import { useCallback, useEffect, useState } from "react";


const Procedure = ({ procedure, fetchProcedure }) => {
    const [steps, setSteps] = useState([])

    useEffect(() => {
        setSteps(procedure.steps)
    }, [procedure])

    const handleUpdateStepStatus = (at, value) => {
        setSteps(
            steps => {
                const stepUpdate = {
                    ...steps.at(at),
                    status: value
                }

                const updated = [...steps]
                updated.splice(at, 1, stepUpdate)
                return updated

            }
        )
    }

    const saveUpdate = async () => {
        const payload = {
            ...procedure,
            steps
        }
        await updateProcedure(payload)
        fetchProcedure()
    }


    return (
        <div className="space-y-10 py-10">
            <div className="grid grid-cols-2 gap-5">
                <div className="rounded border p-5 space-y-2">
                    <h2 className="font-medium text-lg text-orange-600">Thông Tin Khách Hàng</h2>
                    <div className="grid grid-cols-4 gap-5">
                        <div className="col-span-3">
                            <div className="flex">
                                <p className="flex-none font-medium w-28">Mã hồ sơ</p>
                                <p>{procedure.id}</p>
                            </div>
                            <div className="flex">
                                <p className="flex-none font-medium w-28">Họ Và Tên</p>
                                <p>{procedure.name}</p>
                            </div>
                            <div className="flex">
                                <p className="flex-none font-medium w-28">Số điện thoại:</p>
                                <p>{procedure.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded border p-5 space-y-2">
                    <h2 className="font-medium text-lg text-dark-blue">Địa điểm đăng ký</h2>
                    <div className="grid grid-cols-4 gap-5">
                        <div className="col-span-3">
                            <div className="flex">
                                <p className="flex-none font-medium w-28">Địa điểm</p>
                                <p>{procedure.target.name}</p>
                            </div>
                            <div className="flex">
                                <p className="flex-none font-medium w-28">Website</p>
                                <a href={procedure.target.link}>{procedure.target.link}</a>
                            </div>
                            <div className="flex">
                                <p className="flex-none font-medium w-28">Số điện thoại:</p>
                                <p>{procedure.target.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-center font-medium text-xl text-dark-blue">Tiến trình xử lý</h2>
                    <button
                        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-800 transition-colors text-white"
                        onClick={saveUpdate}
                    >
                        Lưu thay đổi
                    </button>
                </div>
                {
                    steps.length > 0 ? (
                        <div className="grid grid-cols-3 gap-5">
                            {
                                steps.map(
                                    (step, index) => (
                                        <div
                                            className="border p-5 rounded space-y-2"
                                            key={index}
                                        >
                                            <div className="h-fit">
                                                <h1 className="text-lg font-medium">{step.name}</h1>
                                                <h2>{step.description}</h2>
                                            </div>

                                            <div className="space-y-1">
                                                <h3 className="text-center font-medium text-blue-900">Trạng Thái</h3>
                                                <div className="flex justify-center space-x-4">
                                                    <label
                                                        aria-hidden={step.status === "DONE"}
                                                        className='aria-hidden:hidden flex space-x-2 items-center cursor-pointer group'
                                                    >
                                                        <div className="circle-check w-5 h-5 fill-gray-500">
                                                            <input
                                                                name={`step-${index}`}
                                                                type="radio"
                                                                value='PROCESSING'
                                                                onChange={() => handleUpdateStepStatus(index, 'PROCESSING')}
                                                                checked={step.status === 'PROCESSING'}
                                                            />
                                                            <svg viewBox="0 0 35.6 35.6">
                                                                <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                                                <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                                                <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span className="group-hover:text-gray-500 transition-all duration-300 group-hover:font-medium text-gray-500 font-medium">Đang xử lý</span>
                                                    </label>

                                                    <label className='flex space-x-2 items-center cursor-pointer group'>
                                                        <div className="circle-check w-5 h-5 fill-green-500">
                                                            <input
                                                                name={`step-${index}`}
                                                                type="radio"
                                                                value='DONE'
                                                                onChange={() => handleUpdateStepStatus(index, 'DONE')}
                                                                checked={step.status === 'DONE'}
                                                            />
                                                            <svg viewBox="0 0 35.6 35.6">
                                                                <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                                                <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                                                <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span className="text-green-500 transition-all duration-300 group-hover:font-medium font-medium">Hoàn Thành</span>
                                                    </label>
                                                    <label
                                                        aria-hidden={step.status === "DONE"}
                                                        className='aria-hidden:hidden flex space-x-2 items-center cursor-pointer group'
                                                    >
                                                        <div className="circle-check w-5 h-5 fill-red-600">
                                                            <input
                                                                name={`step-${index}`}
                                                                type="radio"
                                                                value='REJECT'
                                                                checked={step.status === 'REJECT'}
                                                                onChange={() => handleUpdateStepStatus(index, 'REJECT')}

                                                            />
                                                            <svg viewBox="0 0 35.6 35.6">
                                                                <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                                                <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                                                <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span className="group-hover:text-red-600 transition-all duration-300 group-hover:font-medium text-red-600 font-medium">Thất bại</span>
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                )
                            }
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}


const ProcedureManager = () => {
    const [procedures, setProcedures] = useState([])
    const [procedure, setProcedure] = useState()

    const fetchProcedure = useCallback(async () => {
        const { success, payload } = await getAllProcedure()

        if (success) {
            setProcedures(payload || [])
        }
    }, [])

    useEffect(() => {
        fetchProcedure()
    }, [])

    return (
        <div className="mx-auto max-w-7xl mt-10 px-4 space-y-10">
            <h2 className="text-2xl text-center text-catalina-blue font-medium">Xử Lý Đăng Ký</h2>

            <table className="w-full border-gray-200 border">
                <thead>
                    <tr className="text-sm font-medium text-gray-700 border-gray-200">
                        <th className="w-32 px-4 border text-left">Mã hồ sơ</th>
                        <th className="px-4 border text-left">Họ tên</th>
                        <th className="py-2 px-4 border text-left">Số điện thoại</th>
                        <th className="py-2 px-4 border text-left">Địa điểm đăng ký</th>
                        <th className="py-2 px-4 border text-left">Loại</th>
                        <th className="py-2 px-4 border text-left">Trạng thái hồ sơ</th>
                        <th className="py-2 px-4 border text-left">Hành Động</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        procedures.map(
                            procedure => (
                                <tr
                                    key={procedure.id}
                                    className="text-sm text-gray-700 border-gray-200"
                                >
                                    <td className="w-32 px-4 border text-left">#{procedure.id}</td>
                                    <td className="px-4 border text-left">{procedure.name}</td>
                                    <td className="py-2 px-4 border text-left">{procedure.phone}</td>
                                    <td className="py-2 px-4 border text-left">{procedure.target.name}</td>
                                    {
                                        procedure.type === "STUDY" ? (
                                            <td className="py-2 px-4 font-medium border text-left text-orange-500">Du học</td>
                                        ) : (
                                            <td className="py-2 px-4 font-medium border text-left text-dark-blue">Lao động</td>
                                        )
                                    }
                                    <td className="py-2 px-4 border text-left">{procedure.completed ? '✅ Hoàn thành' : '⌛ Đang xử lý'}</td>
                                    <td className="py-2 px-4 border text-left">
                                        <button onClick={() => setProcedure(procedure)} className="text-dark-blue font-medium hover:text-orange-600">Xem</button>
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>

            </table>
            {procedure ? <Procedure procedure={procedure} fetchProcedure={fetchProcedure} /> : null}
        </div >
    )
}

export default ProcedureManager

