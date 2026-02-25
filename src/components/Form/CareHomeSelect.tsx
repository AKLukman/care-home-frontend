import { Controller, useFormContext } from "react-hook-form";

type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

type CareHomeSelectProps = {
    name: string;
    label?: string;
    options?: SelectOption[];
    disabled?: boolean;
    placeholder?: string;
    required?: boolean;
};


const CareHomeSelect = ( {
    name,
    label,
    options = [],
    disabled = false,
    required = false,
}: CareHomeSelectProps ) => {
    const { control } = useFormContext();

    return (
        <div className="form-control w-full cursor-pointer">
            {label && (
                <label className="label">
                    <span className="label-text font-medium">
                        {label}
                        {required && (
                            <span className="text-error ml-1">*</span>
                        )}
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
                        <select
                            {...field}
                            disabled={disabled}
                            aria-required={required}
                            className={`select select-bordered w-full ${ fieldState.error ? "select-error" : ""
                                }`}
                        >
                            {/* Placeholder / Label */}
                            <option value="" hidden>
                                {label}
                            </option>

                            {options.map( ( option ) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                    disabled={option.disabled}
                                >
                                    {option.label}
                                </option>
                            ) )}
                        </select>

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


export default CareHomeSelect;
