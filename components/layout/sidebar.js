"use client"

import Link from "next/link";
import {useRouter} from "next/router";
import {useUser} from "../../contexts/user";
import {PiPlusCircle, PiUsersThree} from "react-icons/pi";
import {BiUser} from "react-icons/bi";
import {RiLogoutBoxLine} from "react-icons/ri";
import {useI18n} from "../../contexts/i18n";

const Sidebar = ({}) => {

    const i18n = useI18n()

    const router = useRouter()
    const user = useUser()

    const isActive = (href) => {
        return router.pathname === href ? 'active' : ''
    }

    return (
        <>
            <div
                onClick={() => {
                    window.document.querySelector('.sidebar').classList.toggle('open')
                    window.document.querySelector('.sidebar-overlay').classList.toggle('open')
                }}
                className="sidebar-overlay"/>
            <aside className="sidebar">
                <div className="title">
                    <img src={user?.logo || "/logo.svg"} className="h-20" alt=""/>
                </div>
                <ul
                    style={{height: 'calc(100vh - 250px)'}}
                    className="menu slim-scroll">
                    <li className="menu-title">{i18n.t("Sales")}</li>
                    <li className="menu-item">
                        <Link href="/" className={isActive('/')}>
                            <img src="/icons/auftraege.png" className="h-4" alt=""/>
                            <span>{i18n.t("Orders")}</span>
                        </Link>
                    </li>
                    <li className="menu-title">{i18n.t("Funeral floristry")}</li>
                    <li className="menu-item">
                        <Link href="/sales/add" className={isActive('/sales/add')}>
                            <PiPlusCircle/>
                            <span>{i18n.t("Order")}</span>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link href="/sales" className={isActive('/sales') || isActive('/sales/[uid]')}>
                            <img src="/icons/auftraege.png" className="h-4" alt=""/>
                            <span>{i18n.t("Orders")}</span>
                        </Link>
                    </li>
                    <li className="menu-title">{i18n.t("Stonemason")}</li>
                    <li className="menu-item">
                        <Link href="/sales2/add" className={isActive('/sales2/add')}>
                            <img src="/icons/steinmetz.png" className="h-6" alt=""/>
                            <span>{i18n.t("Create order")}</span>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link href="/sales2" className={isActive('/sales2') || isActive('/sales2/[uid]')}>
                            <img src="/icons/auftraege.png" className="h-4" alt=""/>
                            <span>{i18n.t("Orders")}</span>
                        </Link>
                    </li>
                    {user?.role === 'admin' && (
                        <>
                            <li className="menu-title">{i18n.t("Admin Panel")}</li>
                            <li className="menu-item">
                                <Link href="/users" className={isActive('/users') || isActive('/users/add') || isActive('/users/[uid]')}>
                                    <PiUsersThree/>
                                    <span>{i18n.t("See all users")}</span>
                                </Link>
                            </li>
                            <li className="menu-item">
                                <Link href="/box" className={isActive('/box') || isActive('/box/add') || isActive('/box/[uid]')}>
                                    <img src="/icons/alletraueransehen.png" className="h-4" alt=""/>
                                    <span>{i18n.t("See all Boxes")}</span>
                                </Link>
                            </li>
                            <li className="menu-item">
                                <Link href="/ribbon" className={isActive('/ribbon') || isActive('/ribbon/add') || isActive('/ribbon/[uid]')}>
                                    <img src="/icons/alletraueransehen.png" className="h-4" alt=""/>
                                    <span>{i18n.t("Ribbons")}</span>
                                </Link>
                            </li>
                            <li className="menu-title">{i18n.t("Report")}</li>
                            <li className="menu-item">
                                <Link href="/report" className={isActive('/report')}>
                                    <img src="/icons/bericht.png" className="h-4" alt=""/>
                                    <span>{i18n.t("Report")}</span>
                                </Link>
                            </li>
                        </>
                    )}

                </ul>

                <div className="absolute pb-6 bottom-0 w-full bg-white dark:bg-gray-800">
                    <ul className="menu">
                        <li className="menu-item">
                            <Link href="/profile" className={isActive('/profile')}>
                                <BiUser/>
                                <span>{i18n.t("Profile Settings")}</span>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <a
                                role="button"
                                onClick={() => {
                                    localStorage.removeItem('token')
                                    router.push('/login')
                                }}
                                className="bg-red-500 hover:!bg-red-600 text-white uppercase">
                                <RiLogoutBoxLine/>
                                <span>{i18n.t("Log out")}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>

    )
}

export default Sidebar