import { Outlet } from "react-router-dom"
import Navbar from "../shared/Navbar/Navbar"
import Footer from "../shared/Footer/Footer"

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    )
}

export default RootLayout
