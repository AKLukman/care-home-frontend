const images = [
    "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=2070&auto=format&fit=crop",
];

const GallerySection = () => {
    return (
        <section className="py-16 bg-base-200 rounded-3xl px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">Our Facilities</h2>
                <p className="text-base-content/70 mt-3 max-w-2xl mx-auto">
                    A safe, comfortable, and welcoming environment designed
                    to feel like home.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {images.map( ( img, index ) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-2xl shadow-lg group"
                    >
                        <img
                            src={img}
                            alt="Care Home Facility"
                            className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                        />
                    </div>
                ) )}
            </div>
        </section>
    );
};

export default GallerySection;