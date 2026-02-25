/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues } from "react-hook-form";
import CareHomeForm from "../../components/Form/CareHomeForm";
import CareHomeInput from "../../components/Form/CareHomeInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { verifyToken } from "../../utils/verifyToken";
import { setUser, type TUser } from "../../redux/features/auth/authSlice";
import { useState } from "react";

const Login = () => {
    const dispatch = useAppDispatch();
    const [ loginError, setLoginError ] = useState( "" )
    const [ login ] = useLoginMutation()
    const location = useLocation()
    const from = location.state?.from || "/"
    const navigate = useNavigate()
    const defaultValues = {
        email: "",
        password: "",
    };
    const onSubmit = async ( data: FieldValues ) => {
        const toastId = toast.loading( "Logging in" );

        try {
            const userInfo = {
                email: data.email,
                password: data.password
            }

            const res = await login( userInfo ).unwrap()
            const user = verifyToken( res.data.accessToken ) as TUser;
            toast.success( "Logged in", { id: toastId, duration: 2000 } );
            dispatch( setUser( { user: user, token: res.data.accessToken } ) );
            toast.success( "Logged in", { id: toastId, duration: 2000 } );
            if ( user ) {
                navigate( from );
            } else {
                navigate( `/` );
            }

        } catch ( error: any ) {
            toast.error(
                error?.data?.message || "Invalid email or password",
                { id: toastId }
            );
            setLoginError( error?.data?.message )
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="w-full max-w-md">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">

                        {/* Header */}
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-primary">
                                Welcome Back
                            </h2>
                            <p className="text-sm text-base-content/70 mt-1">
                                Sign in to continue to Care Home
                            </p>
                        </div>




                        {/* Form */}
                        <CareHomeForm onSubmit={onSubmit} defaultValues={defaultValues}>
                            <CareHomeInput
                                name="email"
                                label="Email Address"
                                type="email"
                                placeholder="Enter your email"
                                required
                            />

                            <CareHomeInput
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                required
                            />
                            <div>
                                <p className="text-red-500">{loginError}</p>
                            </div>

                            {/* Extra actions */}
                            <div className="flex justify-between items-center text-sm mt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-sm" />
                                    Remember me
                                </label>

                                <Link to='/forgot-password' className="link link-hover text-primary">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-6"
                            >
                                Login
                            </button>
                        </CareHomeForm>

                    </div>
                </div>


            </div>
        </div>
    );
};

export default Login;
