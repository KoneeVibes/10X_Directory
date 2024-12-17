import { Stack, styled } from "@mui/material";

export const AddUserFormWrapper = styled(Stack)(() => {
    return {
        gap: "var(--flex-gap)",
        padding: "0 var(--basic-padding) var(--basic-padding)",
        overflow: "hidden",
        "& .MuiInputBase-root": {
            border: "0.89px solid #CACACA",
            borderRadius: "4px",
            color: "#000000",
        },
    }
})
