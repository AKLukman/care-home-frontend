import { toast } from "sonner";
import CareHomeForm from "../../../../components/Form/CareHomeForm"
import CareHomeModal from "../../../../components/Modal/CareHomeModal"
import type { TResponse } from "../../../../types/global";
import type { FieldValues } from "react-hook-form";
import { useAddScheduleMutation } from "../../../../redux/features/admin/medicationScheduleApi";
import CareHomeSelect from "../../../../components/Form/CareHomeSelect";
import { useGetAllMedicationQuery } from "../../../../redux/features/admin/medicationMangementApi";
import CareHomeDatePicker from "../../../../components/Form/CareHomeDatePicker";
import MedicationDoseFields from "../../../../components/Form/DoseInput";
type Props = {
    open: boolean;
    onClose: () => void;
    patientId: string;
};


const CreateSchedule = ( { open, onClose, patientId }: Props ) => {
    const [ addSchedule, { isLoading } ] = useAddScheduleMutation();
    const { data } = useGetAllMedicationQuery( undefined )
    const medications = data?.data ?? [];

    const medicationOptions = medications.map( med => ( {
        label: `${ med.name } ${ med.strength }`,
        value: med._id,
    } ) );


    const onSubmit = async ( data: FieldValues ) => {
        const formData = {
            ...data,
            doses: data.doses?.length
                ? data.doses
                : [ { time: "BREAKFAST", dose: 1 } ],
            patient: patientId,
            medication: data.medication,
            startDate: new Date( data.startDate ),
            endDate: new Date( data.endDate )
        }
        console.log( formData )



        const toastId = toast.loading( "Creating..." );

        try {
            const res = ( await addSchedule( formData ) ) as TResponse<string>;


            if ( res.error ) {
                toast.error( res.error.data.message, { id: toastId } );
            } else {
                toast.success( "Medication Schedule created successfully!", { id: toastId } );
                onClose();
            }
        } catch {
            toast.error( "Something went wrong!", { id: toastId } );
        }
    };


    return (
        <CareHomeModal title="Create Medication Schedule" open={open}
            onClose={onClose} >
            <CareHomeForm onSubmit={onSubmit}  >

                <CareHomeSelect name="medication" label="Medicine name" required options={medicationOptions}></CareHomeSelect>

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
                        {isLoading ? "Creating..." : "Create Medication"}
                    </button>
                </div>

            </CareHomeForm>

        </CareHomeModal>
    )
}

export default CreateSchedule
