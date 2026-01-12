// src/components/Benefits.jsx
import React from "react";
import Benefit1 from "../../../assets/live-tracking.png";
import Benefit2 from "../../../assets/safe-delivery.png";
import Benefit3 from "../../../assets/safe-delivery.png";

const benefits = [
    {
        image: Benefit1,
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
        image: Benefit2,
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
        image: Benefit3,
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
];

const Benefits = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="space-y-8">
                    {benefits.map( ( benefit, index ) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row items-start bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Left: Image + Vertical Line */}
                            <div className="flex md:items-center md:gap-12 relative">
                                <img
                                    src={benefit.image}
                                    alt={benefit.title}
                                    className="h-32 w-auto object-contain"
                                />
                                {/* Vertical dashed line */}
                                <div className="hidden md:block border-r-2 border-dashed border-gray-300 h-32"></div>
                            </div>

                            {/* Right: Title & Description */}
                            <div className="md:pl-12 flex-1 text-left mt-4 md:mt-0">
                                <h3 className="text-2xl font-extrabold mb-2 text-[#03373D]">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        </div>
                    ) )}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
