/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import CareHomeInput from "./CareHomeInput";

export const MedicationTime = [ "BREAKFAST", "LUNCH", "TEA", "DINNER" ] as const;

const MedicationDoseFields = () => {
    const { control, watch, formState, getValues } = useFormContext();

    const { fields, append, remove } = useFieldArray( {
        control,
        name: "doses",
    } );

    const doses = watch( "doses" ) || [];

    // Append first dose only if there are no fields and defaultValues has no doses
    useEffect( () => {
        const defaultDoses = getValues( "doses" );
        if ( ( !fields || fields.length === 0 ) && ( !defaultDoses || defaultDoses.length === 0 ) ) {
            append( { time: "BREAKFAST", dose: 1 } );
        }
        // run only once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    const getAvailableTimes = ( index: number ) => {
        const usedTimes = doses
            .filter( ( _: any, i: number ) => i !== index )
            .map( ( d: any ) => d?.time )
            .filter( Boolean );

        const currentTime = doses?.[ index ]?.time;
        return MedicationTime.filter(
            time => !usedTimes.includes( time ) || time === currentTime
        );
    };

    const handleAdd = () => {
        const usedTimes = doses.map( ( d: any ) => d?.time ).filter( Boolean );
        const nextTime = MedicationTime.find( t => !usedTimes.includes( t ) );
        if ( !nextTime ) return;

        append( { time: nextTime, dose: 1 } );
    };

    return (
        <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Doses</h3>

                <button
                    type="button"
                    className="btn btn-sm btn-outline"
                    onClick={handleAdd}
                    disabled={fields.length >= MedicationTime.length}
                >
                    Add dose
                </button>
            </div>

            {fields.map( ( field, index ) => (
                <div
                    key={field.id}
                    className="grid grid-cols-3 gap-4 mb-3 items-end"
                >
                    {/* TIME */}
                    <Controller
                        name={`doses.${ index }.time`}
                        control={control}
                        rules={{ required: "Time is required" }}
                        render={( { field } ) => (
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Time</span>
                                </label>
                                <select {...field} className="select select-bordered w-full">
                                    {getAvailableTimes( index ).map( time => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ) )}
                                </select>
                            </div>
                        )}
                    />

                    {/* DOSE */}
                    <CareHomeInput
                        name={`doses.${ index }.dose`}
                        label="Dose"
                        type="number"
                        required
                        placeholder="Enter dose"
                    />

                    {/* REMOVE */}
                    <button
                        type="button"
                        className="btn btn-error btn-sm"
                        onClick={() => remove( index )}
                        disabled={fields.length === 1} // disable remove if only one row
                    >
                        Remove
                    </button>
                </div>
            ) )}

            {/* ARRAY LEVEL ERROR */}
            {formState.errors?.doses && (
                <p className="text-error text-sm mt-2">
                    {formState.errors.doses.message as string}
                </p>
            )}
        </div>
    );
};

export default MedicationDoseFields;
