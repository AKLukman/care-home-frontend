import React from "react";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";
import Logo from "../pages/Shared/Logo/Logo";

const AuthLayouts = () => {
    return (
        <div className="min-h-screen bg-base-200 flex flex-col">

            {/* Logo */}
            <div className="px-4 py-6 sm:px-8">
                <Logo />
            </div>

            {/* Main Content */}
            <div className="flex flex-1 items-center justify-center px-4 sm:px-8">
                <div className="w-full max-w-6xl">
                    <div className="flex flex-col-reverse lg:flex-row items-center gap-10">

                        {/* Form / Outlet */}
                        <div className="w-full lg:w-1/2">
                            <Outlet />
                        </div>

                        {/* Image */}
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <img
                                src={authImage}
                                alt="Authentication"
                                className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg shadow-2xl object-contain"
                            />
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default AuthLayouts;
