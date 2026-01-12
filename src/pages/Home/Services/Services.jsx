// src/components/OurServices.jsx
import React from "react";
import { FaTruck, FaBoxOpen, FaBusinessTime, FaShieldAlt, FaClock, FaMapMarkedAlt } from "react-icons/fa";

const services = [
    {
        icon: <FaTruck />,
        title: "Fast Delivery",
        description: "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.",
    },
    {
        icon: <FaBoxOpen />,
        title: "Secure Packaging",
        description: "All parcels are securely packaged to ensure safe delivery.",
    },
    {
        icon: <FaBusinessTime />,
        title: "Business Shipments",
        description: "From small businesses to large enterprises, we handle all shipments efficiently.",
    },
    {
        icon: <FaShieldAlt />,
        title: "Safe & Reliable",
        description: "Your parcels are handled with care, ensuring safe and timely delivery.",
    },
    {
        icon: <FaClock />,
        title: "On-Time Delivery",
        description: "We value your time and ensure your packages arrive exactly when promised.",
    },
    {
        icon: <FaMapMarkedAlt />,
        title: "Real-Time Tracking",
        description: "Track your parcels anytime with real-time updates from pickup to delivery.",
    },
];

const Services = () => {
    return (
        <section className="py-16 bg-gray-50 mb-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4">Our Services</h2>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>

                <div data-aos="flip-right" className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {services.map( ( service, index ) => (
                        <div
                            key={index}
                            className="card bg-white shadow-lg p-6 flex flex-col items-center text-center transition-colors duration-300 hover:bg-primary/10"
                        >
                            <div className="text-primary text-4xl mb-4">{service.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ) )}
                </div>
            </div>
        </section>
    );
};

export default Services;
