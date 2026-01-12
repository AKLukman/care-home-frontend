import locationMerchant from "../../../assets/location-merchant.png"

const BeMerchant = () => {
    return (
        <div
            data-aos="zoom-in-up"
            data-aos-delay="50"
            className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-cover bg-[#03373D] rounded-3xl 
             px-6 py-12 sm:px-10 sm:py-16 lg:px-20 lg:py-20 my-20"
        >
            <div className="hero-content flex-col lg:flex-row-reverse gap-10">

                {/* Image */}
                <img
                    src={locationMerchant}
                    className="w-full max-w-xs sm:max-w-sm lg:max-w-md rounded-lg shadow-2xl"
                    alt="Merchant"
                />

                {/* Text Content */}
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                        Merchant and Customer Satisfaction is Our First Priority
                    </h1>

                    <p className="py-6 text-[#DADADA] max-w-xl mx-auto lg:mx-0">
                        We offer the lowest delivery charge with the highest value along with
                        100% safety of your product. Pathao courier delivers your parcels in
                        every corner of Bangladesh right on time.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <button className="btn btn-primary rounded-full bg-primary text-black px-6">
                            Become a Merchant
                        </button>
                        <button className="btn btn-outline text-primary rounded-full px-6">
                            Earn with ZapShift Courier
                        </button>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default BeMerchant
