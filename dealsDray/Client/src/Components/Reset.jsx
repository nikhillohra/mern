import React from "react";
import styles from "../styles/Username.module.css";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../Helper/validate";
import { resetPasswordValidation } from "../Helper/validate";
import { resetPassword } from "../Helper/helper";
import { useAuthStore } from "../store/store";
import { useNavigate, Navigate } from "react-router-dom";
import useFetch from "../Hooks/fetch";

const Reset = () => {

  const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession')


  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      
      let resetPromise = resetPassword({ username, password: values.password })

      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully...!</b>,
        error : <b>Could not Reset!</b>
      });

      resetPromise.then(function(){ navigate('/password') })

    }
  });

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>


  return (
    <>
      <div className="container pop flex flex-col mx-auto justify-center items-center">
        <Toaster position="top-center" reverseOrder="false"></Toaster>
        <div className={styles.glass} style={{width: "50%"}}>
          <div className="flex flex-col justify-center items-center h-screen">
            <img src="./deals.svg" alt="logo" className="h-12 w-12 p-1" />
            <h4 className="text-4xl font-bold"> Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter your New Password.
            </span>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="flex justify-center py-4">
                <img src=' ./src/assets/recover1.png' alt="avatar" className={styles.profile_img} />
              </div>

              <div className="textbox flex-col flex mt-5 justify-center  items-center">
                <input
                  {...formik.getFieldProps("password")}
                  className={styles.textbox}
                  type="password"
                  placeholder="New Password"
                />
                  <input
                  {...formik.getFieldProps("confirm_pwd")}
                  className={styles.textbox}
                  type="password"
                  placeholder="Confirm Password"
                />

                <button type="submit" className={styles.btn}>
                  {" "}
                 Reset
                </button>
              </div>

              <div className="text-center py-4">
                <span>
                Please avoid reusing your previous passwords.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reset;
