// src/components/CustomerSaying.jsx
import { useState } from "react";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight, FaQuoteRight } from "react-icons/fa";
import customerTop from "../../../assets/customer-top.png"
import { FaUserCircle } from "react-icons/fa";

const testimonials = [
    {

        name: "Rahim Uddin",
        designation: "E-commerce Seller",
        feedback:
            "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
        name: "Nusrat Jahan",
        designation: "Business Owner",
        feedback:
            "Their live tracking and safe delivery system give us complete peace of mind for every shipment.",
    },
    {
        name: "Ayesha Rahman",
        designation: "Online Boutique Owner",
        feedback:
            "Using  Courier has made my business operations much smoother. Their timely deliveries, live tracking, and responsive support team help me serve my customers with confidence every single day.",
    }
];

const CustomerSaying = () => {
    const [ current, setCurrent ] = useState( 0 );
    const t = testimonials[ current ];

    const prev = () =>
        setCurrent( ( c ) => ( c === 0 ? testimonials.length - 1 : c - 1 ) );

    const next = () =>
        setCurrent( ( c ) => ( c === testimonials.length - 1 ? 0 : c + 1 ) );

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">

                {/* OUTSIDE CARD */}
                <div className="text-center mb-12">

                    <img src={customerTop} className="mx-auto mb-4 w-[244px] h-[100px] object-contain" alt="" />
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 text-[#03373D]">
                        What our customers are sayings
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
                    </p>
                </div>

                {/* CARD */}
                <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">

                    {/* 1. Quote */}
                    <FaQuoteRight className="text-4xl text-gray-700 opacity-20 mb-4" />

                    {/* 2. Feedback */}
                    <p className="text-gray-600 leading-relaxed mb-6">
                        {t.feedback}
                    </p>

                    {/* 3. Dashed Line */}
                    <hr className="border-dashed border-gray-300 mb-6" />

                    {/* 4. Customer Profile (LEFT aligned) */}
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                            <FaUserCircle className="text-3xl text-primary" />
                        </div>

                        <div>
                            <p className="font-semibold text-[#03373D]">{t.name}</p>
                            <p className="text-sm text-gray-500">{t.designation}</p>
                        </div>
                    </div>
                </div>

                {/* CONTROLS */}
                <div className="flex items-center justify-center gap-6 mt-8">
                    <button onClick={prev} className="btn btn-circle btn-outline">
                        <FaArrowLeft />
                    </button>

                    <div className="flex gap-2">
                        {testimonials.map( ( _, i ) => (
                            <button
                                key={i}
                                onClick={() => setCurrent( i )}
                                className={`w-3 h-3 rounded-full ${ current === i ? "bg-primary" : "bg-gray-300"
                                    }`}
                            />
                        ) )}
                    </div>

                    <button onClick={next} className="btn btn-circle btn-outline">
                        <FaArrowRight />
                    </button>
                </div>

            </div>
        </section>
    );
};

export default CustomerSaying;
