import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { avatar } from "../assets";
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { usernameValidate } from "../Helper/validate";
import { useAuthStore } from "../store/store";


const Username = () => {

  const navigate = useNavigate();
 const setUsername =  useAuthStore(state => state.setUsername)



  const formik = useFormik({
    initialValues: {
      username : ''
    },
    validate: usernameValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async values => {
      setUsername(values.username)
      navigate('/password')
    }
  })

  return (
    <>
      <div className="container pop flex flex-col mx-auto justify-center items-center">

      <Toaster position="top-center" reverseOrder="false" ></Toaster>
        <div className={styles.glass} style={{width: "50%"}}>
          <div className="flex flex-col justify-center items-center h-screen">
          <img src="./deals.svg" alt="logo" className="h-12 w-12 p-1" />
            <h4 className="text-4xl font-bold"> Welcome Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Take Your Retail Business to the Next Level.
            </span>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="flex justify-center py-4">
                <img src={avatar} alt="avatar" className={styles.profile_img} />
              </div>

              <div className="textbox flex-col flex mt-5 justify-center  items-center">
                <input {...formik.getFieldProps('username')}
                  className={styles.textbox}
                  type="text"
                  placeholder="Username"
                />
                
                <button type="submit" className={styles.btn}> Let's Go</button>
               
              </div>

              <div className="text-center py-4">
                <span>
                  Not a Member?
                  <Link className="text-red-500 ml-1" to="/register">
                    Register Now!
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

export default Username;
