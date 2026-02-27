const TestimonialsSection = () => {
    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">What Families Say</h2>
                <p className="text-base-content/70 mt-3 max-w-2xl mx-auto">
                    We are proud to support families with compassionate and professional care.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <p className="italic">
                            "The staff treat my mother with genuine kindness and respect.
                            I finally have peace of mind."
                        </p>
                        <div className="mt-4 font-semibold">— Sarah Williams</div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <p className="italic">
                            "Professional, clean, and incredibly supportive. We couldn't
                            have chosen a better place."
                        </p>
                        <div className="mt-4 font-semibold">— David Thompson</div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <p className="italic">
                            "The medical supervision and daily activities make such a
                            positive difference."
                        </p>
                        <div className="mt-4 font-semibold">— Linda Carter</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;