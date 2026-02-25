import { useParams } from "react-router-dom";
import MarChart from "./MarChart";
import { useGetPatientByIdQuery } from "../../../redux/features/admin/patientManagementApi";
import CareHomeCalendar from "../../../components/Form/CareHomeCalender";
import { useGetAllMediRecordQuery } from "../../../redux/features/admin/medicationRecordApi";
import { useState } from "react";


const MedicationRecord = () => {
    const { id } = useParams<{ id: string }>();
    const [ date, setDate ] = useState<string>( "" )


    const { data, isLoading, isError } = useGetAllMediRecordQuery(
        date
            ? [


                {
                    name: "patient",
                    value: id,
                },
                {
                    name: "date",
                    value: date,
                },
            ]
            : undefined
    );

    const { data: patient } = useGetPatientByIdQuery( id )
    if ( isLoading ) {
        return <p className="text-sm text-gray-500">Loading medication records...</p>;
    }

    if ( isError ) {
        return <p className="text-error">Failed to load medication records</p>;
    }

    const handleDateSelect = ( date: string ) => {
        const newDate = new Date( date ).toISOString()
        setDate( newDate )
    }
    return (
        <div className="space-y-4">
            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold">Medication Administration Record</h2>
                {/* <p className="text-sm text-gray-500">
                    Today’s medication schedule
                </p> */}
                <p>
                    <strong>Patient Name: </strong> <span>{patient?.data?.name.firstName} {patient?.data?.name.middleName} {patient?.data?.name.lastName}</span>
                </p>
                <div>
                    <CareHomeCalendar onSelectDate={handleDateSelect}></CareHomeCalendar>
                </div>
                {/* <p><strong>Today: </strong>{dateFormat( today )}</p> */}
            </div>

            {/* MAR Chart */}
            <div className="pb-20"><MarChart records={data?.data || []} /></div>

        </div>
    )
}

export default MedicationRecord


