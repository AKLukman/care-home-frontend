import { Controller, useFormContext } from "react-hook-form";

type CareInputProps = {
    name: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
};

const CareHomeInput = ( {
    name,
    label,
    type = "text",
    placeholder,
    required = false,
}: CareInputProps ) => {
    const { control } = useFormContext();

    return (
        <div className="form-control w-full">
            {label && (
                <label className="label" htmlFor={name}>
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
                            {...field}
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            aria-required={required}
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

export default CareHomeInput;