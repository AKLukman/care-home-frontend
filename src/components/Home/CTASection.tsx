const CTASection = () => {
    return (
        <section className="py-20">
            <div className="bg-primary text-primary-content rounded-3xl p-10 md:p-16 text-center shadow-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Schedule a Visit Today
                </h2>

                <p className="max-w-2xl mx-auto mb-8 opacity-90">
                    Our team is here to answer your questions and help you find
                    the best care solution for your loved one.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <button className="btn btn-secondary">
                        Book a Tour
                    </button>

                    <button className="btn btn-outline btn-secondary">
                        Contact Us
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTASection;