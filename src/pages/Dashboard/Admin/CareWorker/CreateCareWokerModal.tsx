import { type FieldValues } from "react-hook-form"
import { useAddCareworkerMutation } from "../../../../redux/features/admin/userManagementApi"
import type { TResponse } from "../../../../types/global"
import { toast } from "sonner"
import CareHomeForm from "../../../../components/Form/CareHomeForm"
import CareHomeInput from "../../../../components/Form/CareHomeInput"
import CareHomeDatePicker from "../../../../components/Form/CareHomeDatePicker"
import CareHomeSelect from "../../../../components/Form/CareHomeSelect"
import { BLOOD_GROUP_OPTIONS, CARE_WORKER_DESIGNATION_OPTIONS, GENDER_OPTIONS } from "../../../../types/userManagementType"



type Props = {
    open: boolean
    onClose: () => void
}

const defaultValues = {
    name: {
        firstName: "",
        middleName: "",
        lastName: "",
    },
    addres: {
        address1: "",
        town: "",
        county: "",
        postcode: ""
    },
    gender: "",
    bloodGroup: "",
    designation: "",
    dateOfBirth: "",
    email: "",
    contactNo: "",
    emergencyContactNo: "",
}


const CreateCareWorkerModal = ( { open, onClose }: Props ) => {
    const [ addCareWorker, { isLoading } ] = useAddCareworkerMutation()



    const onSubmit = async ( data: FieldValues ) => {
        const careWorkerData = {
            careWorker: data
        }
        console.log( { careWorkerData } )
        const formData = new FormData();
        formData.append( "data", JSON.stringify( careWorkerData ) );
        const toastId = toast.loading( "Creating..." );

        try {
            const res = ( await addCareWorker( formData ) ) as TResponse<string>;
            if ( res.error ) {
                toast.error( res?.error?.data.message, { id: toastId } );
            } else {
                toast.success( "Care worker created successfully!", { id: toastId } );
                onClose();

            }
            console.log( res );
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch ( error ) {
            toast.error( "Something went wrong!", { id: toastId } );
        }
    };


    if ( !open ) return null

    return (
        <dialog open className="modal modal-open">
            <div className="modal-box w-full h-full max-w-none rounded-none p-0">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-base-100 border-b px-6 py-4 flex justify-between items-center">
                    <h3 className="text-xl font-bold uppercase">Create Care worker</h3>
                    <button
                        onClick={onClose}
                        className="btn btn-sm btn-circle btn-ghost"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
                    <CareHomeForm onSubmit={onSubmit} defaultValues={defaultValues}>
                        {/* Name */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <CareHomeInput name="name.firstName" label="First Name" placeholder="First Name" type="text" required></CareHomeInput>

                            <CareHomeInput name="name.middleName" label="Middle Name" placeholder="Middle Name" type="text"></CareHomeInput>

                            <CareHomeInput name="name.lastName" label="Last Name" placeholder="Last Name" type="text" required></CareHomeInput>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <CareHomeInput name="email" label="Email" placeholder="Email" type="email" required></CareHomeInput>

                            <CareHomeInput name="password" label="Password" placeholder="Password" type="text"></CareHomeInput>
                            <CareHomeSelect name="designation" required label="Designation" placeholder="Designation" options={CARE_WORKER_DESIGNATION_OPTIONS}></CareHomeSelect>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <CareHomeSelect name="gender" required label="Gender" placeholder="Gender" options={GENDER_OPTIONS}></CareHomeSelect>

                            <CareHomeDatePicker required name="dateOfBirth" label="Date Of Birth" ></CareHomeDatePicker>

                            {/* {/* Blood Group */}
                            <CareHomeSelect name="bloodGroup" label="Blood Group" placeholder="Blood Group" options={BLOOD_GROUP_OPTIONS}></CareHomeSelect>
                        </div>


                        {/* Contact Numbers */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <CareHomeInput name="contactNo" label="Contact Number" placeholder="Contact Number" type="text" required></CareHomeInput>

                            <CareHomeInput name="emergencyContactNo" label="Emergency Contact" placeholder="Emergency Contact" type="text"></CareHomeInput>

                        </div>

                        {/* Address */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <CareHomeInput name="address.address1" label="Address 1" placeholder="Address 1" type="text" required></CareHomeInput>
                            <CareHomeInput name="address.town" label="Town" placeholder="Town" type="text" required></CareHomeInput>
                            <CareHomeInput name="address.county" label="County" placeholder="County" type="text" required></CareHomeInput>
                            <CareHomeInput name="address.postcode" label="Postcode" placeholder="Postcode" type="text" required></CareHomeInput>

                        </div>

                        {/* Actions */}
                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary uppercase"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating..." : "Create care worker"}
                            </button>
                        </div>
                    </CareHomeForm>

                </div>
            </div>
        </dialog>
    )
}

export default CreateCareWorkerModal
