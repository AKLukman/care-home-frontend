import { FaPills, FaUserInjured, FaUserNurse } from "react-icons/fa6";
import { FaUserShield } from "react-icons/fa";

type NavItem = {
    label: string;
    path: string;
    icon?: React.ReactNode;
};

export const NAV_CONFIG: Record<string, NavItem[]> = {
    admin: [
        { label: "Admin", path: "/dashboard/admin", icon: <FaUserShield /> },
        { label: "Care Workers", path: "/dashboard/care-worker", icon: <FaUserNurse /> },
        { label: "Patients", path: "/dashboard/patient", icon: <FaUserInjured /> },
        { label: "Medicine", path: "/dashboard/medications", icon: <FaPills /> },
    ],
    superAdmin: [
        { label: "Admin", path: "/dashboard/admin", icon: <FaUserShield /> },
        { label: "Care Workers", path: "/dashboard/care-worker", icon: <FaUserNurse /> },
        { label: "Patients", path: "/dashboard/patient", icon: <FaUserInjured /> },
        { label: "Medicine", path: "/dashboard/medications", icon: <FaPills /> },
    ],
    careWorker: [
        { label: "My Patients", path: "/dashboard/patient", icon: <FaUserInjured /> },
    ],
};
