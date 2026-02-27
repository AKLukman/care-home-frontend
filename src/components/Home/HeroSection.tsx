import { useEffect, useState } from "react";

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2070&auto=format&fit=crop",
        title: "Compassionate Elderly Care",
        description: "Providing warmth, dignity, and professional support every day.",
    },

    {
        id: 2,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
        title: "Daily Health Monitoring",
        description: "Consistent checkups and personalized care plans.",
    },

    {
        id: 3,
        image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2070&auto=format&fit=crop",
        title: "Dedicated Medical Support",
        description: "Medication management and 24/7 supervision.",
    },
];

const HeroSection = () => {
    const [ current, setCurrent ] = useState( 0 );

    // Auto slide
    useEffect( () => {
        const interval = setInterval( () => {
            setCurrent( ( prev ) => ( prev + 1 ) % slides.length );
        }, 5000 );

        return () => clearInterval( interval );
    }, [] );

    const prevSlide = () => {
        setCurrent( ( prev ) => ( prev - 1 + slides.length ) % slides.length );
    };

    const nextSlide = () => {
        setCurrent( ( prev ) => ( prev + 1 ) % slides.length );
    };

    return (
        <div className="relative w-full h-[70vh] overflow-hidden rounded  shadow-xl">
            {slides.map( ( slide, index ) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${ index === current ? "opacity-100 z-10" : "opacity-0"
                        }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-6">
                        <div className="max-w-2xl text-white">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                {slide.title}
                            </h2>
                            <p className="text-lg md:text-xl opacity-90">
                                {slide.description}
                            </p>
                            {/* <button className="btn btn-primary mt-6">
                                Learn More
                            </button> */}
                        </div>
                    </div>
                </div>
            ) )}

            {/* Arrows */}
            <button
                onClick={prevSlide}
                className="btn btn-circle absolute left-4 top-1/2 -translate-y-1/2"
            >
                ❮
            </button>

            <button
                onClick={nextSlide}
                className="btn btn-circle absolute right-4 top-1/2 -translate-y-1/2"
            >
                ❯
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                {slides.map( ( _, index ) => (
                    <button
                        key={index}
                        onClick={() => setCurrent( index )}
                        className={`w-3 h-3 rounded-full ${ current === index
                            ? "bg-primary"
                            : "bg-white/50"
                            }`}
                    />
                ) )}
            </div>
        </div>
    );
};

export default HeroSection;