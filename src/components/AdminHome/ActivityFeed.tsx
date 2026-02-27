const ActivityFeed = () => {
    return (
        <div className="card bg-base-100 shadow">
            <div className="card-body">
                <h2 className="card-title">Recent Activity</h2>

                <ul className="timeline timeline-vertical mt-6">
                    <li>
                        <div className="timeline-start">09:30 AM</div>
                        <div className="timeline-middle">•</div>
                        <div className="timeline-end">
                            Medication administered to Mary Smith
                        </div>
                    </li>

                    <li>
                        <div className="timeline-start">08:45 AM</div>
                        <div className="timeline-middle">•</div>
                        <div className="timeline-end">
                            New resident admitted
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ActivityFeed;