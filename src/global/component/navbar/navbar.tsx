import {Disclosure} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import NavbarMobile from "./navbar.mobile";
import React, {useEffect, useState} from "react";
import {links} from "./navbar.data";
import {INDEX_ROUTE} from "../../constant/route";
import {useLocation, Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import {USER_COOKIES} from "../../../auth/constant/security.constant";
import {useLogoutMutation, useUserQuery} from "../../../generated/graphql";

interface NavbarProps {
}

function Navbar({}: NavbarProps) {

    const router = useLocation();
    const [{fetching, data}] = useUserQuery()
    const [, logout] = useLogoutMutation()
    const [, , removeCookie] = useCookies([USER_COOKIES])
    const [body, setBody] = useState("default")


    const handleLogout = async () => {
        removeCookie(USER_COOKIES)
        await logout()
    }

    useEffect(() => {
        setBody(data?.user ? "user" : "default")
    }, [data, fetching])

    return (
        <Disclosure as="nav" className="bg-white shadow">
            {({open}) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-end h-16">
                            <div className="flex">
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                    <Link
                                        className={`${router.pathname === INDEX_ROUTE ? "border-black text-gray-900" : "text-gray-900"} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                        to={INDEX_ROUTE}>
                                        Home
                                    </Link>
                                    {/** @ts-ignore */}
                                    {links[body].map((item, key) => (
                                        <Link
                                            className={`${router.pathname === item.href ? "border-black text-gray-900" : "text-gray-900"} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                            key={key} to={item.href}>
                                            {item.label}
                                        </Link>
                                    ))}
                                    {data?.user && <Link onClick={handleLogout} className={`text-red-500 inline-flex items-center px-1 pt-1  text-sm font-medium`} to={INDEX_ROUTE}>
                                            Sign out
                                    </Link>}
                                </div>
                            </div>
                            <div className="-mr-2 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>
                    <NavbarMobile body={body}/>
                </>
            )}
        </Disclosure>
    )
}

export default Navbar