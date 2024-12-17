import { Select, styled } from "@mui/material";
import { BaseInputPropsType } from "../../../type/component.type";

export const BaseSelect = styled(Select)<BaseInputPropsType>(({ colour, bgcolor, fontweight, fontsize }) => {
    return {
        fontFamily: "Switzer",
        fontWeight: fontweight || 400,
        fontSize: fontsize || "14px",
        lineHeight: "normal",
        border: "0.89px solid #CACACA",
        borderRadius: "4px",
        color: colour || "#000000",
        backgroundColor: bgcolor || "transparent",
        padding: "calc(var(--basic-padding)/2)",
        outline: "none",
        "& .MuiInputBase-input": {
            textOverflow: "ellipsis",
            padding: 0,
        },
        "& .MuiOutlinedInput-notchedOutline": {
            outline: "none",
            border: "none !important",
        },
        "& fieldset": {
            border: "0.89px solid #CACACA",
        }
    }
})