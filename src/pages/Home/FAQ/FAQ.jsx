// src/components/FAQ.jsx
const faqs = [
    {
        question: "How do I book a parcel pickup?",
        answer:
            "You can easily book a pickup through our website or mobile app. Simply provide pickup details, delivery address, and parcel information, and our rider will collect it from your location.",
    },
    {
        question: "Do you provide cash on delivery (COD) service?",
        answer:
            "Yes, we offer cash on delivery services. The collected amount will be transferred to your account within the committed settlement time.",
    },
    {
        question: "How can I track my shipment?",
        answer:
            "Once your parcel is picked up, you’ll receive a tracking ID that allows you to monitor your shipment in real time through our tracking system.",
    },
    {
        question: "What areas do you deliver to?",
        answer:
            "We deliver parcels across all major cities and remote areas, ensuring nationwide coverage with reliable service.",
    },
    {
        question: "What happens if a parcel is delayed or damaged?",
        answer:
            "In rare cases of delay or damage, our support team will assist you immediately and resolve the issue according to our delivery assurance policy.",
    },
];

const FAQ = () => {
    return (
        <section className="py-16 bg-gray-50 mt-20 my-20">
            <div className="container mx-auto px-4">

                {/* Section Title */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-[#03373D] mb-4">
                        Frequently Asked Question (FAQ)
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Find answers to common questions about our delivery services, tracking, and support.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map( ( faq, index ) => (
                        <div
                            key={index}
                            className="collapse collapse-arrow bg-white shadow-md rounded-lg"
                        >
                            <input type="checkbox" />
                            <div className="collapse-title text-lg font-medium">
                                {faq.question}
                            </div>
                            <div className="collapse-content text-gray-600">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ) )}
                </div>

            </div>
        </section>
    );
};

export default FAQ;
