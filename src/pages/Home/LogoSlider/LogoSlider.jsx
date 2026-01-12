// src/components/LogoSlider.jsx
import React from "react";
import Marquee from "react-fast-marquee";
import Logo1 from "../../../assets/brands/amazon_vector.png";
import Logo2 from "../../../assets/brands/amazon.png";
import Logo3 from "../../../assets/brands/casio.png";
// import Logo4 from "../../../assets/brands/moonstar.png";
import Logo5 from "../../../assets/brands/randstad.png";
import Logo6 from "../../../assets/brands/star.png";
import Logo7 from "../../../assets/brands/start_people.png";


const logos = [ Logo1, Logo2, Logo3, Logo5, Logo6, Logo7 ];

const LogoSlider = () => {
    return (
        <section className="py-16 bg-gray-50 mb-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-12">
                    We've helped thousands of <span className="text-primary">sales teams</span>
                </h2>

                <Marquee
                    gradient={false}
                    speed={50} // adjust speed as needed
                    pauseOnHover={true}
                >
                    {logos.map( ( logo, index ) => (
                        <div key={index} className="mx-24 flex items-center justify-center">
                            <img
                                src={logo}
                                alt={`Company ${ index + 1 }`}
                                className="h-6 sm:h-8 md:h-6 lg:h-6 object-contain"
                            />
                        </div>
                    ) )}
                </Marquee>
            </div>
        </section>
    );
};

export default LogoSlider;
