import cookie from "cookie";
import {USER_COOKIES} from "../constant/security.constant";
import {Navigate, useLocation} from "react-router-dom";
import {LOGIN_ROUTE} from "../../global/constant/route";

function RequireAuth({ children }: { children: JSX.Element }) {
    const user = cookie.parse(document.cookie)?.[USER_COOKIES]
    let location = useLocation();

    if (!user) {
        return <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth