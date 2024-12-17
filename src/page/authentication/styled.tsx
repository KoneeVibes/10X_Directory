import { Container, styled } from "@mui/material";
import authBg from "../../assets/images/authbg.svg";

export const AuthenticationWrapper = styled(Container)(({ theme }) => {
    return {
        padding: 0,
        display: "flex",
        "& .form-box": {
            flex: 1,
            overflow: "hidden",
            padding: "var(--basic-padding) calc(var(--basic-padding) * 2)",
            display: "flex",
            alignItems: "center",
            "& form": {
                width: "100%",
            },
            "& .form-fields": {
                marginBlock: "var(--basic-margin)",
                "& fieldset": {
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                },
                "& .MuiInputBase-root": {
                    border: "1px solid #D9D9D9"
                }
            }
        },
        "& .image-box": {
            flex: 1,
            overflow: "hidden",
            borderTopLeftRadius: "45px",
            borderBottomLeftRadius: "45px",
            backgroundImage: `url(${authBg})`,
            backgroundSize: "cover",
            height: "100vh",
            backgroundPosition: "center",
        },
        "& .login-button-box": {
            overflow: "hidden"
        },
        [theme.breakpoints.down(768)]: {
            "& .form-box": {
                padding: "var(--basic-padding)",
                minHeight: "100vh",
                "& legend": {
                    fontSize: "28px",
                }
            },
            "& .image-box": {
                display: "none"
            },
            "& .form-fields": {
                marginBlockStart: "calc(var(--basic-margin) * 2) !important",
            }
        }
    }
});
