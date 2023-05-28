import AdminAvatar from "@assets/images/AdminAvatar.jpg";
import LogoImage from "@assets/images/Logo.png";
import { setAccount } from "@contexts/account";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = useCallback(() => {
        localStorage.removeItem("accessToken")
        dispatch(setAccount({}))
        navigate('/login')
    }, [])

    return (
        <header className="bg-white sticky top-0 z-40 shadow">

            <div className="h-header py-3 mx-auto max-w-7xl px-4 flex items-center justify-between">
                <Link to='/admin' className="h-full">
                    <img
                        className="block h-full w-auto overflow-hidden"
                        src={LogoImage}
                        alt='Logo'
                    />
                </Link>

                <ul className="flex items-baseline space-x-4">
                    <Link
                        className={`font-medium hover:text-red-600 transition-all duration-300 ${pathname === '/admin' ? 'text-red-600' : 'text-dark-blue'}`}
                        to='/admin'
                    >
                        Hỗ Trợ Tư Vấn
                    </Link>
                    <Link
                        className={`font-medium hover:text-red-600 transition-all duration-300 ${pathname === '/admin/study-abroad-procedure' ? 'text-red-600' : 'text-dark-blue'}`}
                        to='/admin/procedure'
                    >
                        Xử Lý Hồ Sơ
                    </Link>
                    <Link
                        className={`font-medium hover:text-red-600 transition-all duration-300 ${pathname === '//admin/partner-study' ? 'text-red-600' : 'text-dark-blue'}`}
                        to='/admin/partner'
                    >
                        Liên Kết Đối Tác
                    </Link>
                    <Link
                        className={`font-medium hover:text-red-600 transition-all duration-300 ${pathname === '//admin/partner-study' ? 'text-red-600' : 'text-dark-blue'}`}
                        to='/admin/chat'
                    >
                        Tin Nhắn
                    </Link>
                </ul>

                <div className="relative ml-3">
                    <button
                        type="button"
                        className="w-fit h-fit peer"
                    >
                        <img
                            className="h-10 w-10 rounded-full"
                            src={AdminAvatar}
                            alt=""
                        />
                    </button>

                    <ul className="absolute right-0 z-10 mt-2 w-48 bg-white border rounded peer-focus:visible invisible">
                        <li
                            className="block px-4 py-1.5 text-sm hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
                        >
                            Cài đặt
                        </li>
                        <li
                            className="block px-4 py-1.5 text-sm hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Navbar