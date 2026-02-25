
import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logOut, useCurrentUser } from "../redux/features/auth/authSlice";
import { FiKey } from "react-icons/fi";
import { NAV_CONFIG } from "../components/NavLinks/NavLinks";




const navLinkClass = ( { isActive }: { isActive: boolean } ) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition
   ${ isActive
        ? "bg-primary text-primary-content font-semibold"
        : "hover:bg-base-300"
    }`;

const DashboardLayout = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector( useCurrentUser )
    const closeDrawer = () => {
        const drawer = document.getElementById( "dashboard-drawer" ) as HTMLInputElement | null;
        if ( drawer ) drawer.checked = false;
    };

    const handleLogOut = () => {
        dispatch( logOut() )
    }


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
                        <h2 className="text-xl font-bold uppercase">{user?.role} Dashboard</h2>
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
                    <h3 className="text-2xl font-bold mb-6">Care Home</h3>

                    <ul className="menu space-y-1">

                        {/* Dashboard Home */}
                        <li>
                            <NavLink className={navLinkClass} to="/dashboard" end onClick={closeDrawer}>
                                📊 Dashboard Home
                            </NavLink>
                        </li>

                        {/* Role Based Links */}
                        {NAV_CONFIG[ user?.role || "" ]?.map( ( item ) => (
                            <li key={item.path}>
                                <NavLink
                                    className={navLinkClass}
                                    to={item.path}
                                    onClick={closeDrawer}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    {item.label}
                                </NavLink>
                            </li>
                        ) )}

                        {/* Common Links */}
                        <li>
                            <NavLink className={navLinkClass} to="/dashboard/profile" onClick={closeDrawer}>
                                👤 Profile
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                className={navLinkClass}
                                to="/dashboard/change-password"
                                onClick={closeDrawer}
                            >
                                <FiKey className="mr-2 text-lg" />
                                Change Password
                            </NavLink>
                        </li>
                        <div className="divider"></div>
                        <li>
                            <NavLink to="/" onClick={closeDrawer}>
                                🏠 Back to Home
                            </NavLink>
                        </li>

                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;