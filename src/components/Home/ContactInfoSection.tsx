const contactData = [
    {
        id: 1,
        title: "Address",
        value: "123 Care Home Street, London, UK",
        icon: (
            <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 10l4-4-4-4m0 0H7m10 8v6m0 0H7m10 0l-4 4 4 4"
                />
            </svg>
        ),
    },
    {
        id: 2,
        title: "Phone",
        value: "+44 123 456 7890",
        icon: (
            <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h2l3 7-1 2a10 10 0 005 5l2-1 7 3v2a2 2 0 01-2 2h-2C7.82 22 2 16.18 2 9V7a2 2 0 012-2z"
                />
            </svg>
        ),
    },
    {
        id: 3,
        title: "Email",
        value: "info@carehome.com",
        icon: (
            <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12l-4-4-4 4m0 0l4 4 4-4m-4-4v12"
                />
            </svg>
        ),
    },
];

const ContactInfoSection = () => {
    return (
        <section className="py-20 bg-base-200 px-6">
            {/* Section header */}
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold">Contact Us</h2>
                <p className="text-base-content/70 mt-3 max-w-2xl mx-auto">
                    Get in touch with us for inquiries, visits, or any assistance you need.
                </p>
            </div>

            {/* Cards grid */}
            <div className="grid gap-8 md:grid-cols-3">
                {contactData.map( ( item ) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-2xl p-8 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="mb-4">{item.icon}</div>
                        <h4 className="text-lg md:text-xl font-semibold mb-2">{item.title}</h4>
                        <p className="text-gray-600">{item.value}</p>
                    </div>
                ) )}
            </div>
        </section>
    );
};

export default ContactInfoSection;