import axios from "/node_modules/.vite/deps/axios.js?v=1d2124b0";
import * as jwt_decode from "/node_modules/.vite/deps/jwt-decode.js?v=1d2124b0"; 


axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_DOMAIN; 


/** Make API Requests */


/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    return decode;
}

/** authenticate function */
export async function authenticate(username){
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

/** get User details */
export async function getUser({ username }){
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}

/** register user function */
export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post(`/api/register`, credentials);

        let { username, email, profile, mobile, designation, gender, courses } = credentials;

        /** send email */
        if (status === 201) {
            await axios.post('/api/registerMail', { username, userEmail: email, text: msg })
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** login function */
export async function verifyPassword({ username, password }){
    try {
        if(username){
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/** update user profile function */
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}

/** generate OTP */
export async function generateOTP(username){
    try {
        const {data : { code }, status } = await axios.get('/api/generateOTP', { params : { username }});

        // send mail with the OTP
        if(status === 201){
            let { data : { email }} = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { username, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** Fetch Designations */
export async function fetchDesignations() {
    try {
      const { data } = await axios.get("/api/designations");
      return data;
    } catch (error) {
      console.error("Error fetching designations:", error);
      return [];
    }
  }
  
  /** Fetch Courses */
  export async function fetchCourses() {
    try {
      const { data } = await axios.get("/api/courses");
      return data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      return [];
    }
  }
  
  /** Fetch Genders */
  export async function fetchGenders() {
    try {
      const { data } = await axios.get("/api/genders");
      return data;
    } catch (error) {
      console.error("Error fetching genders:", error);
      return [];
    }
  }
