import {Disclosure} from "@headlessui/react";
import React, {useState} from "react";
import {links} from "./navbar.data";
import {useLocation, Link} from "react-router-dom";
import {LogoutIcon} from "@heroicons/react/solid";
import {useCookies} from "react-cookie";
import {USER_COOKIES} from "../../../auth/constant/security.constant";

interface NavbarMobileProps {
    body: string
}

function NavbarMobile({body}: NavbarMobileProps) {

    const router = useLocation()

    const [, , removeCookie] = useCookies([USER_COOKIES])

    const handleLogout = () => {
        removeCookie(USER_COOKIES)
    }

    return (
        <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 space-y-1">
                {/** @ts-ignore */}
                {links[body].map((item, key) => (
                    <Disclosure.Button
                        as={Link}
                        key={key}
                        className={item.href === router.pathname ? "bg-indigo-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" : "bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"}
                        to={item.href}
                    >{item.label}
                    </Disclosure.Button>
                ))}
            </div>
            {body === "user" && <button
                type="button"
                onClick={handleLogout}
                className="inline-flex my-4 mx-2 items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                Sign out
                <LogoutIcon className="-mr-1 ml-3 h-5 w-5" aria-hidden="true"/>
            </button>}
        </Disclosure.Panel>
    )
}

export default NavbarMobile