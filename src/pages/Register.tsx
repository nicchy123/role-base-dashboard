import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button, CssBaseline, TextField, Typography } from "@mui/material";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import { useState } from "react";
type ValidationErrors = Record<string, string>;
const Register = () => {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const onsubmit = async (data: FieldValues) => {
    try {
      const userInfo = {
        name: data.name as string,
        email: data.email as string,
        password: data.password as string,
      };

      const result = await registerUser(userInfo).unwrap();
      console.log(result);
      if (result.success) {
        navigate("/login");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.data?.errorSources) {
        const errors: ValidationErrors = {};
        error.data.errorSources.forEach((err: any) => {
          console.log(err);

          errors[err.path.toString()] = err.message;
          setValidationErrors(errors);
        });
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 10px",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onsubmit)}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            autoComplete="name"
            autoFocus
            {...register("name", { required: "Name is required" })}
          />
             <p style={{ color: "red" }}>{validationErrors["name"]}</p>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            {...register("email", { required: "Email is required" })}
          />
             <p style={{ color: "red" }}>{validationErrors["email"]}</p>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            {...register("password", { required: "Password is required" })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? "Registering" : "Register"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
