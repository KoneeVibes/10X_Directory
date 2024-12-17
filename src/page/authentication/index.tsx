import { Box, CircularProgress, Typography } from "@mui/material";
import { AuthenticationWrapper } from "./styled";
import { BaseLegend } from "../../component/form/legend/styled";
import { BaseInput } from "../../component/form/input/styled";
import { BaseFieldSet } from "../../component/form/fieldset/styled";
import { BaseLabel } from "../../component/form/label/styled";
import { useState } from "react";
import { BaseButton } from "../../component/button/styled";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { signInUser } from "../../util/api/authentication/signInUser";
import { jwtDecode } from "jwt-decode";
import { DecodedUserType } from "../../type/config.type";

export const Authentication = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formDetails, setFormDetails] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const response = await signInUser("TOKEN", formDetails);
            if (response.status === "success") {
                setIsLoading(false);
                cookies.set("TOKEN", response.token, {
                    path: "/",
                });
                const decoded: DecodedUserType = jwtDecode(response.token);
                if (!["Super Admin", "Admin", "Support"].includes(decoded?.role)) {
                    return navigate("/opportunities")
                }
                navigate("/users");
            } else {
                setIsLoading(false);
                setError('Authentication failed. Please check your credentials and try again.');
            }
        } catch (error: any) {
            setIsLoading(false);
            setError(`Login failed. ${error.message}`);
            console.error('Login failed:', error);
        }
    };

    return (
        <AuthenticationWrapper
            maxWidth={false}
        >
            <Box
                component={"div"}
                className="form-box"
            >
                <form
                    onSubmit={handleSubmit}
                >
                    <BaseLegend>
                        Welcome back!
                    </BaseLegend>
                    <Typography
                        variant="body1"
                        fontFamily={"Poppins"}
                        fontWeight={500}
                        fontSize={16}
                        lineHeight={"normal"}
                        color="#000000"
                        whiteSpace={"normal"}
                    >
                        Enter your Credentials to access your account
                    </Typography>
                    <Box
                        component={"div"}
                        className="form-fields"
                    >
                        <BaseFieldSet>
                            <BaseLabel>
                                Email Address
                            </BaseLabel>
                            <BaseInput
                                required
                                type="email"
                                name="email"
                                value={formDetails.email}
                                placeholder="Enter your email"
                                onChange={(e) => handleChange(e)}
                            />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <BaseLabel>
                                Password
                            </BaseLabel>
                            <BaseInput
                                required
                                type="password"
                                name="password"
                                value={formDetails.password}
                                placeholder="Enter your password"
                                onChange={(e) => handleChange(e)}
                            />
                        </BaseFieldSet>
                    </Box>
                    {error && <Typography
                        fontFamily={"Poppins"}
                        fontWeight={700}
                        fontSize={13}
                        lineHeight={"normal"}
                        color={"#FF0000"}
                        whiteSpace={"normal"}
                        marginBlockEnd={"calc(var(--basic-margin)/2)"}
                    >
                        {error}
                    </Typography>}
                    <Box
                        component={"div"}
                        className="login-button-box"
                    >
                        <BaseButton
                            type="submit"
                            variant="contained"
                            sx={{
                                width: "100%"
                            }}
                            bgcolor={"#000000"}
                        >
                            {isLoading ? (
                                <CircularProgress color="inherit" className="loader" />
                            ) : (
                                <Typography
                                    variant={"button"}
                                    fontFamily={"inherit"}
                                    fontWeight={"inherit"}
                                    fontSize={"inherit"}
                                    lineHeight={"inherit"}
                                    color={"inherit"}
                                    textTransform={"inherit"}
                                >
                                    Login
                                </Typography>
                            )}
                        </BaseButton>
                    </Box>
                </form>
            </Box>
            <Box
                component={"div"}
                className="image-box"
            />
        </AuthenticationWrapper>
    )
}