import { Avatar, Grid, Paper, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useRef } from "react";
import { loginAPI } from "../apis";
import { useMutation, useQueryClient } from "react-query";

const Login = () => {
    const paperStyle = {
        padding: "20px",
        height: "70vh",
        width: 280,
        margin: "20px auto",
    };
    const avatarStyle = { backgroundColor: "#509eb2" };
    const btnStyle = { margin: "8px 0" };
    const queryClient = useQueryClient();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const userLoginMutation = useMutation(loginAPI, {
        onSuccess: (response) => {
            console.log("Success response data", response);
            const accessToken = response.data.authorization.access_token;
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", accessToken);
            queryClient.invalidateQueries("api/login");
        },
        onError: (error) => {
            console.log("Error: ", error);
        },
    });

    const onSignIn = async (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        let payload = { email: username, password: password };

        userLoginMutation.mutate(payload);
    };

    return (
        <>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <h2> Sign In</h2>
                    </Grid>
                    <TextField
                        variant="standard"
                        id="username"
                        label="username"
                        placeholder="Enter username"
                        fullWidth
                        required
                        inputRef={usernameRef}
                    />
                    <TextField
                        variant="standard"
                        id="password"
                        label="password"
                        placeholder="Enter passwords"
                        fullWidth
                        required
                        type="password"
                        inputRef={passwordRef}
                    />

                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Remember me"
                        />
                    </FormGroup>

                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        fullWidth
                        style={btnStyle}
                        onClick={onSignIn}
                    >
                        {userLoginMutation.isLoading && "Loading..."}
                        Sign In
                    </Button>
                    <Typography>
                        <Link href="#">Forgot password ?</Link>
                    </Typography>
                    <Typography>
                        Do you have an account ?<Link href="#">Sign Up</Link>
                    </Typography>
                </Paper>
            </Grid>
        </>
    );
};

export default Login;
