import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const regions = {
    Dhaka: [ "Dhaka", "Gazipur", "Narayanganj" ],
    Chattogram: [ "Chattogram", "Cox's Bazar" ],
    Rajshahi: [ "Rajshahi", "Bogura" ],
};

const BeARider = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const selectedRegion = watch( "region" );

    const onSubmit = async ( data ) => {
        const riderInfo = {
            name: user?.displayName,
            email: user?.email,
            dateOfBirth: data.dateOfBirth,
            region: data.region,
            district: data.district,
            nidNumber: data.nidNumber,
            bikeNumber: data.bikeNumber,
            bikeType: data.bikeType,
            phone: data.phone,
            status: "pending",
            appliedAt: new Date(),
        };

        try {
            const res = await axiosSecure.post( "/riders", riderInfo );


            if ( res.data.riderId ) {
                toast.success( "Rider application submitted" );
                reset();
            }
        } catch ( error ) {
            toast.error( "Failed to submit application", error );
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-base-100 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Become a Rider
            </h2>

            <form onSubmit={handleSubmit( onSubmit )} className="space-y-4">

                {/* Name */}
                <div>
                    <label className="label">Full Name</label>
                    <input
                        type="text"
                        defaultValue={user?.displayName}
                        disabled
                        className="input input-bordered w-full bg-base-200"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="label">Email</label>
                    <input
                        type="email"
                        defaultValue={user?.email}
                        disabled
                        className="input input-bordered w-full bg-base-200"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="label">Phone Number</label>
                    <input
                        type="text"
                        {...register( "phone", { required: true } )}
                        className="input input-bordered w-full"
                        placeholder="01XXXXXXXXX"
                    />
                    {errors.phone && (
                        <p className="text-error text-sm">Phone is required</p>
                    )}
                </div>
                {/* date of birth */}
                <div>
                    <label className="label">
                        <span className="label-text">Date of Birth</span>
                    </label>

                    <input
                        type="date"
                        {...register( "dateOfBirth", {
                            required: true,
                            validate: value => {
                                const age =
                                    new Date().getFullYear() -
                                    new Date( value ).getFullYear();
                                return age >= 18 || "Must be at least 18 years old";
                            }
                        } )}
                        className="input input-bordered w-full"
                    />


                    {errors.dateOfBirth && (
                        <p className="text-error text-sm mt-1">
                            Date of birth is required
                        </p>
                    )}
                </div>


                {/* Region */}
                <div>
                    <label className="label">Region</label>
                    <select
                        {...register( "region", { required: true } )}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Region</option>
                        {Object.keys( regions ).map( ( region ) => (
                            <option key={region} value={region}>
                                {region}
                            </option>
                        ) )}
                    </select>
                </div>

                {/* District */}
                <div>
                    <label className="label">District</label>
                    <select
                        {...register( "district", { required: true } )}
                        className="select select-bordered w-full"
                        disabled={!selectedRegion}
                    >
                        <option value="">Select District</option>
                        {regions[ selectedRegion ]?.map( ( district ) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ) )}
                    </select>
                </div>

                {/* NID */}
                <div>
                    <label className="label">NID Number</label>
                    <input
                        type="text"
                        {...register( "nidNumber", { required: true } )}
                        className="input input-bordered w-full"
                        placeholder="National ID Number"
                    />
                </div>

                {/* Bike Number */}
                <div>
                    <label className="label">Bike Number</label>
                    <input
                        type="text"
                        {...register( "bikeNumber", { required: true } )}
                        className="input input-bordered w-full"
                        placeholder="Bike Registration Number"
                    />
                </div>

                {/* Bike Type */}
                <div>
                    <label className="label">Bike Type</label>
                    <select
                        {...register( "bikeType", { required: true } )}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Bike Type</option>
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Scooter">Scooter</option>
                        <option value="Electric Bike">Electric Bike</option>
                    </select>
                </div>

                {/* Submit */}
                <button className="btn btn-primary w-full text-black mt-4">
                    Apply as Rider
                </button>
            </form>
        </div>
    );
};

export default BeARider;
