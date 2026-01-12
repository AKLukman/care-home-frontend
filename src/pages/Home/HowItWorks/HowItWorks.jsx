
import { FaClipboardList, FaMoneyBillWave, FaWarehouse, FaBuilding } from "react-icons/fa";

const steps = [
    {
        icon: <FaClipboardList />,
        title: "Booking Pick & Drop",
        description: "Easily schedule parcel pickups and drops at your convenience with just a few clicks.",
    },
    {
        icon: <FaMoneyBillWave />,
        title: "Cash on Delivery",
        description: "Enable secure cash collection upon delivery for hassle-free transactions.",
    },
    {
        icon: <FaWarehouse />,
        title: "Delivery Hub",
        description: "Our central hubs ensure parcels are sorted efficiently for timely delivery.",
    },
    {
        icon: <FaBuilding />,
        title: "Booking SME & Corporate",
        description: "Specialized services for small businesses and corporate shipments with priority handling.",
    },
];

const HowItWorks = () => {
    return (
        <section className="py-16 bg-white mt-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-12">How It Works</h2>

                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map( ( step, index ) => (
                        <div
                            key={index}
                            className="card bg-gray-50 p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300 hover:bg-primary/10"
                        >
                            <div className="text-primary text-4xl mb-4">{step.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ) )}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
