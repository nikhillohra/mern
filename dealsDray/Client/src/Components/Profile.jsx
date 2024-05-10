import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { avatar } from "../assets";
import useFetch from "../Hooks/fetch";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../Helper/validate";
import convertToBase64 from "../Helper/convert";
import { updateUser } from "../Helper/helper";



import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";

const Profile = () => {

  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()
 
  const formik = useFormik({
    initialValues : {
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      designation: apiData?.designation || " ",
      gender: apiData?.gender || "",
      courses: apiData?.courses || "",
    
    },
    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || apiData?.profile || ''})
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success : <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });

    }
  })

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  // logout handler function
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>


  return (
    <>
      <div className="container pop flex flex-col mx-auto justify-center items-center">
        <Toaster position="top-center" reverseOrder="false"></Toaster>
        <div
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "50%" }}
        >
          <div className="flex flex-col justify-center items-center h-screen">
            <img src="./deals.svg" alt="logo" className="h-12 w-12 p-1" />
            <h4 className="text-4xl font-bold">Profile Update</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Here you can update your details.
            </span>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="flex justify-center py-4">
                <label htmlFor="profile">
                  <img
                    src={apiData?.profile || file || avatar}
                    alt="avatar"
                    className={`${styles.profile_img} ${extend.profile_img}`}
                  />
                </label>
                <input
                  onChange={onUpload}
                  type="file"
                  id="profile"
                  name="profile"
                />
              </div>

              <div className="textbox flex-col flex mt-5 justify-center  items-center">
                <input
                  {...formik.getFieldProps("username")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Username*"
                />

                <input
                  {...formik.getFieldProps("email")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="email"
                  placeholder="Email*"
                />

                <input
                  {...formik.getFieldProps("password")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="password"
                  placeholder="Password*"
                />

                <select
                  {...formik.getFieldProps("designation")}
                  className={`${styles.textbox} ${extend.textbox}`}
                >
                  <option value="" disabled selected>
                    Select Designation*
                  </option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                  <option value="IT">IT</option>
                </select>

                <div className="flex justify-start items-center mt-4 mb-1">
                  <label className="mr-2">Gender:</label>
                  <input
                    {...formik.getFieldProps("gender")}
                    type="radio"
                    id="male"
                    name="gender"
                    value="Male"
                  />
                  <label className="mr-2 ml-1" htmlFor="male">
                    Male
                  </label>
                  <input
                    {...formik.getFieldProps("gender")}
                    type="radio"
                    id="female"
                    name="gender"
                    value="Female"
                  />
                  <label className="mr-2 ml-1" htmlFor="female">
                    Female
                  </label>
                  <input
                    {...formik.getFieldProps("gender")}
                    type="radio"
                    id="other"
                    name="gender"
                    value="other"
                  />
                  <label className="mr-2 ml-1" htmlFor="other">
                    Other
                  </label>
                </div>

                {/* cousrses */}

                <div className="flex items-center mt-4 mb-4 ">
                  <label className="mr-2">Courses:</label>
                  <input
                    {...formik.getFieldProps("courses")}
                    type="checkbox"
                    id="btech"
                    name="courses"
                    value="btech"
                  />
                  <label className="mr-2 ml-1" htmlFor="btech">
                    B.Tech
                  </label>
                  <input
                    {...formik.getFieldProps("courses")}
                    type="checkbox"
                    id="mca"
                    name="courses"
                    value="MCA"
                  />
                  <label className="mr-2 ml-1" htmlFor="mca">
                    MCA
                  </label>
                  <input
                    {...formik.getFieldProps("courses")}
                    type="checkbox"
                    id="bca"
                    name="courses"
                    value="BCA"
                  />
                  <label className="mr-2 ml-1" htmlFor="bca">
                    BCA
                  </label>
                  <input
                    {...formik.getFieldProps("courses")}
                    type="checkbox"
                    id="bsc"
                    name="courses"
                    value="BSC"
                  />
                  <label className="mr-2 ml-1" htmlFor="bsc">
                    BSC
                  </label>
                </div>

                <p className="flex items-center mt-4 mb-5 text-sm text-gray-600">
                  Upload Image by clicking Profile Icon*
                </p>

                <button type="submit" className={styles.btn}>
                  {" "}
                  Update
                </button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-600'>come back later? <button onClick={userLogout} className='text-red-500' to="/">Logout</button></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
