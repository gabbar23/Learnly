/**
 * Author: Amanjot Singh <am854663@dal.ca/B00942293>
 *
 * FormComp is a functional React component representing a form with email and password
 * input fields along with Google login functionality.
 * It provides feedback to the user with Snackbars and validation messages.
 */

import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./formComp.css";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import GoogleIcon from "@mui/icons-material/Google";
import { SiGoogle } from "react-icons/si";
import { CHECK_EMAIL_EXIST, USER_DATA_UPDATE } from "../../../utils/apiUrls";
import axios from "axios";
import { LOGIN_USER } from "../../../utils/apiUrls";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../utils/fireBase";
const providerGoogle = new GoogleAuthProvider();

export default function FormComp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Google Login handler
  const handleGoogleLogin = () => {
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        // Extract user data from the Google login result
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const email = result.user.email;
        const name = result.user.displayName.split(" ");
        const firstName = name[0];
        const lastName = name[1];

        // Check if the email exists in the backend using Axios
        const user = { email: email, isGoogle: true };
        axios
          .post(CHECK_EMAIL_EXIST, { user })
          .then((response) => {
            // Successfully logged in with Google, redirect
            localStorage.setItem("user", JSON.stringify(response.data.user));
            handleSnackbarOpen(
              "Successfully Logged in with Google. Redirecting..."
            );
            setTimeout(() => {
              navigate("/", { state: response.data.user });
            }, 2000);
          })
          .catch((err) => {
            // Redirect to the next form after a delay
            handleSnackbarOpen(
              "Successfully Signed in with Google. Redirecting..."
            );
            setTimeout(() => {
              navigate("/about-you", {
                state: {
                  email,
                  firstName,
                  lastName,
                  password: email,
                  isGoogle: true,
                },
              });
            }, 1500);
          });
      })
      .catch((error) => {
        // Handle Google login errors
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEmailValid(!!email);
    setIsPasswordValid(!!password);

    if (!email || !password) {
      return;
    }

    // Attempt to log in the user with the provided credentials
    setEmail("");
    setPassword("");
    setIsEmailValid(true);
    setIsPasswordValid(true);
    try {
      axios.post(USER_DATA_UPDATE, {
        body: `User logged in: ${email}`,
        title: "User Loggedin",
      });
    } catch {
      console.log("Not able to send mail");
    }
    axios
      .post(LOGIN_USER, { email, password, isGoogle: false })
      .then((response) => {
        if (response.status === 200) {
          // Successful login, redirect
          handleSnackbarOpen("Logged in successfully. Redirecting...");
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setTimeout(() => {
            navigate("/", { state: response.data.user });
          }, 200);
        } else {
          // Login failed
          handleSnackbarOpen("Login failed. Wrong Credentials!");
        }
      })
      .catch((error) => {
        handleSnackbarOpen("Login failed. Wrong Credentials!");
      });
  };

  // Snackbar open handler
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  // Snackbar close handler
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Grid container spacing={0}>
        {/* Email Input */}
        <Grid className="text-fields" item xs={12} md={6} lg={6} xl={6}>
          <TextField
            required
            sx={{ width: "90%" }}
            id="outlined-required"
            placeholder="xyz@gmail.com"
            label="Email"
            type="email"
            InputLabelProps={{
              shrink: true,
            }}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={!isEmailValid}
            helperText={
              !isEmailValid
                ? email
                  ? "Please enter a valid email address"
                  : "Please enter your email"
                : ""
            }
          />
        </Grid>

        {/* Password Input */}
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <FormControl
            error={!isPasswordValid}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              InputLabelProps={{
                shrink: true,
              }}
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <FormHelperText>
              {!isPasswordValid
                ? password
                  ? "Password should be more than 8 digits"
                  : "Please enter your password"
                : ""}
            </FormHelperText>
          </FormControl>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "90%",
              bgcolor: "#1D267D",
              color: "white",
              fontSize: "1rem",
              marginTop: "3px",
              letterSpacing: "3px",
              "&:hover": {
                bgcolor: "#0C134F",
              },
            }}
          >
            Submit
          </Button>
        </Grid>

        {/* Google Login Button */}
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <Button
            variant="contained"
            startIcon={<SiGoogle style={{ color: "#DB4437" }} />}
            onClick={handleGoogleLogin}
            sx={{
              width: "90%",
              bgcolor: "#ffff",
              borderColor: "#4285F4",
              color: "#000000",
              fontSize: "1rem",
              marginTop: "3px",
              "&:hover": {
                bgcolor: "#000000",
                color: "#ffff",
              },
            }}
          >
            Continue with Google
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar to show success or error message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={
            snackbarMessage.toLowerCase().includes("successfully")
              ? "success"
              : "error"
          }
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
