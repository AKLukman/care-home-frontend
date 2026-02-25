import type { ReactNode } from "react";
import type {
    FieldValues,
    SubmitHandler,
    UseFormProps,
} from "react-hook-form";

import {
    FormProvider,
    useForm,
} from "react-hook-form";

type AppFormProps<T extends FieldValues> = {
    onSubmit: SubmitHandler<T>;
    children: ReactNode;
} & UseFormProps<T>;

const CareHomeForm = <T extends FieldValues>( {
    onSubmit,
    children,
    ...formConfig
}: AppFormProps<T> ) => {
    const methods = useForm<T>( formConfig );

    const submit: SubmitHandler<T> = ( data ) => {
        onSubmit( data );
        methods.reset();
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit( submit )}
                className="space-y-4"
            >
                {children}
            </form>
        </FormProvider>
    );
};

export default CareHomeForm;
