import { FormLabel, styled } from "@mui/material";
import { BaseLabelPropsType } from "../../../type/component.type";

export const BaseLabel = styled(FormLabel)<BaseLabelPropsType>(({ colour, fontSize, fontWeight }) => {
    return {
        fontFamily: "Poppins",
        fontWeight: fontWeight || 500,
        fontSize: fontSize || "14px",
        lineHeight: "normal",
        color: colour || "#000000",
        marginBlock: "calc(var(--basic-margin)/4)",
        overflow: "hidden",
        textOverflow: "ellipsis",
    }
})