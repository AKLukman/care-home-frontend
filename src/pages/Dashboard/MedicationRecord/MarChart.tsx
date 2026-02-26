import { Fragment } from "react";
import type { TMarRecord, TMedicationTime } from "../../../types/medicationRecordTypes";
import { useUpdateStatusMutation } from "../../../redux/features/admin/medicationRecordApi";
import { toast } from "sonner";
import dateFormat, { dateAndTimeFormat } from "../../../utils/dateFormat";

type MarChartProps = {
    records: TMarRecord[];
};

const TIME_ORDER: TMedicationTime[] = [
    "BREAKFAST",
    "LUNCH",
    "TEA",
    "DINNER",
];

const MarChart = ( { records }: MarChartProps ) => {
    const [ updateStatus ] = useUpdateStatusMutation();

    if ( !records.length ) {
        return (
            <div className="text-sm text-gray-500">
                No medication scheduled for today.
            </div>
        );
    }

    // Group records by date (YYYY-MM-DD)
    const groupedByDate = records.reduce<Record<string, TMarRecord[]>>(
        ( acc, record ) => {
            const dateKey = record.date.split( "T" )[ 0 ];
            acc[ dateKey ] = acc[ dateKey ] || [];
            acc[ dateKey ].push( record );
            return acc;
        },
        {}
    );

    // Sort dates descending (latest first)
    const sortedDates = Object.keys( groupedByDate ).sort(
        ( a, b ) => new Date( b ).getTime() - new Date( a ).getTime()
    );

    type StatusBadgeProps = {
        status: "PENDING" | "TAKEN" | "MISSED";
    };

    const StatusBadge = ( { status }: StatusBadgeProps ) => {
        const map = {
            PENDING: "badge-warning",
            TAKEN: "badge-success",
            MISSED: "badge-error",
        };

        return (
            <span className={`badge badge-sm ${ map[ status ] }`}>
                {status}
            </span>
        );
    };

    const update = async ( status: string, id: string ) => {
        try {
            const res = await updateStatus( { data: { status }, id } );

            if ( res?.data?.success ) {
                toast.success( "Medication status updated successfully!" );
            }
        } catch ( error ) {
            console.error( error );
            toast.error( "Failed to update medication status." );
        }
    };

    return (
        <div className="overflow-x-auto rounded-lg border">
            <table className="table w-full">
                <tbody>
                    {sortedDates.map( ( date ) => {
                        // Sort records by fixed TIME_ORDER
                        const sortedRecords = [ ...groupedByDate[ date ] ].sort(
                            ( a, b ) =>
                                TIME_ORDER.indexOf( a.time as TMedicationTime ) -
                                TIME_ORDER.indexOf( b.time as TMedicationTime )
                        );

                        return (
                            <Fragment key={date}>
                                {/* Date Header */}
                                <tr className="bg-gray-100">
                                    <td colSpan={4} className="font-semibold">
                                        {dateFormat( date )}
                                    </td>
                                    <td>Updated by</td>
                                </tr>

                                {/* Records */}
                                {sortedRecords.map( ( record ) => (
                                    <tr key={record._id}>
                                        <td>
                                            {record.medication ? (
                                                <>
                                                    <div className="font-medium">
                                                        {record.medication.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {record.medication.strength} ·{" "}
                                                        {record.medication.form}
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="text-gray-400">
                                                    No medication
                                                </span>
                                            )}
                                        </td>

                                        <td>{record.time}</td>

                                        <td>Dose: {record.dose}</td>

                                        <td>
                                            {record.status === "TAKEN" ? (
                                                <StatusBadge status={record.status} />
                                            ) : (
                                                <select
                                                    value={record.status}
                                                    onChange={( e ) =>
                                                        update( e.target.value, record._id )
                                                    }
                                                    className="text-sm border rounded px-2 py-1"
                                                >
                                                    <option value="PENDING">PENDING</option>
                                                    <option value="TAKEN">TAKEN</option>
                                                    <option value="MISSED">MISSED</option>
                                                </select>
                                            )}
                                        </td>

                                        <td>
                                            <strong>
                                                {record?.administeredBy?.name?.firstName}{" "}
                                                {record?.administeredBy?.name?.middleName}{" "}
                                                {record?.administeredBy?.name?.lastName}
                                            </strong>
                                            <br />
                                            <span>{dateAndTimeFormat( record?.updatedAt )}</span>
                                        </td>
                                    </tr>
                                ) )}
                            </Fragment>
                        );
                    } )}
                </tbody>
            </table>
        </div>
    );
};

export default MarChart;
