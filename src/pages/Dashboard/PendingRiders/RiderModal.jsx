const RiderModal = ( { rider, onClose } ) => {

    const calculateAge = ( dob ) => {
        if ( !dob ) return "N/A";

        const birthDate = new Date( dob );
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
            monthDiff < 0 ||
            ( monthDiff === 0 && today.getDate() < birthDate.getDate() )
        ) {
            age--;
        }

        return age;
    };

    return (
        <dialog open className="modal">
            <div className="modal-box max-w-2xl">
                <h3 className="font-bold text-xl mb-4">
                    🚴 Rider Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Info label="Name" value={rider.name} />
                    <Info label="Email" value={rider.email} />
                    <Info label="Phone" value={rider.phone} />
                    <Info label="DOB" value={rider.dateOfBirth} />
                    <Info
                        label="Age"
                        value={`${ calculateAge( rider.dateOfBirth ) } years`}
                    />
                    <Info label="Region" value={rider.region} />
                    <Info label="District" value={rider.district} />
                    <Info label="Bike Number" value={rider.bikeNumber} />
                    <Info label="NID" value={rider.nidNumber} />
                    <Info label="Status" value={rider.status} />
                </div>

                <div className="modal-action">
                    <button className="btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    );
};

const Info = ( { label, value } ) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold">{value || "N/A"}</p>
    </div>
);

export default RiderModal;
