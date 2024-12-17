import { Button, ButtonProps, styled } from "@mui/material";
import { BaseButtonPropType } from "../../type/component.type";

export const BaseButton = styled(Button)<ButtonProps & BaseButtonPropType>(({ variant, fontfamily, fontsize, fontweight, radius, padding, bgcolor, border, colour }) => {
    return {
        fontFamily: fontfamily || "Switzer",
        fontWeight: fontweight || 700,
        fontSize: fontsize || 13,
        lineHeight: "normal",
        borderRadius: radius || "10px",
        border: (variant === "contained") ? border || "none" : border,
        color: colour || "#FFFFFF",
        background: (variant === "contained") ? bgcolor : "transparent",
        padding: padding || "calc(var(--basic-padding)/2) calc(var(--basic-padding))",
        textTransform: "capitalize",
        minWidth: 0,
        "&:hover": {
            border: (variant === "contained") ? border || "none" : border,
            background: (variant === "contained") ? bgcolor : "transparent",
        }
    }
})