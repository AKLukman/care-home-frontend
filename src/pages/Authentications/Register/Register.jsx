import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../../hooks/useAuth'
import { Link, useLocation, useNavigate } from 'react-router'
import SocialLogin from '../SocialLogin/SocialLogin'
import axios from 'axios'
import useAxiosPublic from '../../../hooks/useAxiosPublic'

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const { createUser, updateUserProfile } = useAuth()
    const location = useLocation();
    const from = location.state?.from || "/";
    const navigate = useNavigate();
    const [ profileUrl, setProfileUrl ] = useState( '' )
    const axiosPublic = useAxiosPublic()




    const onSubmit = async ( data ) => {
        await createUser( data.email, data.password )
            .then( async ( result ) => {


                // update user info in firbase
                const profileInfo = {
                    displayName: data.name,
                    photoURL: profileUrl
                }
                await updateUserProfile( profileInfo )
                    .then( () => {
                        console.log( "Profile name and pic updated" )
                    } )
                    .catch( error => console.log( error ) )

                // update user info on database
                const userInfo = {
                    email: data.email,
                }

                const res = await axiosPublic.post( '/users', userInfo )
                console.log( res.data )


                console.log( result.user )
                navigate( from )
            } )
            .catch( error => {
                console.error( error )
            } )
    }
    const handleImageUpload = async ( e ) => {
        const image = e.target.files[ 0 ];
        const formData = new FormData()
        formData.append( "image", image )
        const imageUrl = `https://api.imgbb.com/1/upload?key=${ import.meta.env.VITE_IMAGEBB_KEY }`
        try {
            const res = await axios.post( imageUrl, formData );
            console.log( res.data );

            // image URL
            const uploadedImageUrl = res.data.data.url;
            setProfileUrl( uploadedImageUrl )

        } catch ( error ) {
            console.error( "Upload failed:", error.response?.data || error.message );
        }
    }
    return (

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

            <div className="card-body">
                <h2 className="text-3xl font-bold">Create an account</h2>
                <form onSubmit={handleSubmit( onSubmit )}>
                    <fieldset className="fieldset">
                        <label className="label">Profile Picture</label>
                        <input
                            onChange={handleImageUpload}
                            type="file"
                            accept="image/*"
                            // {...register( "image" )}
                            className="file-input file-input-bordered w-full"
                        />

                        <label className="label">Your Name</label>
                        <input type="text" {...register( "name", { required: true } )} className="input" placeholder="Your Name" />
                        <label className="label">Email</label>
                        <input type="email" {...register( "email", { required: true } )} className="input" placeholder="Email" />
                        {errors?.email && <p role="alert" className="text-red-700" >Email is required</p>}
                        <label className="label">Password</label>
                        <input type="password" {...register( "password", { required: true, minLength: 6 } )} className="input" placeholder="Password" />
                        {
                            errors.password?.type === "required" && <p className="text-red-700">Password is required</p>
                        }
                        {errors.password?.type === "minLength" && (
                            <p className="text-red-700">Password must be at least 6 characters or longer</p>
                        )}

                        <button type='submit' className="btn  mt-4 bg-primary uppercase font-bold">Register</button>
                    </fieldset>
                    <p><small>Already have an account?</small><Link className="text-blue-700 font-extrabold" to="/login">Login</Link></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>


    )
}

export default Register
