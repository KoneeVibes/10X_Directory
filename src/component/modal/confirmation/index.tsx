import { CircularProgress, DialogActions, DialogContent, Typography } from "@mui/material";
import { BaseConfirmationModalWrapper } from "./styled";
import { ConfirmationModalPropsType } from "../../../type/component.type";
import { CautionIcon, ConfirmationIcon, } from "../../../assets";
import { BaseButton } from "../../button/styled";

export const BaseConfirmationModal: React.FC<ConfirmationModalPropsType> = ({ open, className, error, isLoading, location, handleClickOutside, message, handleCallToActionClick }) => {
    return (
        <BaseConfirmationModalWrapper
            open={open}
            onClose={handleClickOutside}
            className={className}
        >
            <DialogContent>
                {(location === "Add-Opportunity") ? < ConfirmationIcon /> : <CautionIcon />}
                <Typography
                    variant="subtitle1"
                    fontFamily={"Switzer"}
                    fontWeight={600}
                    fontSize={20}
                    lineHeight={"normal"}
                    color="#474747"
                    textAlign={"center"}
                    whiteSpace={"normal"}
                    marginBlockStart={"calc(var(--basic-margin)/2)"}
                >
                    {message}
                </Typography>
                {error && <Typography
                    fontFamily={"Poppins"}
                    fontWeight={700}
                    fontSize={13}
                    lineHeight={"normal"}
                    color={"#FF0000"}
                    whiteSpace={"normal"}
                    marginBlockStart={"calc(var(--basic-margin)/2)"}
                    textAlign={"center"}
                >
                    {error}
                </Typography>}
            </DialogContent>
            <DialogActions>
                <BaseButton
                    variant="contained"
                    sx={{
                        width: "100%"
                    }}
                    radius="4px"
                    colour="#000000"
                    bgcolor="#E0E0E0"
                    disableElevation
                    onClick={(e) => handleCallToActionClick(e, "cancel")}
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
                        Cancel
                    </Typography>
                </BaseButton>
                <BaseButton
                    variant="contained"
                    sx={{
                        width: "100%"
                    }}
                    radius="4px"
                    colour="#FFFFFF"
                    bgcolor="#313131"
                    disableElevation
                    onClick={(e) => handleCallToActionClick(e, "yes")}
                >
                    {isLoading ? (
                        <CircularProgress color="inherit" className="loader" />
                    ) : (
                        <Typography
                            variant={"button"}
                            fontFamily={"inherit"}
                            fontWeight={"inherit"}
                            fontSize={"inherit"}
                            lineHeight={"inherit"}
                            color={"inherit"}
                            textTransform={"inherit"}
                        >
                            Yes
                        </Typography>
                    )}
                </BaseButton>
            </DialogActions>
        </BaseConfirmationModalWrapper>
    )
}
