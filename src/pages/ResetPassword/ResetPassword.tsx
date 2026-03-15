/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useSearchParams } from "react-router-dom";
import CareHomeForm from "../../components/Form/CareHomeForm";
import CareHomePasswordInput from "../../components/Form/CareHomePasswordField";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";


const ResetPassword = () => {
    const [ searchParams ] = useSearchParams();
    const [ resetPasswordError, setResetPasswordError ] = useState( "" )
    const email = searchParams.get( "email" ) || "";
    const token = searchParams.get( "token" ) || "";
    const [ resetPassword ] = useResetPasswordMutation()
    const navigate = useNavigate()

    const onSubmit = async ( data: FieldValues ) => {


        if ( data.newPassword !== data.confirmPassword ) {
            toast.error( "Passwords do not match" );
            setResetPasswordError( "Passwords do not match" )
            return;
        };
        const toastId = toast.loading( "Resetting password..." )

        try {
            const res = await resetPassword( { email, token, newPassword: data.newPassword } ).unwrap();


            if ( res?.success ) {
                toast.success( res?.message || "Password has been reset", { id: toastId } );
                setResetPasswordError( "" )
                navigate( "/login" )
            }
        } catch ( error: any ) {
            toast.error( error?.data?.message || "Failed to reset password", { id: toastId } );
            setResetPasswordError( "Passwords do not match" )
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow mb-20">
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            <CareHomeForm onSubmit={onSubmit}>


                <CareHomePasswordInput required name="newPassword" label="New Password" placeholder="New Password"></CareHomePasswordInput>
                <CareHomePasswordInput required name="confirmPassword" label="Confirm Password" placeholder="Confirm Password"></CareHomePasswordInput>

                <div><p className="text-red-500">{resetPasswordError}</p></div>



                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded cursor-pointer hover:bg-blue-600"
                >
                    Reset Password
                </button>
            </CareHomeForm>
        </div>
    );
};

export default ResetPassword;

