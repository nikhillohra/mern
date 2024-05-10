import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { avatar } from "../assets";
import styles from "../styles/Username.module.css";
import {toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../Helper/validate";
import useFetch from "../Hooks/fetch";
import { useAuthStore } from "../store/store";
import { verifyPassword } from "../Helper/helper";

const Password = () => {
  
  const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

  const formik = useFormik({
    initialValues : {
      password : 'admin@123'
    },
    validate : passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      
      let loginPromise = verifyPassword({ username, password : values.password })
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success : <b>Login Successfully...!</b>,
        error : <b>Password Not Match!</b>
      });

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/profile')
      })
    }
  })

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>



  return (
    <>
      <div className="container pop flex flex-col mx-auto justify-center items-center">
        <Toaster position="top-center" reverseOrder="false"></Toaster>
        <div className={styles.glass} style={{width: "50%"}}>
          <div className="flex flex-col justify-center items-center h-screen">
            <img src="./deals.svg" alt="logo" className="h-12 w-12 p-1" />
            <h4 className="text-4xl font-bold"> Welcome {apiData?.username}!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
             Enter your password
            </span>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="flex justify-center py-4">
                <img src={apiData?.profile || avatar} alt="avatar" className={styles.profile_img} />
              </div>

              <div className="textbox flex-col flex mt-5 justify-center  items-center">
                <input
                  {...formik.getFieldProps("password")}
                  className={styles.textbox}
                  type="password"
                  placeholder="Password"
                />

                <button type="submit" className={styles.btn}>
                  {" "}
                  Sign In
                </button>
              </div>

              <div className="text-center py-4">
                <span>
                  Forgot Password?
                  <Link className="text-red-600 ml-1" to="/recovery">
                    Recover Now!
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Password;
