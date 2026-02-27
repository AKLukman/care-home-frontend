const MedicationOverview = () => {
    return (
        <div className="card bg-base-100 shadow">
            <div className="card-body">
                <h2 className="card-title">Today’s Medication Schedule</h2>

                <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                        <span>Breakfast Doses</span>
                        <span className="badge">36</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Lunch Doses</span>
                        <span className="badge">34</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Dinner Doses</span>
                        <span className="badge">38</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicationOverview;