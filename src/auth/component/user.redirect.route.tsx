import {Navigate, useLocation} from "react-router-dom";
import React from "react";
import cookie from "cookie";
import {USER_COOKIES} from "../constant/security.constant";

interface IsUserRedirectProps {
    loggedInPath: string,
    children: JSX.Element
}

function IsUserRedirect({loggedInPath, children } : IsUserRedirectProps) {
    const user = cookie.parse(document.cookie)?.[USER_COOKIES]
    let location = useLocation();

    if (!user) {
        return children
    }

    return <Navigate to={loggedInPath} state={{ from: location }} replace />;
}

export default IsUserRedirect