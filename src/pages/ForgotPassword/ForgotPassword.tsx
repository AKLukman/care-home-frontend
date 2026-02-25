/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "sonner";
import { FiMail } from "react-icons/fi";
import CareHomeForm from "../../components/Form/CareHomeForm";
import CareHomeInput from "../../components/Form/CareHomeInput";
import type { FieldValues } from "react-hook-form";
import { useForgotPasswordMutation } from "../../redux/features/auth/authApi";


const ForgotPassword = () => {
    const [ forgotPassword, { isLoading } ] = useForgotPasswordMutation();



    const onSubmit = async ( data: FieldValues ) => {
        const toastId = toast.loading( "Sending reset link..." );

        try {
            const res = await forgotPassword( { email: data.email } ).unwrap();

            toast.success(
                res?.message || "Password reset link sent to your email",
                { id: toastId }
            );

        } catch ( error: any ) {
            toast.error(
                error?.data?.message || "Failed to send reset link",
                { id: toastId }
            );
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6 bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border p-8">

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                        <FiMail />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Forgot Password
                    </h2>
                </div>

                <p className="text-sm text-gray-500 mb-6">
                    Enter your email address and we’ll send you a link to reset your password.
                </p>

                <CareHomeForm onSubmit={onSubmit}>

                    <CareHomeInput placeholder="Enter your email address" type="email" name="email" label="Email" required></CareHomeInput>

                    <button
                        type="submit"
                        // disabled={isLoading}
                        className="w-full rounded-xl bg-indigo-600 text-white py-2.5 text-sm font-medium transition hover:bg-indigo-700 disabled:opacity-60 cursor-pointer"
                    >
                        {isLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                </CareHomeForm>
            </div>
        </div>
    );
};

export default ForgotPassword;

