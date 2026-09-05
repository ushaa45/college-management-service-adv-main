import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import Button from "../components/ui/Button";

function ApplicationStatus() {

  const { id } = useParams();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH APPLICATION
  // =====================================================

  const fetchApplication = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
          await API.get(`/api/applications/${id}`);

      setApplication(response.data);

    } catch (err) {

      console.error(
          "Error fetching application:",
          err
      );

      setError(
          "Unable to load application."
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchApplication();

  }, [id]);

  // =====================================================
  // LOAD RAZORPAY SCRIPT
  // =====================================================

  const loadRazorpay = () => {

    return new Promise((resolve) => {

      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script =
          document.createElement("script");

      script.src =
          "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  // =====================================================
  // PAYMENT
  // =====================================================

  const handlePayment = async () => {

    try {

      setPaymentLoading(true);

      // Load Razorpay
      const loaded =
          await loadRazorpay();

      if (!loaded) {

        alert(
            "Razorpay could not be loaded."
        );

        return;
      }

      // Create order
      const response =
          await API.post(
              `/api/payment/create-order/${id}`
          );

      const order = response.data;

      // Razorpay options
      const options = {

        key: "rzp_test_Su32efnP9UJqZQ",

        amount: order.amount,

        currency: order.currency || "INR",

        name: "College Admission",

        description: "Application Fee",

        order_id: order.id,

        prefill: {

          name: application.name,

          email: application.email,

          contact: application.phone,
        },

        theme: {
          color: "#132A46",
        },

        handler: async function (response) {

          try {

            await API.post(
                "/api/payment/verify-payment",
                {
                  paymentId:
                      response.razorpay_payment_id,

                  orderId:
                      response.razorpay_order_id,

                  signature:
                      response.razorpay_signature,
                }
            );

            alert(
                "Payment successful!"
            );

            // Reload application
            await fetchApplication();

          } catch (err) {

            console.error(
                "Payment verification error:",
                err
            );

            alert(
                "Payment verification failed."
            );
          }
        },

        modal: {

          ondismiss: function () {

            console.log(
                "Payment cancelled"
            );
          },
        },
      };

      const razorpay =
          new window.Razorpay(options);

      razorpay.on(
          "payment.failed",
          function (response) {

            console.error(
                "Payment failed:",
                response.error
            );

            alert(
                "Payment failed. Please try again."
            );
          }
      );

      razorpay.open();

    } catch (err) {

      console.error(
          "Payment error:",
          err
      );

      const message =
          err.response?.data ||
          "Unable to start payment.";

      alert(message);

    } finally {

      setPaymentLoading(false);
    }
  };

  // =====================================================
  // STATUS COLOR
  // =====================================================

  const getStatusClass = (status) => {

    switch (status) {

      case "PENDING":
        return "bg-yellow-100 text-yellow-800";

      case "UNDER_REVIEW":
        return "bg-blue-100 text-blue-800";

      case "PAYMENT_PENDING":
        return "bg-orange-100 text-orange-800";

      case "PAID":
        return "bg-emerald-100 text-emerald-800";

      case "ADMITTED":
        return "bg-purple-100 text-purple-800";

      case "REJECTED":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF6EE]">

        <div className="rounded-lg border bg-white p-8 shadow-sm">

          <p className="text-gray-600">
            Loading application...
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !application) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF6EE]">

        <div className="rounded-lg border bg-white p-8 text-center shadow-sm">

          <h2 className="text-xl font-semibold text-red-600">
            Application not found
          </h2>

          <p className="mt-2 text-gray-600">
            {error}
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div className="min-h-screen bg-[#FAF6EE]">

      {/* Header */}

      <div className="bg-[#0b1b30] px-6 py-8 text-white">

        <p className="font-mono-num text-xs uppercase tracking-[0.2em] text-[#E9C77E]">
          Admission
        </p>

        <h1 className="font-display text-3xl font-semibold">
          Application Status
        </h1>

        <p className="mt-2 text-sm text-white/60">
          Application ID: #{application.id}
        </p>

      </div>

      {/* Content */}

      <div className="mx-auto max-w-4xl p-6">

        {/* Status Card */}

        <div className="rounded-lg border border-[#D7E0EA] bg-[#FFFEFB] p-6 shadow-sm">

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>

              <p className="text-sm text-gray-500">
                Applicant
              </p>

              <h2 className="text-2xl font-semibold text-[#0b1b30]">
                {application.name}
              </h2>

            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusClass(
                application.status
              )}`}
            >
              {application.status}
            </span>

          </div>

        </div>

        {/* Applicant Details */}

        <div className="mt-6 rounded-lg border border-[#D7E0EA] bg-[#FFFEFB] p-6 shadow-sm">

          <h2 className="mb-5 text-xl font-semibold text-[#0b1b30]">
            Application Details
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Name
              </p>

              <p className="mt-1 font-medium">
                {application.name}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Email
              </p>

              <p className="mt-1 font-medium">
                {application.email}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Phone
              </p>

              <p className="mt-1 font-medium">
                {application.phone}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Course
              </p>

              <p className="mt-1 font-medium">
                {application.course}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Qualification
              </p>

              <p className="mt-1 font-medium">
                {application.qualification || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Previous School
              </p>

              <p className="mt-1 font-medium">
                {application.previousSchool || "-"}
              </p>
            </div>

          </div>

        </div>

        {/* Payment */}

        {application.status === "PAYMENT_PENDING" && (

          <div className="mt-6 rounded-lg border border-orange-200 bg-orange-50 p-6">

            <h2 className="text-xl font-semibold text-orange-900">
              Application Approved
            </h2>

            <p className="mt-2 text-sm text-orange-800">
              Your application has been approved.
              Please complete the application fee payment
              to continue the admission process.
            </p>

            <div className="mt-5 flex items-center justify-between">

              <div>

                <p className="text-sm text-orange-700">
                  Application Fee
                </p>

                <p className="text-2xl font-bold text-orange-900">
                  ₹500
                </p>

              </div>

              <Button
                type="button"
                variant="accent"
                disabled={paymentLoading}
                onClick={handlePayment}
              >
                {paymentLoading
                  ? "Processing..."
                  : "Pay ₹500"}
              </Button>

            </div>

          </div>
        )}

        {/* Paid */}

        {application.status === "PAID" && (

          <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-6">

            <h2 className="text-xl font-semibold text-emerald-900">
              Payment Successful
            </h2>

            <p className="mt-2 text-sm text-emerald-800">
              Your payment has been verified successfully.
              Your application is now waiting for the final
              admission process.
            </p>

            {application.paymentId && (

              <p className="mt-3 text-xs text-emerald-700">
                Payment ID: {application.paymentId}
              </p>
            )}

          </div>
        )}

        {/* Admitted */}

        {application.status === "ADMITTED" && (

          <div className="mt-6 rounded-lg border border-purple-200 bg-purple-50 p-6">

            <h2 className="text-xl font-semibold text-purple-900">
              Admission Completed
            </h2>

            <p className="mt-2 text-sm text-purple-800">
              Congratulations! Your admission has been
              completed successfully.
            </p>

          </div>
        )}

        {/* Under Review */}

        {application.status === "UNDER_REVIEW" && (

          <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-6">

            <h2 className="text-xl font-semibold text-blue-900">
              Application Under Review
            </h2>

            <p className="mt-2 text-sm text-blue-800">
              Your application is currently being reviewed
              by the administration.
            </p>

          </div>
        )}

        {/* Pending */}

        {application.status === "PENDING" && (

          <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-6">

            <h2 className="text-xl font-semibold text-yellow-900">
              Application Submitted
            </h2>

            <p className="mt-2 text-sm text-yellow-800">
              Your application has been submitted successfully.
              Please wait for the administration to review it.
            </p>

          </div>
        )}

        {/* Rejected */}

        {application.status === "REJECTED" && (

          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-6">

            <h2 className="text-xl font-semibold text-red-900">
              Application Rejected
            </h2>

            <p className="mt-2 text-sm text-red-800">
              Unfortunately, your application has been rejected.
              Please contact the administration for more information.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default ApplicationStatus;