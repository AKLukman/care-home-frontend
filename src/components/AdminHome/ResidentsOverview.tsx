const ResidentsOverview = () => {
    return (
        <div className="card bg-base-100 shadow">
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <h2 className="card-title">Recent Residents</h2>
                    <button className="btn btn-sm btn-outline">View All</button>
                </div>

                <div className="overflow-x-auto mt-4">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Room</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mary Smith</td>
                                <td>101</td>
                                <td><span className="badge badge-success">Stable</span></td>
                            </tr>
                            <tr>
                                <td>John Carter</td>
                                <td>203</td>
                                <td><span className="badge badge-warning">Monitoring</span></td>
                            </tr>
                            <tr>
                                <td>Linda Brown</td>
                                <td>305</td>
                                <td><span className="badge badge-success">Stable</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ResidentsOverview;