import { Dialog, styled } from "@mui/material";

export const BaseConfirmationModalWrapper = styled(Dialog)(({ theme }) => {
    return {
        "& .MuiDialogContent-root": {
            padding: "var(--basic-padding)",
            overflow: "unset",
            "& svg": {
                display: "block",
                marginLeft: "auto",
                marginRight: "auto"
            }
        },
        "& .MuiDialogActions-root": {
            gap: "calc(var(--flex-gap)/4)",
            alignItems: "stretch",
            padding: "0 var(--basic-padding) var(--basic-padding)",
            "& .MuiButton-root:last-of-type": {
                margin: 0
            },
            [theme.breakpoints.down("miniTablet")]: {
                flexDirection: "column"
            }
        }
    }
})