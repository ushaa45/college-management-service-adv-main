import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import API from "../api/axios";
import Button from "../components/ui/Button";

const districts = [
  "Alipurduar",
  "Bankura",
  "Birbhum",
  "Cooch Behar",
  "Dakshin Dinajpur",
  "Darjeeling",
  "Hooghly",
  "Howrah",
  "Jalpaiguri",
  "Jhargram",
  "Kalimpong",
  "Kolkata",
  "Maldah",
  "Murshidabad",
  "Nadia",
  "North 24 Parganas",
  "Paschim Bardhaman",
  "Paschim Medinipur",
  "Purba Bardhaman",
  "Purba Medinipur",
  "Purulia",
  "South 24 Parganas",
  "Uttar Dinajpur",
];
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  course: yup.string().required("Course is required"),
  district: yup.string().required("District is required"),
});

const inputClass =
  "w-full rounded-md border border-[#D7E0EA] bg-[#FFFEFB] px-3 py-2.5 text-sm text-[#0b1b30] outline-none transition focus:border-[#C88A2E] focus:ring-2 focus:ring-[#C88A2E]/30";

function ApplyNow() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const [photoPreview, setPhotoPreview] = useState(null);
  const [docFiles, setDocFiles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const photoFile = watch("photo");

  useEffect(() => {
    if (photoFile && photoFile[0]) {
      const file = photoFile[0];
      const preview = URL.createObjectURL(file);
      setPhotoPreview(preview);
      return () => URL.revokeObjectURL(preview);
    }
  }, [photoFile]);

  const documents = watch("documents");

  useEffect(() => {
    if (documents && documents.length > 0) {
      const filesArray = Array.from(documents);
      const previews = filesArray.map((file) => ({
        file,
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
      }));
      setDocFiles(previews);
      return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
    }
  }, [documents]);

  const removeFile = (index) => {
    const updated = [...docFiles];
    updated.splice(index, 1);
    setDocFiles(updated);
  };

  useEffect(() => {
    API.get(`/api/college/${id}`)
      .then((res) => setCollege(res.data))
      .catch((err) => console.error(err));
  }, [id]);

 /* const handlePayment = async (applicationId) => {
    try {
      const res = await API.post(`/api/payment/create-order/${applicationId}`);
      const order = res.data;

      const options = {
        key: "rzp_test_Su32efnP9UJqZQ",
        amount: order.amount,
        currency: "INR",
        name: "College Admission",
        description: "Application Fee",
        order_id: order.id,
        prefill: {
          name: watch("name"),
          email: watch("email"),
          contact: watch("phone"),
        },
        theme: { color: "#132A46" },
        handler: async function (response) {
          try {
            await API.post("/api/payment/verify-payment", {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            });
            alert("Payment successful");
            reset();
            setPhotoPreview(null);
            setDocFiles([]);
          } catch (err) {
            console.error(err);
            alert("Payment verification failed");
          }
        },
        modal: {
          ondismiss: function () {
            alert("Payment cancelled");
          },
        },
      }; 

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.log(response.error);
        alert("Payment failed");
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Unable to create payment order");
    }
  };*/

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setSuccess("");
      setProgress(0);

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== "photo" && key !== "documents") {
          formData.append(key, data[key]);
        }
      });
      if (data.photo && data.photo[0]) {
        formData.append("photo", data.photo[0]);
      }
      docFiles.forEach((doc) => {
        formData.append("documents", doc.file);
      });

      const res = await API.post(`/api/applications/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });

      const app = res.data;
      setSuccess(
        "Application submitted successfully. Please wait for admin approval before making payment."
    );

      reset();
      setPhotoPreview(null);
      setDocFiles([]);
      navigate(`/application-status/${app.id}`);

    } catch (err) {
      console.error(err);
      alert("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE]">
      {/* HEADER */}
      <div className="bg-[#0b1b30] px-6 py-6 text-white">
        <p className="font-mono-num text-xs uppercase tracking-[0.2em] text-[#E9C77E]">
          Admission Form
        </p>
        <h1 className="font-display text-2xl font-semibold">Apply for admission</h1>
        {college && (
          <p className="mt-1 text-sm text-white/60">
            {college.collegeName} • {college.address}
          </p>
        )}
      </div>

      {/* FORM */}
      <div className="flex justify-center p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-4xl rounded-lg border border-[#D7E0EA] bg-[#FFFEFB] p-8 shadow-sm"
        >
          <h2 className="font-display mb-6 text-center text-2xl font-semibold text-[#0b1b30]">
            Application Form
          </h2>

          {success && <p className="mb-4 text-center text-[#3F6653]">{success}</p>}

          {loading && (
            <div className="mb-4">
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#EEF2F7]">
                <div
                  className="flex h-2 items-center justify-center rounded-full bg-[#C88A2E] text-[10px] text-[#0b1b30] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 text-center font-mono-num text-xs text-[#4B5566]">{progress}%</p>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <input placeholder="Full name *" className={inputClass} {...register("name")} />
              <p className="mt-1 text-xs text-[#B4472E]">{errors.name?.message}</p>
            </div>

            <div>
              <input placeholder="Email *" className={inputClass} {...register("email")} />
              <p className="mt-1 text-xs text-[#B4472E]">{errors.email?.message}</p>
            </div>

            <div>
              <input placeholder="Phone *" className={inputClass} {...register("phone")} />
              <p className="mt-1 text-xs text-[#B4472E]">{errors.phone?.message}</p>
            </div>

            <div>
              <input placeholder="Course *" className={inputClass} {...register("course")} />
              <p className="mt-1 text-xs text-[#B4472E]">{errors.course?.message}</p>
            </div>

            <input placeholder="Qualification" className={inputClass} {...register("qualification")} />
            <input placeholder="Previous school" className={inputClass} {...register("previousSchool")} />
            <input placeholder="Marks" className={inputClass} {...register("marks")} />
            <input placeholder="Year" className={inputClass} {...register("year")} />
            <div>
               <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#4B5566]">
                  District
                </label>
              <select
                className={inputClass}
                {...register("district")}
                defaultValue=""
              >
                <option value="" disabled>
                  Select District *
                </option>

                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>

              <p className="mt-1 text-xs text-[#B4472E]">
                {errors.district?.message}
              </p>
            </div>

            <textarea placeholder="Address" className={`${inputClass} md:col-span-2`} {...register("address")} />
            <textarea placeholder="Statement of purpose" className={`${inputClass} md:col-span-2`} {...register("sop")} />

            {/* Photo */}
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#4B5566]">
                Upload photo
              </label>
              <input type="file" {...register("photo")} className="text-sm" />
              {photoPreview && (
                <img src={photoPreview} alt="Preview" className="mt-2 h-24 w-24 rounded-md border border-[#D7E0EA] object-cover" />
              )}
            </div>

            {/* Documents */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#4B5566]">
                Upload documents
              </label>
              <input type="file" multiple className="mt-1 block text-sm" {...register("documents")} />

              <div className="mt-3 space-y-2">
                {docFiles.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md border border-[#D7E0EA] bg-[#EEF2F7] p-2">
                    <div className="flex items-center gap-2">
                      {doc.type.startsWith("image") ? (
                        <img src={doc.url} alt="doc" className="h-10 w-10 rounded object-cover" />
                      ) : (
                        <span className="text-[#4B5566]">Doc</span>
                      )}
                      <span className="text-sm text-[#0b1b30]">{doc.name}</span>
                    </div>
                    <button type="button" onClick={() => removeFile(index)} className="text-sm text-[#B4472E]">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button type="submit" 
                  variant="accent" 
                  disabled={loading} 
                  className="mt-6 w-full py-2.5">
            {loading ? "Submitting…" : "Submit Application"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ApplyNow;
