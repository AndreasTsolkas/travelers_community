import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import * as Important from "src/important";
import * as Requests from "src/requests";
import { httpClient } from "src/requests";
import "../basic.css";

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const authUrl = Important.authUrl;
  const profileUrl = Important.profileUrl;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [cookies, setCookie] = useCookies();

  const accessTokenCookie = Important.accessTokenCookie;
  const avatarImageUrlCookie = Important.avatarImageUrlCookie;
  const fileReader = new FileReader();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const signInUrl = authUrl + "/signin";
    const getAvatarUrl = profileUrl + "/avatar";
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      setIsLoading(true);
      let response = await httpClient.post(signInUrl, { email, password });
      const token = response.data.access_token;
      setCookie(accessTokenCookie, token);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      Requests.initializeAxiosConfig(); // It initialize the configuration that each request will use

      response = await axios.get(getAvatarUrl, { responseType: "arraybuffer" });
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const base64image = fileReader.result as string;

        // Save Base64 image to local storage
        localStorage.setItem("avatarImageUrl", base64image);
      };
    } catch (error: any) {
      console.log(error?.response?.status);
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const token = cookies[accessTokenCookie];
    if (token) {
      navigate("/");
    }
  }, [navigate, cookies[accessTokenCookie]]);

  return (
    <div className="authentication-pages">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {isLoading ? (
              <Box sx={{ display: "flex", mt: 2 }}>
                <CircularProgress sx={{ color: "blue" }} />
              </Box>
            ) : (
              <>
                <Avatar
                  sx={{ width: 124, height: 134, marginBottom: "30px" }}
                  src={Important.appLogoImage}
                />
                <Typography component="h1" variant="h5">
                  Sign In
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    className="icon-button-no-focus"
                    type="submit"
                    color="primary"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link fontSize="1.25rem" href="/signup" variant="body2">
                        {"You do not have an account; Register here"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
