import { useGetMeQuery } from "../../../redux/features/profile/profileManagementApi";
import dateFormat from "../../../utils/dateFormat";

const Profile = () => {
    const { data, isLoading } = useGetMeQuery( undefined );
    const user = data?.data;




    if ( isLoading ) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if ( !user ) {
        return <p className="p-6">No profile data found.</p>;
    }

    const fullName = `${ user?.name?.firstName || "" } ${ user?.name?.middleName || ""
        } ${ user?.name?.lastName || "" }`.trim();

    const formattedAddress = user?.address
        ? [
            user.address.address1,
            user.address.town,
            user.address.county,
            user.address.postcode,
            user.address.country,
        ]
            .filter( Boolean )
            .join( ", " )
        : undefined;


    const initials =
        user?.name?.firstName?.charAt( 0 )?.toUpperCase() +
        user?.name?.lastName?.charAt( 0 )?.toUpperCase();



    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* LEFT PANEL */}
                <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col items-center text-center">
                    {user?.profileImg ? (
                        <img
                            src={user?.profileImg}
                            alt="Profile"
                            className="w-28 h-28 rounded-full object-cover border"
                        />
                    ) : (
                        <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-semibold text-gray-700">
                            {initials}
                        </div>
                    )}

                    <h2 className="mt-4 text-xl font-semibold text-gray-800">
                        {fullName}
                    </h2>

                    <p className="text-sm text-gray-500 capitalize">
                        {user?.user?.role}
                    </p>

                    <div className="mt-4">
                        <span
                            className={`px-3 py-1 text-xs rounded-full ${ user?.user?.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                                }`}
                        >
                            {user?.user?.status}
                        </span>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">
                        Personal Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">

                        <InfoItem label="Email" value={user?.email} />
                        <InfoItem label="Contact Number" value={user?.contactNo} />
                        <InfoItem
                            label="Emergency Contact"
                            value={user?.emergencyContactNo}
                        />
                        <InfoItem label="Date of Birth" value={dateFormat( user?.dateOfBirth )} />
                        <InfoItem label="Gender" value={user?.gender} />
                        <InfoItem label="Address" value={formattedAddress} />



                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ( {
    label,
    value,
}: {
    label: string;
    value?: string;
} ) => {
    return (
        <div>
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-sm font-medium text-gray-800">
                {value || "—"}
            </p>
        </div>
    );
};

export default Profile;
