// import React from 'react'
// import '../../assets/Signup_fonts/material-design-iconic-font/css/material-design-iconic-font.min.css'
// import '../../assets/css/signup_style.css'
// import { useForm } from 'react-hook-form';

// export const Signup = () => {
//   const {register,handleSubmit,formState:{errors}} = useForm();
//   console.log("errors...",errors);

//   const submitHandler = (data)=>{
//     console.log(data);
//   }

//   const validationSchema = {
//     usernameValidator:{
//       required:{
//         value:true,
//         message:"Username is required"
//       },
//       minLength:{
//         value:3,
//         message:"Username must be at least 3 characters"
//     },
//     },
//     emailValidator:{
//       required:{
//           value:true,
//           message:"Email is required"
//       }
//   },
//   }
//   return (
//     <div className="wrapper forimg1">
//   <div className="inner">
//     <form action="">
//       <h3>Signup</h3>
//       <div className="form-group">
//         <div className="form-wrapper">
//           <label htmlFor="">Username:</label>
//           <div className="form-holder">
//             <i className="zmdi zmdi-account-o" />
//             <input type="text" className="form-control" />
//           </div>
//         </div>
//         <div className="form-wrapper">
//           <label htmlFor="">Email:</label>
//           <div className="form-holder">
//             <i style={{ fontStyle: "normal", fontSize: 15 }}>@</i>
//             <input type="email" className="form-control" />
//           </div>
//         </div>
//       </div>

//       <div className="form-group">
//         <div className="form-wrapper">
//           <label htmlFor="">Phone Number:</label>
//             <div className="form-holder">
//             <i className="icon-phone-square" />
//             <input type="tel" className="form-control" />
//           </div>
//         </div>
//         <div className="form-wrapper">
//           <label htmlFor="">Gender:</label>
//           <div className="form-holder select">
//             <select name="" id="" className="form-control">
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//             <i className="zmdi zmdi-face" />
//           </div>
//         </div>
//       </div>
//       <div className="form-group">
//         <div className="form-wrapper">
//           <label htmlFor="">Password:</label>
//           <div className="form-holder">
//             <i className="zmdi zmdi-lock-outline" />
//             <input
//               type="password"
//               className="form-control"
//               placeholder="********"
//             />
//           </div>
//         </div>
//         <div className="form-wrapper">
//           <label htmlFor="">Repeat Password:</label>
//           <div className="form-holder">
//             <i className="zmdi zmdi-lock-outline" />
//             <input
//               type="password"
//               className="form-control"
//               placeholder="********"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="form-end">
//         <div className="checkbox">
//           <label>
//             <input type="checkbox" /> 
//             I agree to the Terms and Conditions and Privacy Policy.
//             <span className="checkmark" />
//           </label>
//         </div>
//         <div className="button-holder">
//           <button>Register Now</button>
//         </div>
//       </div>
//     </form>
//   </div>
// </div>
//   )
// }

import React, { useState } from "react";
// import "../../assets/Signup_fonts/material-design-iconic-font/css/material-design-iconic-font.min.css";
// import "../../assets/css/signup_style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "male",
    password: "",
    repeatPassword: "",
    agree: false,
  });

  const navigate = useNavigate()

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.repeatPassword) {
      newErrors.repeatPassword = "Please confirm your password";
    } else if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
    }

    if (!formData.agree) {
      newErrors.agree = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();   
    axios.post('http://localhost:3000/register',formData)
    .then(result => {console.log(result)
      navigate('/signin')
    })
    .catch(err=>console.log(err))
    if (validate()) {
      console.log("Form submitted:", formData);
      alert("Registration successful!");
    } 
  };

  return (
    <div className="wrapper forimg1">
      <div className="inner">
        <form onSubmit={handleSubmit}>
          <h3>Signup</h3>

          <div className="form-group">
            <div className="form-wrapper">
              <label htmlFor="username">Username:</label>
              <div className="form-holder">
                <i className="zmdi zmdi-account-o" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div className="form-wrapper">
              <label htmlFor="email">Email:</label>
              <div className="form-holder">
                <i style={{ fontStyle: "normal", fontSize: 15 }}>@</i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
          </div>

          <div className="form-group">
            <div className="form-wrapper">
              <label htmlFor="phone">Phone Number:</label>
              <div className="form-holder">
                <i className="icon-phone-square" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
            <div className="form-wrapper">
              <label htmlFor="gender">Gender:</label>
              <div className="form-holder select">
                <select
                  id="gender"
                  name="gender"
                  className="form-control"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <i className="zmdi zmdi-face" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="form-wrapper">
              <label htmlFor="password">Password:</label>
              <div className="form-holder">
                <i className="zmdi zmdi-lock-outline" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="form-wrapper">
              <label htmlFor="repeatPassword">Repeat Password:</label>
              <div className="form-holder">
                <i className="zmdi zmdi-lock-outline" />
                <input
                  type="password"
                  id="repeatPassword"
                  name="repeatPassword"
                  className="form-control"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.repeatPassword && (
                <p className="error">{errors.repeatPassword}</p>
              )}
            </div>
          </div>

          <div className="form-end">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                />{" "}
                I agree to the Terms and Conditions and Privacy Policy.
                <span className="checkmark" />
              </label>
            </div>
            {errors.agree && <p className="error">{errors.agree}</p>}
            <div className="button-holder">
              <button type="submit">Register Now</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};