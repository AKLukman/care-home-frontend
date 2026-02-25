import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";

type CareHomeTagInputProps = {
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
};

const CareHomeTagInput = ( {
    name,
    label,
    placeholder = "Type and press Enter",
    required = false,
}: CareHomeTagInputProps ) => {
    const { control } = useFormContext();
    const [ inputValue, setInputValue ] = useState( "" );

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
                defaultValue={[]}
                rules={{
                    required: required ? `${ label || name } is required` : false,
                }}
                render={( { field, fieldState } ) => {
                    const values: string[] = field.value || [];

                    const handleKeyDown = ( e: KeyboardEvent<HTMLInputElement> ) => {
                        if ( e.key === "Enter" && inputValue.trim() ) {
                            e.preventDefault();

                            if ( !values.includes( inputValue.trim() ) ) {
                                field.onChange( [ ...values, inputValue.trim() ] );
                            }

                            setInputValue( "" );
                        }
                    };

                    const removeTag = ( index: number ) => {
                        const updated = [ ...values ];
                        updated.splice( index, 1 );
                        field.onChange( updated );
                    };

                    return (
                        <>
                            {/* Tag list */}
                            {values.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {values.map( ( tag, index ) => (
                                        <span
                                            key={index}
                                            className="badge badge-outline badge-primary gap-2 px-3 py-2"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                className="ml-1 text-sm"
                                                onClick={() => removeTag( index )}
                                            >
                                                ✕
                                            </button>
                                        </span>
                                    ) )}
                                </div>
                            )}

                            {/* Input */}
                            <input
                                type="text"
                                value={inputValue}
                                onChange={( e ) => setInputValue( e.target.value )}
                                onKeyDown={handleKeyDown}
                                placeholder={placeholder}
                                className={`input input-bordered w-full ${ fieldState.error ? "input-error" : ""
                                    }`}
                            />

                            {fieldState.error && (
                                <span className="text-error text-sm mt-1">
                                    {fieldState.error.message}
                                </span>
                            )}
                        </>
                    );
                }}
            />
        </div>
    );
};

export default CareHomeTagInput;
