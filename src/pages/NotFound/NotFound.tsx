const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="text-center max-w-md">

                <h1
                    className="text-6xl font-bold text-primary mb-4"
                    data-aos="fade-down"
                >
                    404
                </h1>

                <h2
                    className="text-2xl font-semibold mb-2"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Page Not Found
                </h2>

                <p
                    className="text-base-content/70 mb-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    The page you are looking for does not exist or has been moved.
                </p>

                <div
                    data-aos="zoom-in"
                    data-aos-delay="300"
                >
                    <a href="/" className="btn btn-primary">
                        Go Back Home
                    </a>
                </div>

            </div>
        </div>
    );
};

export default NotFound;