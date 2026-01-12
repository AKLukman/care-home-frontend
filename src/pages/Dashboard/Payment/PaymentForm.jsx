import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const navigate = useNavigate()
    const [ loading, setLoading ] = useState( false );
    const [ errorMessage, setErrorMessage ] = useState( "" );

    const { parcelId } = useParams()
    const { data } = useQuery( {
        queryKey: [ 'parcels', parcelId ],
        queryFn: async () => {
            const res = await axiosSecure.get( `/parcels/${ parcelId }` )
            return res.data
        }
    } )


    const handleSubmit = async ( event ) => {
        const amount = data?.data?.cost
        event.preventDefault();
        setErrorMessage( "" );

        if ( !stripe || !elements ) return;

        const card = elements.getElement( CardElement );
        if ( !card ) return;

        setLoading( true );

        // validate card

        const { error, paymentMethod } = await stripe.createPaymentMethod( {
            type: "card",
            card,
        } );

        if ( error ) {
            setErrorMessage( error.message );
            toast.error( error.message );
            setLoading( false );
            return;
        }

        console.log( "Payment Method:", paymentMethod );
        toast.success( "Card validated successfully!" );
        setLoading( false );

        //next step: payment intent
        const res = await axiosSecure.post( "/create-payment-intent", {
            amount,
            parcelId
        } )

        const clientSecret = res.data.clientSecret

        // confirm payment
        const result = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: elements.getElement( CardElement ),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    }
                },
            }
        );

        if ( result.error ) {
            toast.error( result.error.message );
            setLoading( false );
            return;
        }

        if ( result.paymentIntent.status === "succeeded" ) {
            toast.success( "Payment Successful!" );

            const paymentData = {
                parcelId,
                userEmail: user.email,
                paymentMethod: result.paymentIntent.payment_method_types,
                transactionId: result.paymentIntent.id,
                amount
            }
            const paymentRes = await axiosSecure.post( '/payments-records', paymentData )

            if ( paymentRes.data.paymentId ) {
                navigate( '/dashboard/my-parcels' )
            }
        }

        setLoading( false );
    };

    return (
        <div className="max-w-md mx-auto bg-base-100 shadow-lg rounded-xl p-6 space-y-6">
            {/* Header */}
            <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold">💳 Secure Payment</h2>
                <p className="text-sm text-gray-500">
                    Complete your parcel payment
                </p>
            </div>

            {/* Amount */}
            <div className="flex justify-between items-center bg-base-200 p-3 rounded-lg">
                <span className="font-medium">Total Amount</span>
                <span className="text-lg font-bold text-black">
                    ৳{data?.data?.cost}
                </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Card Element */}
                <div className="border rounded-lg p-3 bg-white">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#32325d",
                                    "::placeholder": {
                                        color: "#aab7c4",
                                    },
                                },
                                invalid: {
                                    color: "#fa755a",
                                },
                            },
                        }}
                    />
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <p className="text-sm text-error">{errorMessage}</p>
                )}

                {/* Pay Button */}
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="btn btn-primary w-full font-bold text-black"
                >
                    {loading ? (
                        <span className="loading loading-spinner"></span>
                    ) : (
                        <>Pay ৳{data?.data?.cost}</>
                    )}
                </button>
            </form>

            {/* Footer */}
            <p className="text-xs text-center text-gray-400">
                🔒 Payments are secured by Stripe
            </p>
        </div>
    );
};

export default PaymentForm;
