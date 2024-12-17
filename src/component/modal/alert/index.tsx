import { DialogActions, DialogContent, Typography } from "@mui/material";
import { BaseAlertModalWrapper } from "./styled";
import { AlertModalPropsType } from "../../../type/component.type";
import { ConfirmationIcon } from "../../../assets";
import { BaseButton } from "../../button/styled";

export const BaseAlertModal: React.FC<AlertModalPropsType> = ({ open, className, handleClickOutside, message, handleCallToActionClick, callToAction }) => {
    return (
        <BaseAlertModalWrapper
            open={open}
            onClose={handleClickOutside}
            className={className}
        >
            <DialogContent>
                <ConfirmationIcon />
                <Typography
                    variant="subtitle1"
                    fontFamily={"Switzer"}
                    fontWeight={600}
                    fontSize={20}
                    lineHeight={"normal"}
                    color="#667085"
                    textAlign={"center"}
                    whiteSpace={"normal"}
                >
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions>
                <BaseButton
                    variant="contained"
                    sx={{
                        width: "100%"
                    }}
                    radius="4px"
                    colour="#FFFFFF"
                    bgcolor="#313131"
                    onClick={handleCallToActionClick}
                >
                    <Typography
                        variant={"button"}
                        fontFamily={"inherit"}
                        fontWeight={"inherit"}
                        fontSize={"inherit"}
                        lineHeight={"inherit"}
                        color={"inherit"}
                        textTransform={"inherit"}
                    >
                        {callToAction}
                    </Typography>
                </BaseButton>
            </DialogActions>
        </BaseAlertModalWrapper>
    )
}
