import type { FieldValues } from "react-hook-form"
import CareHomeForm from "../../../../components/Form/CareHomeForm"
import CareHomeModal from "../../../../components/Modal/CareHomeModal"
import { toast } from "sonner";
import type { TResponse } from "../../../../types/global";
import { useAddScheduleMutation } from "../../../../redux/features/admin/medicationScheduleApi";
import { useGetAllMedicationQuery } from "../../../../redux/features/admin/medicationMangementApi";
import CareHomeDatePicker from "../../../../components/Form/CareHomeDatePicker";
import MedicationDoseFields from "../../../../components/Form/DoseInput";
import CareHomeSelect from "../../../../components/Form/CareHomeSelect";

type Props = {
    open: boolean;
    onClose: () => void;
    medicationScheduleId: string;
};
const EditMedicationSchedule = ( { open, onClose, medicationScheduleId }: Props ) => {
    const [ addSchedule, { isLoading } ] = useAddScheduleMutation();
    const { data } = useGetAllMedicationQuery( undefined )
    const medications = data?.data ?? [];

    const medicationOptions = medications.map( med => ( {
        label: `${ med.name } ${ med.strength }`,
        value: med._id,
    } ) );


    const onSubmit = async ( data: FieldValues ) => {

        const toastId = toast.loading( "Creating..." );

        try {
            const res = ( await addSchedule( data ) ) as TResponse<string>;
            console.log( res )

            if ( res.error ) {
                toast.error( res.error.data.message, { id: toastId } );
            } else {
                toast.success( "Medication Schedule updated successfully!", { id: toastId } );
                onClose();
            }
        } catch {
            toast.error( "Something went wrong!", { id: toastId } );
        }
    };

    const defaultValues = {
        medication: "am",
        startDate: "12/22/22"
    }
    return (
        <CareHomeModal title="Update Medication Schedule" open={open}
            onClose={onClose} >
            <div>{medicationScheduleId}</div>
            <CareHomeForm onSubmit={onSubmit} defaultValues={defaultValues} >

                <CareHomeSelect name="medication" label="Medicine name" options={medicationOptions} required></CareHomeSelect>

                <CareHomeDatePicker name="startDate" label="Start Date" required></CareHomeDatePicker>
                <CareHomeDatePicker name="endDate" label="End Date" required></CareHomeDatePicker>
                <MedicationDoseFields></MedicationDoseFields>

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
                        className="btn btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Upadte Medication"}
                    </button>
                </div>

            </CareHomeForm>

        </CareHomeModal>
    )
}

export default EditMedicationSchedule
