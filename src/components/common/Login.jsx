// import React from 'react'
// import '../../assets/fonts/icomoon/style.css'
// import '../../assets/css/owl.carousel.min.css'
// import '../../assets/css/bootstrap.min.css'
// import '../../assets/css/login_style.css'

// export const Login = () => {
//   return (
//     <div className="d-lg-flex half">
//   <div
//     className="bg order-1 order-md-2 forimg"  
//   />
//   <div className="contents order-2 order-md-1">
//     <div className="container">
//       <div className="row align-items-center justify-content-center">
//         <div className="col-md-7">
//           <h3>
//              <strong>Sign In</strong>
//           </h3>
//           <p className="mb-4">
//             Sign in with existing profile
//           </p>
//           <form action="#" method="post">
//             <div className="form-group first">
//               <label htmlFor="username">Email</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="your-email@gmail.com"
//                 id="username"
//               />
//             </div>
//             <div className="form-group last mb-3">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 placeholder="Your Password"
//                 id="password"
//               />
//             </div>
//             <div className="d-flex mb-5 align-items-center">
//               <label className="control control--checkbox mb-0">
//                 <span className="caption">Remember me</span>
//                 <input type="checkbox" defaultChecked="checked" />
//                 <div className="control__indicator" />
//               </label>
//               <span className="ml-auto">
//                 <a href="#" className="forgot-pass">
//                   Forgot Password
//                 </a>
//               </span>
//             </div>
//             <input
//               type="submit"
//               defaultValue="Log In"
//               className="btn btn-block btn-primary"
//             />
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//   )
// }


import React, { useState } from "react";
import "../../assets/fonts/icomoon/style.css";
import "../../assets/css/owl.carousel.min.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/login_style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const navigate = useNavigate()

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
    axios.post('http://localhost:3000/signin',formData)
    .then(result => {
      console.log(result)
      if(result.data === "Success"){
        navigate('/')
      }      
    })
    .catch(err=>console.log(err))
    if (validate()) {
      console.log("Login successful:", formData);
      alert("Login successful!");
    }
  };

  return (
    <div className="d-lg-flex half">
      <div className="bg order-1 order-md-2 forimg" />
      <div className="contents order-2 order-md-1">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7">
              <h3>
                <strong>Sign In</strong>
              </h3>
              <p className="mb-4">Sign in with existing profile</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group first">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="your-email@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group last mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Your Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div className="d-flex mb-5 align-items-center">
                  <label className="control control--checkbox mb-0">
                    <span className="caption">Remember me</span>
                    <input
                      type="checkbox"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                    />
                    <div className="control__indicator" />
                  </label>
                  <span className="ml-auto">
                    <a href="#" className="forgot-pass">
                      Forgot Password
                    </a>
                  </span>
                </div>
                <button type="submit" className="btn btn-block btn-primary">
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
