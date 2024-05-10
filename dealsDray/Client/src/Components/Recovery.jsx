import React from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/store";
import styles from "../styles/Username.module.css";
import { generateOTP, verifyOTP } from '../Helper/helper';
import { useNavigate } from 'react-router-dom'


const Recovery = () => {
  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP)
      if(OTP) return toast.success('OTP has been send to your email!');
      return toast.error('Problem while generating OTP!')
    })
  }, [username]);

  async function onSubmit(e){
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code : OTP })
      if(status === 201){
        toast.success('Verify Successfully!')
        return navigate('/reset')
      }  
    } catch (error) {
      return toast.error('Wront OTP! Check email again!')
    }
  }

  // handler of resend OTP
  function resendOTP(){

    let sentPromise = generateOTP(username);

    toast.promise(sentPromise ,
      {
        loading: 'Sending...',
        success: <b>OTP has been send to your email!</b>,
        error: <b>Could not Send it!</b>,
      }
    );

    sentPromise.then((OTP) => {
      console.log(OTP)
    });
    
  }

  return (
    <>
      <div className="container pop flex flex-col mx-auto justify-center items-center">
        <Toaster position="top-center" reverseOrder="false"></Toaster>
        <div className={styles.glass} style={{width: "50%"}}>
          <div className="flex flex-col justify-center items-center h-screen">
            <img src="./deals.svg" alt="logo" className="h-12 w-12 p-1" />
            <h4 className="text-4xl font-bold">Recover Password!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password.
            </span>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="flex justify-center py-4">
                <img src=' ./src/assets/recover.png' alt="avatar" className={styles.profile_img} />
                
              </div>
              <div className="text-center"><span className="py-4 text-sm text-left text-gray-600">Enter 6 digit OTP sent to your email address.</span></div>

              <div className="textbox flex-col flex mt-5 justify-center  items-center">
                <input
                  {...formik.getFieldProps("password")}
                  className={styles.textbox}
                  type="password"
                  placeholder="OTP"
                />

                <button type="submit" className={styles.btn}>
                  {" "}
                  Recover
                </button>
              </div>

              
            </form>

            <div className="text-center py-4">
                <span>
                  Didn't receive OTP?
                  <span className="text-red-600 ml-1">
                   Resend OTP!
                  </span>
                </span>
              </div>
              
          </div>
        </div>
      </div>
    </>
  );
};

export default Recovery;
