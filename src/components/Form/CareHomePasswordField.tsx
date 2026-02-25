import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

type CarePasswordInputProps = {
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    minLength?: number;
    confirmWith?: string; // field name to match (for confirm password)
};

const CareHomePasswordInput = ( {
    name,
    label,
    placeholder,
    required = false,
    minLength,
    confirmWith,
}: CarePasswordInputProps ) => {
    const { control, watch } = useFormContext();
    const [ show, setShow ] = useState( false );

    const compareValue = confirmWith ? watch( confirmWith ) : undefined;

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
                    ...( minLength && {
                        minLength: {
                            value: minLength,
                            message: `Minimum ${ minLength } characters required`,
                        },
                    } ),
                    ...( confirmWith && {
                        validate: ( value ) =>
                            value === compareValue || "Passwords do not match",
                    } ),
                }}
                render={( { field, fieldState } ) => (
                    <>
                        <div className="relative">
                            <input
                                {...field}
                                id={name}
                                type={show ? "text" : "password"}
                                placeholder={placeholder}
                                className={`input input-bordered w-full pr-12 ${ fieldState.error ? "input-error" : ""
                                    }`}
                            />

                            <button
                                type="button"
                                onClick={() => setShow( !show )}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>

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

export default CareHomePasswordInput;
