import { Box, styled } from "@mui/material";

export const MainAreaWrapper = styled(Box)(({ theme }) => {
    return {
        top: "var(--top-nav-height)",
        padding: "var(--basic-padding)",
        [theme.breakpoints.up("tablet")]: {
            position: "absolute",
            left: "calc(var(--side-nav-width) + 1.5px)",
            right: 0,
        }
    }
})