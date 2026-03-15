import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Admin from "../pages/Dashboard/Admin/Admin";
import CareWoker from "../pages/Dashboard/Admin/CareWorker/CareWoker";
import CareWorkerDetails from "../pages/Dashboard/Admin/CareWorker/CareWorkerDetails";
import Patient from "../pages/Dashboard/Admin/Patient/Patient";
import Medication from "../pages/Dashboard/Admin/Medication/Medication";
import PatientDetails from "../pages/Dashboard/Admin/Patient/PatientDetails";
import MedicationRecord from "../pages/Dashboard/MedicationRecord/MedicationRecord";
import Profile from "../pages/Dashboard/Profile/Profile";
import ChangePassword from "../pages/Dashboard/Profile/ChangePassword";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import AdminRoute from "./AdminRoute";
import PriavateRoutes from "./PrivateRoutes";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";



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
                path: "login",
                element: <Login></Login>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword></ForgotPassword>
            },
            {
                path: "auth/reset-password",
                element: <ResetPassword></ResetPassword>
            },
            {
                path: "*",
                Component: NotFound
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PriavateRoutes><DashboardLayout></DashboardLayout></PriavateRoutes>,
        children: [
            {
                path: "profile",
                element: <Profile></Profile>
            },
            {
                path: "change-password",
                element: <ChangePassword></ChangePassword>
            },
            {
                path: "",
                element: <AdminHome></AdminHome>
            },
            {
                path: "admin",
                element: <AdminRoute><Admin></Admin></AdminRoute>
            },
            {
                path: "care-worker",
                element: <AdminRoute><CareWoker></CareWoker></AdminRoute>
            },

            {
                path: "care-worker/:id",
                element: <AdminRoute><CareWorkerDetails></CareWorkerDetails></AdminRoute>
            },
            {
                path: "patient",
                element: <Patient></Patient>
            },
            {
                path: "patient/:id",
                element: <PatientDetails></PatientDetails>
            },
            {
                path: "medications",
                element: <Medication></Medication>
            },
            {
                path: "patient/medications-records/:id",
                element: <MedicationRecord></MedicationRecord>
            },
        ]
    },

] )