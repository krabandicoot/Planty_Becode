import React, {useState} from "react";
import axios from "axios";

export function SignUp () {
    const [user,setUser] = useState({
        username:"",
        email:"",
        password: "",
        confirmPassword: ""
    })
    const [passwordVisible, setPasswordVisible] = useState (false);

    const handleChange = e =>{
        const {name,value} = e.target
        setUser({
        ...user,//spread operator 
        [name]:value
        })
    }
//register function 
    // const register = ()=>{
    //     const {name,email,password} = user
    //     if (name && email && password){
    //         axios.post("http://localhost:6969/Register",user )
    //         .then(res=>console.log(res))
    //     }
    //     else{
    //         alert("invalid input")
    //     };

        return (
            <div className="signup__container-form m-[2em]">
            <form method="POST" className="signup__form" onSubmit={handleChange}>
    {/* username */}
                < div className="signup__form-username relative z-0 w-full mb-6 group">
                    <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    placeholder=" " 
                    required 
                    value={user.username} 
                    onChange={handleChange}/>
                    <label 
                    htmlFor="username" 
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                </div>
    {/* email */}
                <div className="signup__form-email relative z-0 w-full mb-6 group">
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    placeholder=" " 
                    required 
                    value={user.email} 
                    onChange={handleChange}/>
                    <label 
                    htmlFor="email" 
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
    {/* password */}
                <div className="signup__form-password relative z-0 w-full mb-6 group">
                    <input 
                    type={passwordVisible ? "text" : "password"} 
                    name="password" 
                    id="password" 
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    placeholder=" " 
                    required 
                    minLength={8} 
                    value={user.password} 
                    onChange={handleChange} />
                    <label 
                    htmlFor="floating_password" 
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Choose password</label>
                    <button onClick={()=> setPasswordVisible(! passwordVisible)}>()</button>
                </div>
    {/* confirm password */}
                <div className="signup__form-repeat_password relative z-0 w-full mb-6 group">
                    <input 
                    type="password" 
                    name="confirmPassword" 
                    id="confirmPassword" 
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    placeholder=" " 
                    required 
                    value={user.confirmPassword} 
                    onChange={handleChange}/>
                    <label 
                    htmlFor="floating_repeat_password" 
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                </div>
    {/* button sign up */}
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
            </form>
            </div>
        )
    // }
}

