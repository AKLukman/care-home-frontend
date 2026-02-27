const WhyChooseUs = () => {
    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">Why Choose Our Care Home</h2>
                <p className="text-base-content/70 mt-3 max-w-2xl mx-auto">
                    We combine compassionate care with professional medical support
                    to ensure safety, comfort, and dignity for every resident.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center">
                        <div className="text-4xl">🩺</div>
                        <h3 className="card-title">24/7 Medical Support</h3>
                        <p>Qualified nurses and caregivers available at all times.</p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center">
                        <div className="text-4xl">🏠</div>
                        <h3 className="card-title">Safe Environment</h3>
                        <p>Modern facilities designed for safety and comfort.</p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center">
                        <div className="text-4xl">❤️</div>
                        <h3 className="card-title">Personalized Care</h3>
                        <p>Individual care plans tailored to each resident’s needs.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;