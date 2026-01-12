import { NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import { FaMotorcycle, FaUserClock } from "react-icons/fa";



const DashboardLayout = () => {
    const { logOut } = useAuth()
    const closeDrawer = () => {
        const drawer = document.getElementById( "dashboard-drawer" );
        if ( drawer ) drawer.checked = false;
    };

    const handleLogOut = () => {
        logOut()
            .then( result => {
                console.log( result.user )
            } )
            .catch( error => console.log( error ) )
    }
    const navLinks = <>
        <li>
            <NavLink to="/dashboard" end onClick={closeDrawer}>
                📊 Dashboard Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/my-parcels" onClick={closeDrawer}>
                📍My Parcels
            </NavLink>
        </li>
        <li>
            <NavLink to="/sendParcel" onClick={closeDrawer}>
                📦 Send Parcel
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard/payment-history"
                onClick={closeDrawer}
            >
                💳 Payment History
            </NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/riders/active" onClick={closeDrawer}>
                <FaMotorcycle className="text-lg" />
                Active Riders
            </NavLink>
        </li>

        <li>
            <NavLink to="/dashboard/riders/pending" onClick={closeDrawer}>
                <FaUserClock className="text-lg" />
                Pending Riders
            </NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/profile" onClick={closeDrawer}>
                👤 Profile
            </NavLink>
        </li>

        <div className="divider"></div>

        <li>
            <NavLink to="/" onClick={closeDrawer}>
                🏠 Back to Home
            </NavLink>
        </li>
    </>
    return (
        <div className="drawer lg:drawer-open min-h-screen">
            {/* Drawer Toggle */}
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* ================= Main Content ================= */}
            <div className="drawer-content flex flex-col">

                {/* ===== Top Navbar ===== */}
                <div className="navbar bg-base-200 px-4 lg:px-8 sticky top-0 z-10">
                    <div className="flex-none lg:hidden">
                        <label
                            htmlFor="dashboard-drawer"
                            className="btn btn-square btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </label>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl font-bold">Dashboard</h2>
                    </div>

                    <div className="flex-none">
                        <button onClick={handleLogOut} className="btn btn-sm btn-outline">Logout</button>
                    </div>
                </div>

                {/* ===== Page Content ===== */}
                <main className="flex-1 p-4 lg:p-8 bg-base-100">
                    <Outlet />
                </main>
            </div>

            {/* ================= Sidebar ================= */}
            <div className="drawer-side">
                <label
                    htmlFor="dashboard-drawer"
                    className="drawer-overlay"
                ></label>

                <aside className="w-72 bg-base-200 min-h-full p-4">
                    <h3 className="text-2xl font-bold mb-6">Parcel System</h3>

                    <ul className="menu space-y-1">
                        {/* links */}
                        {
                            navLinks
                        }
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;
