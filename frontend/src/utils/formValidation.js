import { object, string } from "yup"

const userSchema = object().shape({
    name: string().required("Name required").min(3).matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Invalid Name"),
    email: string().required("Email is required").email("Invalid Email"),
    password: string().required("Password is Required").min(8, "Password must at least 8 Characters").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must contain at least one uppercase, one lowercase, one number and one special character"),
    mobNo: string().optional().matches(/^[6-9]\d{9}$/, "Mobile number must be exactly 10 digits"),
    address: object().shape({
        city: string().optional().matches(/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/, "Invalid City Name"),
        pincode: string()
            .required("Pincode is required")
            .matches(/^[1-9][0-9]{5}$/, "Pincode must be exactly 6 digits"),
        state: string().optional().matches(/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/, "Invalid State"),
        addressLine: string().required("Address is required").matches(/^[A-Za-z0-9\s,.'#/&()-]{5,150}$/, "Invalid Address")
    }),


})

export default userSchema;