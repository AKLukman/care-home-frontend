const AlertsPanel = () => {
    return (
        <div className="card bg-base-100 shadow">
            <div className="card-body">
                <h2 className="card-title text-error">Alerts</h2>

                <div className="space-y-3">
                    <div className="alert alert-warning text-sm">
                        2 medications overdue
                    </div>

                    <div className="alert alert-error text-sm">
                        Incident report pending approval
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlertsPanel;