import { InputBase, styled } from "@mui/material";
import { BaseInputPropsType } from "../../../type/component.type";

export const BaseInput = styled(InputBase)<BaseInputPropsType>(({ colour, bgcolor, fontweight, fontsize, border, borderradius }) => {
    return {
        fontFamily: "Inter",
        fontWeight: fontweight || 400,
        fontSize: fontsize || "16px",
        lineHeight: "normal",
        border: border || "none",
        borderRadius: borderradius || "12px",
        color: colour || "#8E8E8E",
        backgroundColor: bgcolor || "transparent",
        padding: "calc(var(--basic-padding)/2)",
        outline: "none",
        "& .MuiInputBase-input": {
            textOverflow: "ellipsis",
            padding: 0,
        }
    }
})