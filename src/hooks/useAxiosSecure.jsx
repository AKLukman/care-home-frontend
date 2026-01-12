import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create( {
    baseURL: "http://localhost:5000/api",
} );

const useAxiosSecure = () => {
    const { user } = useAuth();

    useEffect( () => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            ( config ) => {
                if ( user?.accessToken ) {
                    config.headers.authorization = `Bearer ${ user.accessToken }`;
                }
                return config;
            },
            ( error ) => Promise.reject( error )
        );

        return () => {
            axiosSecure.interceptors.request.eject( requestInterceptor );
        };
    }, [ user ] );

    return axiosSecure;
};

export default useAxiosSecure;
