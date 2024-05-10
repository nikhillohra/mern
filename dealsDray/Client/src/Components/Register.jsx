import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { avatar } from "../assets";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../Helper/validate";
import convertToBase64 from "../Helper/convert";
import { registerUser } from "../Helper/helper";

const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      mobile: "",
      designation: "",
      gender: "",
      courses: [],
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "Creating...",
        success: <b>Register Successfully...!</b>,
        error: <b>Could not Register.</b>,
      });

      registerPromise.then(function () {
        navigate("/");
      });
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <>
      <div className="container flex flex-col mx-auto justify-center items-center">
        <Toaster position="top-center" reverseOrder={false} />
        <div className={styles.glass} style={{ width: "50%" }}>
          <div className="flex flex-col justify-center items-center">
            
            <img src="./deals.svg" alt="logo" className="h-12 w-12 p-1 mt-10 mb-5" />
            <h4 className="text-4xl font-bold">Sign Up!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Take Your Retail Business to the Next Level.
            </span>

            <form className="py-1" onSubmit={formik.handleSubmit}>
    <div className="flex justify-center py-4">
        <label htmlFor="profile">
            <img
                src={file || avatar}
                alt="avatar"
                className={styles.profile_img}
            />
        </label>
        <input
            onChange={onUpload}
            type="file"
            id="profile"
            name="profile"
        />
    </div>

    <div className="textbox flex-col flex mt-5 justify-center items-center">
        <input
            {...formik.getFieldProps("email")}
            className={styles.textbox}
            type="email"
            placeholder="Email*"
            autoComplete="email"
        />
        <input
            {...formik.getFieldProps("username")}
            className={styles.textbox}
            type="text"
            placeholder="Username*"
            autoComplete="username"
        />
        <input
            {...formik.getFieldProps("password")}
            className={styles.textbox}
            type="password"
            placeholder="Password*"
            autoComplete="new-password"
        />
        <input
            {...formik.getFieldProps("mobile")}
            className={styles.textbox}
            type="tel"
            placeholder="Mobile Number*"
            autoComplete="tel"
        />

        <select
            {...formik.getFieldProps("designation")}
            className={styles.textbox1}
            autoComplete="designation"
        >
            <option value="" disabled>
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

        <div className="flex items-center mt-4 mb-4">
            <label className="mr-2">Courses:</label>
            <input
                {...formik.getFieldProps("courses")}
                type="checkbox"
                id="btech"
                name="courses"
                value="B.Tech"
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
            Sign Up
        </button>
    </div>

    <div className="text-center py-4">
        <span>
            Already a member?
            <Link className="text-red-600 ml-1" to="/">
                Sign In!
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

export default Register;
