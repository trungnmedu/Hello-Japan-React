
import { createProcedure } from "@services/customer"
import { getAllPartner } from "@services/public"
import rules from "@validation/rule"
import { useFormik } from "formik"
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import * as Yup from 'yup'

const StudyRegister = ({ toggle, target }) => {
    const account = useSelector(state => state.auth.account)
    const { id, avatar } = account
    const isLogin = Object.keys(account).length > 0

    const formik = useFormik(
        {
            validateOnBlur: true,
            validateOnChange: true,
            validateOnMount: true,
            validationSchema: Yup.object().shape(
                {
                    name: Yup.string().matches(rules.name, 'Họ và tên không hợp lệ.').required('Họ và tên là bắt buộc.'),
                    email: Yup.string().matches(rules.email, "Email không hợp lệ.").required("Email là bắt buộc."),
                    phone: Yup.string().matches(rules.phone, "Phone không hợp lệ.").required("Phone là bắt buộc."),
                }
            ),
            initialValues: {
                name: account.name || '',
                email: account.email || '',
                phone: account.phone || '',
            },
            onSubmit: async (values) => {
                const payload = {
                    procedure: {
                        ...values,
                        accountId: id,
                        avatar,
                        target
                    },
                    type: "STUDY"
                }
                await createProcedure(payload)
                toggle()
            }
        }
    )

    const disableSubmit = !formik.isValid || formik.isSubmitting
    const { name, email, phone } = formik.values
    const { name: nameError, email: emailError, phone: phoneError } = formik.errors
    const { name: nameTouched, email: emailTouched, phone: phoneTouched } = formik.touched
    const { handleBlur, handleChange, handleSubmit } = formik

    return (
        <div
            className="w-screen h-screen overflow-auto fixed top-0 left-0 z-30 bg-indigo-900/30"
            onClick={toggle}
        >
            <div
                className="max-w-7xl mx-auto flex h-full w-full items-center justify-center"
            >
                {
                    isLogin ? (
                        <div
                            className="bg-white p-5 rounded w-8/12 space-y-10"
                            onClick={e => e.stopPropagation()}
                        >

                            <div className="flex justify-between">
                                <h2 className="text-xl font-medium text-catalina-blue">Đăng Ký Hồ Sơ Du Học</h2>
                                <button
                                    onClick={toggle}
                                    className="h-6 aspect-square hover:p-1 hover:bg-red-600 hover:text-white rounded-full transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form
                                className="w-full space-y-6"
                                onSubmit={handleSubmit}
                            >
                                <div className="flex items-center space-x-4">
                                    <label className="w-20">Họ Và Tên </label>
                                    <div className="grow">
                                        <input
                                            className={`outline-none border w-full rounded-lg px-4 py-1.5 duration-300 transition-all focus:border-dark-blue ${nameError && nameTouched ? 'border-red-400' : 'border'}`}
                                            name='name'
                                            value={name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Nguyễn Văn A"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <label className="w-20">Email </label>
                                    <div className="grow">
                                        <input
                                            className={`outline-none border w-full rounded-lg px-4 py-1.5 duration-300 transition-all focus:border-dark-blue ${emailError && emailTouched ? 'border-red-400' : 'border'}`}
                                            name='email'
                                            value={email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="nguyenvana@gmail.com"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <label className="w-20">Trường</label>
                                    <div className="grow overflow-hidden">
                                        <p className="border w-full rounded-lg px-4 py-1.5  truncate">{target.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <label className="w-20">SĐT</label>
                                    <div className="grow">
                                        <input
                                            className={`outline-none border w-full rounded-lg px-4 py-1.5 duration-300 transition-all focus:border-dark-blue ${phoneError && phoneTouched ? 'border-red-400' : 'border'}`}
                                            name='phone'
                                            value={phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="84456789255"
                                        />
                                    </div>
                                </div>

                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-10 h-10 mb-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 transition-all duration-300 hover:text-red-500 space-x-1">
                                            <span className="font-semibold">Click để tải lên</span>
                                            <span>hoặc kéo thả</span>
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or PDF ...</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" />
                                </label>

                                <button
                                    className="mx-auto flex items-center space-x-2 bg-red-500 rounded-lg px-4 py-1.5 text-white disabled:opacity-50 transition-all duration-300"
                                    type='submit'
                                    disabled={disableSubmit}
                                >
                                    <span>Gửi yêu cầu</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                    </svg>

                                </button>
                            </form>
                        </div>
                    ) : (
                        <div
                            onClick={e => e.stopPropagation()}
                            className="bg-white space-y-5 p-5 rounded shadow"
                        >
                            <h2 className="text-center text-2xl font-medium text-catalina-blue">Đăng Ký Hồ Sơ</h2>
                            <p className="text-center">Vui lòng đăng nhập để sử dụng tính năng.</p>

                            <div className="flex justify-center space-x-8">
                                <Link className="bg-indigo-900 hover:bg-catalina-blue transition-all duration-300 px-4 py-2 rounded text-white font-medium" to='/register' >Đăng Ký</Link>
                                <Link className="bg-red-500 hover:bg-red-600 transition-all duration-300 px-4 py-2 rounded text-white font-medium" to='/login' >Đăng Nhập</Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const News = ({ news }) => {
    const { name, logo, address, link, phone, description } = news
    const [displayRegister, setDisplayRegister] = useState(false)

    const toggleDisplayRegister = useCallback(() => {
        setDisplayRegister(toggle => !toggle)
    }, [])

    return (
        <>
            <div className="border p-5 rounded space-y-5">
                <h1 className="font-medium text-xl">{name}</h1>
                <div className="space-y-1">
                    <div className="grid grid-cols-4 gap-5">
                        <div className="col-span-1">
                            <img alt="logo" src={logo} />
                        </div>
                        <div className="col-span-3">
                            <div className="flex space-x-2">
                                <p className="w-16 font-medium flex-none">Địa chỉ:</p>
                                <p>{address}</p>
                            </div>
                            <div className="flex space-x-2">
                                <p className="w-16 font-medium flex-none">Website:</p>
                                <a className="hover:text-red-600 transition-all duration-300" href={link} target="_blank">{link}</a>
                            </div>
                            <div className="flex space-x-2">
                                <p className="w-16 font-medium flex-none">Phone:</p>
                                <p>{phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-center font-medium">Chi tiết</p>
                        <p className="whitespace-pre-line">{description}</p>
                    </div>
                </div>
                <button onClick={toggleDisplayRegister} className="ml-auto block bg-orange-600 px-3 py-1 rounded text-white">Đăng Ký</button>
            </div>
            {displayRegister ? <StudyRegister target={news} toggle={toggleDisplayRegister} /> : null}
        </>
    )
}

const StudyAbroadInfo = () => {

    const [links, setLinks] = useState([])

    useEffect(() => {
        const fetchLocation = async () => {
            const { success, payload } = await getAllPartner("STUDY")
            if (success) {
                setLinks(payload || [])
            }
        }
        fetchLocation()
    }, [])
    return (
        <div className="max-w-7xl p-5 mx-auto grid grid-cols-2 gap-8">
            {
                links.map((news, index) => <News key={index} news={news} />)
            }

        </div>
    )
}

export default StudyAbroadInfo