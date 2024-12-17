import { styled } from "@mui/material";

export const BaseLegend = styled("legend")(() => {
    return {
        fontFamily: "Poppins",
        fontWeight: 500,
        fontSize: "32px",
        lineHeight: "normal",
        color: "#000000",
        overflow: "hidden",
        textOverflow: "ellipsis",
    }
})