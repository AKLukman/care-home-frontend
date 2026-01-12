import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Authentications/Login/Login";
import AuthLayouts from "../layouts/AuthLayouts";
import Register from "../pages/Authentications/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import PriavateRoutes from "../routes/PriavateRoutes";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory/PaymentHistory";
import Profile from "../pages/Dashboard/Profile/Profile";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import BeARider from "../pages/Dashboard/Rider/BeARider/BeARider";
import PendingRiders from "../pages/Dashboard/PendingRiders/PendingRiders";


export const router = createBrowserRouter( [
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "coverage",
                Component: Coverage
            },
            {
                path: "sendParcel",
                element: <PriavateRoutes><SendParcel></SendParcel></PriavateRoutes>,
                loader: () => fetch( '/serviceCenters.json' ).then( res => res.json() )
            },
            {
                path: "be-a-rider",
                element: <PriavateRoutes><BeARider></BeARider></PriavateRoutes>
            }
        ]
    }, {
        path: "/",
        Component: AuthLayouts,
        children: [
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PriavateRoutes><DashboardLayout></DashboardLayout></PriavateRoutes>,
        children: [
            {
                path: "",
                element: <Dashboard></Dashboard>
            },
            {
                path: "my-parcels",
                element: <MyParcels></MyParcels>
            },
            {
                path: "payment/:parcelId",
                element: <Payment></Payment>
            },
            {
                path: "payment-history",
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: "riders/pending",
                element: <PendingRiders></PendingRiders>
            },
            {
                path: "profile",
                element: <Profile></Profile>
            },
        ]
    }

] )