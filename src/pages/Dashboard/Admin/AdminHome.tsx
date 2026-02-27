import ActivityFeed from "../../../components/AdminHome/ActivityFeed"
import AlertsPanel from "../../../components/AdminHome/AlertPanel"
import DashboardStats from "../../../components/AdminHome/DashboardStats"
import MedicationOverview from "../../../components/AdminHome/MedicationOverview"
import ResidentsOverview from "../../../components/AdminHome/ResidentsOverview"
import StaffOnDuty from "../../../components/AdminHome/StaffOnDuty"

const AdminHome = () => {
    return (
        <div className="p-6 space-y-8">
            <DashboardStats />

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <ResidentsOverview />
                    <MedicationOverview />
                </div>

                <div className="space-y-6">
                    <AlertsPanel />
                    <StaffOnDuty />
                </div>
            </div>

            <ActivityFeed />
        </div>
    )
}

export default AdminHome
