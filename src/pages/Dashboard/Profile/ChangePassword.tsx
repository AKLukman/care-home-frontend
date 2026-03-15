import { toast } from "sonner";
import { FiLock } from "react-icons/fi";
import CareHomeForm from "../../../components/Form/CareHomeForm";
import CareHomePasswordInput from "../../../components/Form/CareHomePasswordField";
import type { FieldValues } from "react-hook-form";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";
import { logOut } from "../../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";


const ChangePassword = () => {
    const [ changePassword, { isLoading } ] = useChangePasswordMutation();
    const dispatch = useAppDispatch()
    const onSubmit = async ( data: FieldValues ) => {
        const { oldPassword, newPassword, confirmPassword } = data;

        // Check required
        if ( !oldPassword || !newPassword || !confirmPassword ) {
            toast.error( "All fields are required" );
            return;
        }

        // Minimum length check
        if ( newPassword.length < 6 ) {
            toast.error( "New password must be at least 6 characters" );
            return;
        }

        // Confirm password match check
        if ( newPassword !== confirmPassword ) {
            toast.error( "New password and confirm password do not match" );
            return;
        }

        // Prevent same password reuse
        if ( oldPassword === newPassword ) {
            toast.error( "New password cannot be the same as old password" );
            return;
        }

        try {
            const res = await changePassword( {
                oldPassword,
                newPassword,
            } );

            if ( res?.data?.success ) {
                toast.success( "Password updated successfully" );
                dispatch( logOut() )

            }
        } catch {
            toast.error( "Failed to update password" );
        }
    };



    return (
        <div className="min-h-[70vh] flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white border rounded-3xl shadow-lg p-8">

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                        <FiLock />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Change Password
                    </h2>
                </div>

                <CareHomeForm onSubmit={onSubmit}>

                    <CareHomePasswordInput required name="oldPassword" label="Current Password"></CareHomePasswordInput>
                    <CareHomePasswordInput required name="newPassword" label="New Password"></CareHomePasswordInput>
                    <CareHomePasswordInput required name="confirmPassword" label="Confirm Password"></CareHomePasswordInput>

                    <button
                        type="submit"
                        // disabled={isLoading}
                        className="w-full rounded-xl bg-indigo-600 text-white py-2.5 text-sm font-medium transition hover:bg-indigo-700 disabled:opacity-60 cursor-pointer"
                    >
                        {isLoading ? "Updating..." : "Update Password"}

                    </button>
                </CareHomeForm>
            </div>
        </div>
    );
};

export default ChangePassword;
