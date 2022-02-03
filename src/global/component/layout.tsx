import Navbar from "./navbar/navbar";
import {Toaster} from "react-hot-toast";

interface LayoutProps {
    children: any
}

function Layout({children}: LayoutProps) {
    return <>
        <Navbar />
        <Toaster
            position="top-left"
            reverseOrder={false}
        />
        <div className="container mx-auto">
            {children}
        </div>
    </>
}

export default Layout