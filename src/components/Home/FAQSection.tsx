const faqs = [
    {
        question: "What medical support is available?",
        answer:
            "We provide 24/7 nursing supervision, medication management, and regular health monitoring.",
    },
    {
        question: "Are family visits allowed?",
        answer:
            "Yes. Families are welcome during visiting hours, and private visits can be arranged upon request.",
    },
    {
        question: "Do you provide specialized dementia care?",
        answer:
            "Yes. We offer structured dementia support programs with trained caregivers.",
    },
    {
        question: "What activities are available for residents?",
        answer:
            "We provide daily recreational activities including exercise sessions, group games, therapy programs, and social events.",
    },
    {
        question: "How do I schedule a tour?",
        answer:
            "You can book a visit directly through our contact form or call our care team for assistance.",
    },
];

const FAQSection = () => {
    return (
        <section className="py-16 bg-base-200 rounded-3xl px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                <p className="text-base-content/70 mt-3 max-w-2xl mx-auto">
                    Answers to common questions about our care services and facilities.
                </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map( ( faq, index ) => (
                    <div
                        key={index}
                        className="collapse collapse-arrow bg-base-100 shadow"
                    >
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title text-lg font-medium">
                            {faq.question}
                        </div>
                        <div className="collapse-content text-base-content/70">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ) )}
            </div>
        </section>
    );
};

export default FAQSection;