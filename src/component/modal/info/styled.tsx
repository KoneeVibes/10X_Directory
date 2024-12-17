import { Dialog, styled } from "@mui/material";

export const BaseInfoModalWrapper = styled(Dialog)(() => {
    return {
        "& .MuiDialogTitle-root": {
            fontFamily: "Switzer",
            fontWeight: 600,
            fontSize: 24,
            lineHeight: "normal",
            textAlign: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            padding: "var(--basic-padding)",
        },
        "& .MuiDialogContent-root": {
            padding: "var(--basic-padding) 0 !important",
            margin: "0 var(--basic-margin)",
            overflow: "unset",
            borderTop: "0.5px solid #CACACA",
            borderBottom: "0.5px solid #CACACA",
        },
        "& .MuiDialogActions-root": {
            padding: "var(--basic-padding)",
        }
    }
})