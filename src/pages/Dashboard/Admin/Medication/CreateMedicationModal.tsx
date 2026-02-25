import { type FieldValues } from "react-hook-form"
import type { TResponse } from "../../../../types/global"
import { toast } from "sonner"
import CareHomeForm from "../../../../components/Form/CareHomeForm"
import CareHomeInput from "../../../../components/Form/CareHomeInput"
import { useAddMedicationMutation } from "../../../../redux/features/admin/medicationMangementApi"
import CareHomeSelect from "../../../../components/Form/CareHomeSelect"
import { MEDICATIONSFORM_OPTIONS } from "../../../../types/medicationTypes"




type Props = {
    open: boolean
    onClose: () => void
}

const defaultValues = {
    name: "",
    form: "",
    strength: "",
    description: "",
}


const CreateMedicationModal = ( { open, onClose }: Props ) => {
    const [ addMedicine, { isLoading } ] = useAddMedicationMutation()



    const onSubmit = async ( data: FieldValues ) => {

        console.log( data )
        const toastId = toast.loading( "Creating..." );

        try {
            const res = ( await addMedicine( data ) ) as TResponse<string>;
            if ( res.error ) {
                toast.error( res?.error?.data.message, { id: toastId } );
            } else {
                toast.success( "Medicine created successfully!", { id: toastId } );
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
                    <h3 className="text-xl font-bold uppercase">Create Medicine</h3>
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
                            <CareHomeInput name="name" label="Medicine Name" placeholder="Medicine Name" type="text" required></CareHomeInput>

                            <CareHomeSelect name="form" options={MEDICATIONSFORM_OPTIONS} label="Medicine Form" required></CareHomeSelect>

                            <CareHomeInput name="strength" label="Medicine Strength" placeholder="Medicine Strength" type="text" required></CareHomeInput>
                        </div>
                        <CareHomeInput name="description" label="Medicine Description" placeholder="Medicine Description" type="text"></CareHomeInput>
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
                                {isLoading ? "Creating..." : "Create Medicine"}
                            </button>
                        </div>
                    </CareHomeForm>

                </div>
            </div>
        </dialog>
    )
}

export default CreateMedicationModal
