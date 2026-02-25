import { Controller, useFormContext } from "react-hook-form";

type CareDatePickerProps = {
    name: string;
    label?: string;
    required?: boolean;
};

const CareHomeDatePicker = ( {
    name,
    label,
    required = false,
}: CareDatePickerProps ) => {
    const { control } = useFormContext();

    return (
        <div className="form-control w-full">
            {label && (
                <label className="label">
                    <span className="label-text font-medium">
                        {label}
                        {required && <span className="text-error ml-1">*</span>}
                    </span>
                </label>
            )}

            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `${ label || name } is required` : false,
                }}
                render={( { field, fieldState } ) => (
                    <>
                        <input
                            type="date"
                            {...field}
                            value={field.value ?? ""}
                            className={`input input-bordered w-full ${ fieldState.error ? "input-error" : ""
                                }`}
                        />

                        {fieldState.error && (
                            <span className="text-error text-sm mt-1">
                                {fieldState.error.message}
                            </span>
                        )}
                    </>
                )}
            />
        </div>
    );
};

export default CareHomeDatePicker;
