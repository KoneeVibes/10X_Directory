import { Dialog, styled } from "@mui/material";

export const BaseAlertModalWrapper = styled(Dialog)(() => {
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
            padding: "0 var(--basic-padding) var(--basic-padding)",
        }
    }
})