const DashboardStats = () => {
    return (
        <div className="stats shadow w-full bg-base-100 rounded-2xl">
            <div className="stat">
                <div className="stat-title">Total Residents</div>
                <div className="stat-value text-primary">52</div>
                <div className="stat-desc">+2 this week</div>
            </div>

            <div className="stat">
                <div className="stat-title">Staff On Duty</div>
                <div className="stat-value text-secondary">18</div>
                <div className="stat-desc">Current shift</div>
            </div>

            <div className="stat">
                <div className="stat-title">Medications Today</div>
                <div className="stat-value">142</div>
                <div className="stat-desc">Scheduled doses</div>
            </div>

            <div className="stat">
                <div className="stat-title">Pending Reports</div>
                <div className="stat-value text-error">3</div>
                <div className="stat-desc">Needs review</div>
            </div>
        </div>
    );
};

export default DashboardStats;