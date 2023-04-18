import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Function that displays a success toast on bottom right of the page when form submission is successful
  const toastifySuccess = () => {
    toast.success("Form sent!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: "submit-feedback success",
      toastId: "notifyToast",
    });
  };

  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit = async (data) => {
    // Destrcture data object
    const { name, email, subject, message } = data;
    try {
      const templateParams = {
        name,
        email,
        subject,
        message,
      };

      emailjs
        .send(
          "service_qx2ew9p",
          "template_cfz5dzg",
          templateParams,
          "ukoXnsswDu0qXb4Na"
        ) //need to add the Id instead of the text then the page will be ready to use.
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
          },
          function (error) {
            console.log("FAILED...", error);
            toast.error("Error Please try again!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              className: "submit-feedback success",
              toastId: "notifyToast",
            });
          }
        );

      reset();
      toastifySuccess();
    } catch (e) {
      toast.error("Error Please try again!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: "submit-feedback success",
        toastId: "notifyToast",
      });
    }
  };

  return (
    <div className="flex flex-col fixed w-full h-full items-center bg-contact">
      <div className="flex text-3xl font-bold mt-[8%] text-black ">
        <p className="">Contact Us</p>
      </div>
      <div className="cjustify-center items-center mt-5 w-[70%] bg-blue-200 rounded-lg">
        <div className="">
          <div className="text-center block text-gray-700 text-sm font-bold mb-2">
            <div>
              <form
                id="contact-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {/* Row 1 of form */}
                <div className="flex flex-col w-full items-center mt-10 gap-5">
                  <div className="flex w-[60%]">
                    <input
                      type="text"
                      name="name"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Please enter your name",
                        },
                        maxLength: {
                          value: 30,
                          message: "Please use 30 characters or less",
                        },
                      })}
                      className="w-full h-10 rounded-lg pl-5"
                      placeholder="Name"
                    ></input>
                    {errors.name && (
                      <span className="errorMessage">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="flex w-[60%]">
                    <input
                      type="email"
                      name="email"
                      {...register("email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      })}
                      className="w-full h-10 rounded-lg pl-5"
                      placeholder="Email address"
                    ></input>
                    {errors.email && (
                      <span className="errorMessage">
                        Please enter a valid email address
                      </span>
                    )}
                  </div>
                  <div className="flex w-[60%]">
                    <input
                      type="text"
                      name="subject"
                      {...register("subject", {
                        required: {
                          value: true,
                          message: "Please enter a subject",
                        },
                        maxLength: {
                          value: 75,
                          message: "Subject cannot exceed 75 characters",
                        },
                      })}
                      className="w-full h-10 rounded-lg pl-5"
                      placeholder="Subject"
                    ></input>
                    {errors.subject && (
                      <span className="errorMessage">
                        {errors.subject.message}
                      </span>
                    )}
                  </div>
                  {/* Row 3 of form */}
                  <div className="flex w-[60%]">
                    <textarea
                      rows={3}
                      name="message"
                      {...register("message", {
                        required: true,
                      })}
                      className="w-full h-[10rem] rounded-lg pl-5 pt-4"
                      placeholder="Message"
                    ></textarea>
                    {errors.message && (
                      <span className="errorMessage">
                        Please enter a message
                      </span>
                    )}
                  </div>
                  <div className="flex justify-end w-[60%]">
                    <button
                      className="flex py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:border-slate-400 
                  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
