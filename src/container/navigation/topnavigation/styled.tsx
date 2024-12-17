import { AppBar, styled } from "@mui/material";

export const TopNavigationWrapper = styled(AppBar)(({ theme }) => {
    return {
        position: "static",
        paddingRight: "0 !important",
        backgroundColor: "#FAFBFF",
        boxShadow: "none",
        "& .MuiToolbar-root": {
            minHeight: "var(--top-nav-height)",
            backgroundColor: "inherit",
            padding: "0 var(--basic-padding)",
        },
        "& .MuiInputBase-root": {
            gap: "calc(var(--flex-gap)/2)",
            boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
        },
        [theme.breakpoints.up("tablet")]: {
            width: "auto",
            position: "fixed",
            left: "var(--side-nav-width)",
        }
    }
})