const ServicesSection = () => {
    return (
        <section className="py-16 bg-base-200 rounded-3xl px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">Our Care Services</h2>
                <p className="text-base-content/70 mt-3 max-w-2xl mx-auto">
                    Comprehensive services designed to support health, comfort,
                    and quality of life for every resident.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Residential Care</h3>
                        <p>
                            24-hour personal support for daily living including bathing,
                            dressing, and mobility assistance.
                        </p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Medication Management</h3>
                        <p>
                            Safe administration and monitoring of prescribed medications
                            by trained professionals.
                        </p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Specialized Dementia Care</h3>
                        <p>
                            Structured routines and compassionate support for residents
                            with memory-related conditions.
                        </p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Physiotherapy</h3>
                        <p>
                            Mobility improvement programs supervised by qualified
                            therapists.
                        </p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Nutrition & Meal Plans</h3>
                        <p>
                            Balanced meals tailored to medical and dietary needs.
                        </p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Recreational Activities</h3>
                        <p>
                            Daily social and wellness programs to promote happiness
                            and engagement.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;