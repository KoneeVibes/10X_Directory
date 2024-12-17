import { MenuItem, styled } from "@mui/material";
import { BaseInputPropsType } from "../../../type/component.type";

export const BaseOption = styled(MenuItem)<BaseInputPropsType>(({ colour, fontweight, fontsize }) => {
    return {
        fontFamily: "Switzer",
        fontWeight: fontweight || 400,
        fontSize: fontsize || "14px",
        lineHeight: "normal",
        color: colour || "#000000",
        padding: "calc(var(--basic-padding)/2)",
    }
})