import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { createUser } from "../utils/API";
import Auth from "../utils/auth";
import Header from "../components/Header";

export default function Signup() {
  const loggedIn = Auth.loggedIn();

  // set up the original state of the form
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  // set up state for validation errors
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // update state based on form input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    // validate the input and update errors
    validateInput(name, value);
  };

  // validate individual input field
  const validateInput = (name, value) => {
    switch (name) {
      case "username":
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: value.length < 3 ? "Username must be at least 3 characters long" : "",
        }));
        break;
      case "email":
        // Email validation with regular expression
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: emailRegex.test(value) ? "" : "Invalid email address",
        }));
        break;

      // // You can add more complex email validation if needed
      // setErrors((prevErrors) => ({
      //   ...prevErrors,
      //   email: value.includes("@") ? "" : "Invalid email address",
      // }));
      // break;
      case "password":
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: value.length < 6 ? "Password must be at least 6 characters long" : "",
        }));
        break;
      default:
        break;
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check for validation errors before submitting
    if (validateForm()) {
      // use try/catch to handle errors
      try {
        // create new user
        const response = await createUser(formState);

        // check the response
        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        else {
          window.location.href = "/signup"
        }
        // get token and user data from the server
        const { token } = await response.json();

        // use authentication functionality
        // Auth.login(token);
        alert("Signup successful!");
        window.location.href = "/login"
      } catch (err) {
        console.error(err);
        alert("Signup failed. Please check your credentials.");
      }
    } else {
      // If there are validation errors, show alert
      setShowAlert(true);
    }
  };

  // validate the entire form
  const validateForm = () => {
    const { username, email, password } = formState;

    // validate each field
    validateInput("username", username);
    validateInput("email", email);
    validateInput("password", password);

    // check if there are any errors
    return Object.values(errors).every((error) => error === "");
  };

  // If the user is logged in, redirect to the home page
  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="signup d-flex flex-column align-items-center justify-content-center text-center">
      <Header />
      <form onSubmit={handleFormSubmit} className="signup-form d-flex flex-column">
        {/* --------------------username-------------------- */}
        <label htmlFor="username">Username</label>
        <input
          className="form-input"
          value={formState.username}
          placeholder="Your username"
          name="username"
          type="text"
          onChange={handleChange}
        />
        {errors.username && <div className="error-message">{errors.username}</div>}

        {/* --------------------email-------------------- */}
        <label htmlFor="email">Email</label>
        <input
          className="form-input"
          value={formState.email}
          placeholder="youremail@gmail.com"
          name="email"
          type="email"
          onChange={handleChange}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}

        {/* -------------------- password-------------------- */}
        <label htmlFor="password">Password</label>
        <input
          className="form-input"
          value={formState.password}
          placeholder="********"
          name="password"
          type="password"
          onChange={handleChange}
        />
        {errors.password && <div className="error-message">{errors.password}</div>}

        {/* --------------------sign up btn-------------------- */}
        <div className="btn-div">
          <button
            //disabled={!(formState.username && formState.email && formState.password)}
            className="signup-btn mx-auto my-auto"
          >
            Sign Up
          </button>
        </div>

        {/* --------------------login link-------------------- */}
        <p className="link-btn">
          Already have an account?{' '}
          <Link to="/login">Log in</Link>
        </p>
        {showAlert && <div className="err-message">Signup failed or form is incomplete</div>}


      </form>
    </div>
  );
}





// import React, { useState } from "react";
// import { Link, Navigate } from "react-router-dom";
// import { createUser } from "../utils/API";
// import Auth from "../utils/auth";
// import Header from "../components/Header";


// export default function Signup() {
//   const loggedIn = Auth.loggedIn();

//   // set up the orginal state of the form
//   const [formState, setFormState] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   // set state for alert
//   const [showAlert, setShowAlert] = useState(false);

//   // update state based on form input
//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

//   // submit form
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     // use try/catch to handle errors
//     try {
//       // create new users
//       const response = await createUser(formState);

//       // check the response
//       if (!response.ok) {
//         throw new Error("something went wrong!");
//       }

//       // get token and user data from server
//       const { token } = await response.json();
//       // use authenticaiton functionality
//       Auth.login(token);
//       alert("Signup successful!");


//     } catch (err) {
//       console.error(err);
//       alert("Signup failed. Please check your credentials.");
//     }
//   };

//   // If the user is logged in, redirect to the home page
//   if (loggedIn) {
//     return <Navigate to="/" />;
//   }

//   return (

//     <div className="signup d-flex flex-column align-items-center justify-content-center text-center">
//       <Header />
//       <form onSubmit={handleFormSubmit} className="signup-form d-flex flex-column">
//         {/* --------------------username-------------------- */}
//         <label htmlFor="username">Username</label>
//         <input
//           className="form-input"
//           value={formState.username}
//           placeholder="Your username"
//           name="username"
//           type="username"
//           onChange={handleChange}
//         />

//         {/* --------------------email-------------------- */}
//         <label htmlFor="email">Email</label>
//         <input
//           className="form-input"
//           value={formState.email}
//           placeholder="youremail@gmail.com"
//           name="email"
//           type="email"
//           onChange={handleChange}
//         />

//         {/* -------------------- password-------------------- */}
//         <label htmlFor="password">Password</label>
//         <input
//           className="form-input"
//           value={formState.password}
//           placeholder="********"
//           name="password"
//           type="password"
//           onChange={handleChange}
//         />

//         {/* --------------------sign up btn-------------------- */}
//         <div className="btn-div">
//           <button disabled={!(formState.username && formState.email && formState.password)}
//             className="signup-btn mx-auto my-auto"
//           >Sign Up</button>
//         </div>

//         {/* --------------------login link-------------------- */}
//         <p className="link-btn">
//           Already have an account?{' '}
//           <Link to="/login">Log in</Link>
//         </p>
//         {showAlert && <div className="err-message">Signup failed</div>}

//         {/* --------------------admin link-------------------- */}
//         {/* <p className="link-btn">
//           You are Admin ?{' '}
//           <Link to="/admin">Admin Log in</Link>
//         </p> */}
//       </form>
//     </div>
//   );
// }
