const StaffOnDuty = () => {
    return (
        <div className="card bg-base-100 shadow">
            <div className="card-body">
                <h2 className="card-title">Staff On Duty</h2>

                <ul className="space-y-3 mt-4">
                    <li className="flex justify-between">
                        <span>Nurse Anna</span>
                        <span className="badge badge-primary">RN</span>
                    </li>

                    <li className="flex justify-between">
                        <span>David Lee</span>
                        <span className="badge badge-secondary">Caregiver</span>
                    </li>

                    <li className="flex justify-between">
                        <span>Emily Ross</span>
                        <span className="badge badge-primary">RN</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default StaffOnDuty;