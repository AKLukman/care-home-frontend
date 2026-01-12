import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router"
import SocialLogin from "../SocialLogin/SocialLogin"
import useAuth from "../../../hooks/useAuth"


const Login = () => {
    const { signInUser } = useAuth()
    const location = useLocation()
    const from = location.state?.from || "/"
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = ( data ) => {
        signInUser( data.email, data.password )
            .then( res => {
                console.log( res.user )
                navigate( from )
            } )
            .ctach( error => console.log( error ) )
    }
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

            <div className="card-body">
                <h2 className="text-3xl font-bold">Login now!</h2>
                <form onSubmit={handleSubmit( onSubmit )}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" {...register( "email", { required: true } )} className="input" placeholder="Email" />
                        {errors?.email && <p role="alert" className="text-red-700" >Email is required</p>}
                        <label className="label">Password</label>
                        <input type="password" {...register( "password", { required: true, minLength: 6 } )} className="input" placeholder="Password" />
                        {
                            errors.password?.type === "required" && <p className="text-red-700">Password is required</p>
                        }

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button type='submit' className="btn bg-primary mt-4 uppercase font-extrabold">Login</button>
                        <p><small>New to this website?</small><Link className="text-blue-700 font-extrabold" to="/register">Register</Link></p>
                    </fieldset>

                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    )
}

export default Login
