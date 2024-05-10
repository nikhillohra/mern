import toast from 'react-hot-toast';
import { authenticate } from './helper';

/** validate login page username */
export async function usernameValidate(values) {
    const errors = {};
    usernameVerify(errors, values);

    if (values.username) {
        try {
            // check if user exists
            const { status } = await authenticate(values.username);
            if (status !== 200) {
                errors.username = 'User does not exist...!';
                toast.error(errors.username);
            }
        } catch (error) {
            console.error('Error during username validation:', error);
            toast.error('Could not check username.');
        }
    }

    return errors;
}

/** validate password */
export function passwordValidate(values) {
    const errors = passwordVerify(values);
    return errors;
}

/** validate reset password */
export function resetPasswordValidation(values) {
    const errors = passwordVerify(values);

    if (values.password !== values.confirm_pwd) {
        errors.confirm_pwd = 'Password not match...!';
    }

    return errors;
}

/** validate register form */
export function registerValidation(values) {
    const errors = {};
    usernameVerify(errors, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);
    designationVerify(errors, values);
    genderVerify(errors, values);
    courseVerify(errors, values);

    return errors;
}

/** validate profile page */
export function profileValidation(values) {
    const errors = {};
    emailVerify(errors, values);
    return errors;
}

/** ************************************************* */

/** validate password */
function passwordVerify(values) {
    const errors = {};
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values.password) {
        errors.password = 'Password Required...!';
    } else if (values.password.includes(' ')) {
        errors.password = 'Wrong Password...!';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be more than 6 characters long';
    } else if (!specialChars.test(values.password)) {
        errors.password = 'Password must have special character';
    }

    return errors;
}

/** validate username */
function usernameVerify(errors, values) {
    if (!values.username) {
        errors.username = 'Username Required...!';
    } else if (values.username.includes(' ')) {
        errors.username = 'Invalid Username...!';
    }

    return errors;
}

/** validate email */
function emailVerify(errors, values) {
    if (!values.email) {
        errors.email = 'Email Required...!';
    } else if (values.email.includes(' ')) {
        errors.email = 'Wrong Email...!';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address...!';
    }

    return errors;
}

/** validate designation */
function designationVerify(errors, values) {
    if (!values.designation) {
        errors.designation = 'Designation Required...!';
    }

    return errors;
}

/** validate gender */
function genderVerify(errors, values) {
    if (!values.gender) {
        errors.gender = 'Gender Required...!';
    }

    return errors;
}

/** validate course */
function courseVerify(errors, values) {
    if (!values.courses || values.courses.length === 0) {
        errors.courses = 'Courses Required...!';
    }

    return errors;
}
