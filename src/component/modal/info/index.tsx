import { Box, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { BaseInfoModalWrapper } from "./styled";
import { InfoModalPropsType } from "../../../type/component.type";
import { BaseButton } from "../../button/styled";
import { Fragment } from "react/jsx-runtime";

export const BaseInfoModal: React.FC<InfoModalPropsType> = ({
    open, className, handleClickOutside, title, subtitle, details, location, thumbnail, handleCallToActionClick, callToAction
}) => {
    return (
        <BaseInfoModalWrapper
            open={open}
            onClose={handleClickOutside}
            className={className}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                {(location === "Opportunities") && (
                    <Fragment>
                        <Typography
                            variant="subtitle1"
                            fontFamily={"Switzer"}
                            fontWeight={600}
                            fontSize={16}
                            lineHeight={"normal"}
                            color="#000000"
                            marginBlockEnd={"calc(var(--basic-margin)/2)"}
                        >
                            {subtitle}
                        </Typography>
                        {thumbnail}
                        <Box>
                            <Stack
                                gap={{ mobile: "calc(var(--flex-gap)/8)", miniTablet: "var(--flex-gap)" }}
                                justifyContent={"space-between"}
                                direction={{ miniTablet: "row" }}
                                marginBlock={"calc(var(--basic-margin)/2)"}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily={"Switzer"}
                                    fontWeight={400}
                                    fontSize={14}
                                    lineHeight={"normal"}
                                    color="#000000"
                                    flex={0.4}
                                >
                                    Organization Name
                                </Typography>
                                <Typography
                                    variant="body1"
                                    fontFamily={"Switzer"}
                                    fontWeight={500}
                                    fontSize={14}
                                    lineHeight={"normal"}
                                    textAlign={{ miniTablet: "right" }}
                                    color="#000000"
                                    flex={0.6}
                                    whiteSpace={"normal"}
                                >
                                    {details?.organizationName || "Nil"}
                                </Typography>
                            </Stack>
                            <Stack
                                gap={{ mobile: "calc(var(--flex-gap)/8)", miniTablet: "var(--flex-gap)" }}
                                justifyContent={"space-between"}
                                direction={{ miniTablet: "row" }}
                                marginBlockEnd={"calc(var(--basic-margin)/2)"}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily={"Switzer"}
                                    fontWeight={400}
                                    fontSize={14}
                                    lineHeight={"normal"}
                                    color="#000000"
                                    flex={0.4}
                                >
                                    Description
                                </Typography>
                                <Typography
                                    variant="body1"
                                    fontFamily={"Switzer"}
                                    fontWeight={500}
                                    fontSize={14}
                                    lineHeight={"normal"}
                                    textAlign={{ miniTablet: "right" }}
                                    color="#000000"
                                    flex={0.6}
                                    whiteSpace={"normal"}
                                >
                                    {details?.opportunityDescription || "Nil"}
                                </Typography>
                            </Stack>
                            <Stack
                                gap={{ mobile: "calc(var(--flex-gap)/8)", miniTablet: "var(--flex-gap)" }}
                                justifyContent={"space-between"}
                                direction={{ miniTablet: "row" }}
                                marginBlockEnd={"calc(var(--basic-margin)/2)"}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily={"Switzer"}
                                    fontWeight={400}
                                    fontSize={14}
                                    lineHeight={"normal"}
                                    color="#000000"
                                    flex={0.4}
                                >
                                    Organization Type
                                </Typography>
                                <Typography
                                    variant="body1"
                                    fontFamily={"Switzer"}
                                    fontWeight={500}
                                    fontSize={14}
                                    lineHeight={"normal"}
                                    textAlign={{ miniTablet: "right" }}
                                    color="#000000"
                                    flex={0.6}
                                    whiteSpace={"normal"}
                                >
                                    {details?.organizationType || "Nil"}
                                </Typography>
                            </Stack>
                            <Stack
                                gap={{ mobile: "calc(var(--flex-gap)/8)", miniTablet: "var(--flex-gap)" }}
                                justifyContent={"space-between"}
                                direction={{ miniTablet: "row" }}
                                marginBlockEnd={"calc(var(--basic-margin)/2)"}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily={"Switzer"}
                                    fontWeight={400}
                                    fontSize={14}
                                    lineHeight={"normal"}
                                    color="#000000"
                                    flex={0.4}
                                >
                                    Organization Website
                                </Typography>
                                <Typography
                                    variant="body1"
                                    fontFamily={"Switzer"}
                                    fontWeight={500}
                                    fontSize={14}
                                    lineHeight={"normal"}
                                    textAlign={{ miniTablet: "right" }}
                                    color="#000000"
                                    flex={0.6}
                                    whiteSpace={"normal"}
                                >
                                    {details?.organizationWebsite || "Nil"}
                                </Typography>
                            </Stack>
                            <Stack
                                gap={{ mobile: "calc(var(--flex-gap)/8)", miniTablet: "var(--flex-gap)" }}
                                justifyContent={"space-between"}
                                direction={{ miniTablet: "row" }}
                                marginBlockEnd={"calc(var(--basic-margin)/2)"}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily={"Switzer"}
                                    fontWeight={400}
                                    fontSize={14}
                                    lineHeight={"normal"}
                                    color="#000000"
                                    flex={0.4}
                                >
                                    Contact Email
                                </Typography>
                                <Typography
                                    variant="body1"
                                    fontFamily={"Switzer"}
                                    fontWeight={500}
                                    fontSize={14}
                                    lineHeight={"normal"}
                                    textAlign={{ miniTablet: "right" }}
                                    color="#000000"
                                    flex={0.6}
                                    whiteSpace={"normal"}
                                >
                                    {details?.organizationContactEmail || "Nil"}
                                </Typography>
                            </Stack>
                            <Stack
                                gap={{ mobile: "calc(var(--flex-gap)/8)", miniTablet: "var(--flex-gap)" }}
                                justifyContent={"space-between"}
                                direction={{ miniTablet: "row" }}
                                marginBlockEnd={"calc(var(--basic-margin)/2)"}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily={"Switzer"}
                                    fontWeight={400}
                                    fontSize={14}
                                    lineHeight={"normal"}
                                    color="#000000"
                                    flex={0.4}
                                >
                                    Location
                                </Typography>
                                <Typography
                                    variant="body1"
                                    fontFamily={"Switzer"}
                                    fontWeight={500}
                                    fontSize={14}
                                    lineHeight={"normal"}
                                    textAlign={{ miniTablet: "right" }}
                                    color="#000000"
                                    flex={0.6}
                                    whiteSpace={"normal"}
                                >
                                    {details?.organizationLocation || "Nil"}
                                </Typography>
                            </Stack>
                            <Stack
                                gap={{ mobile: "calc(var(--flex-gap)/8)", miniTablet: "var(--flex-gap)" }}
                                justifyContent={"space-between"}
                                direction={{ miniTablet: "row" }}
                                marginBlockEnd={"calc(var(--basic-margin)/2)"}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily={"Switzer"}
                                    fontWeight={400}
                                    fontSize={14}
                                    lineHeight={"normal"}
                                    color="#000000"
                                    flex={0.4}
                                >
                                    Concerned SDGs
                                </Typography>
                                <Typography
                                    variant="body1"
                                    fontFamily={"Switzer"}
                                    fontWeight={500}
                                    fontSize={14}
                                    lineHeight={"normal"}
                                    textAlign={{ miniTablet: "right" }}
                                    color="#000000"
                                    flex={0.6}
                                    whiteSpace={"normal"}
                                >
                                    {details?.SDGs?.map((goal: string) => goal).join(", ") || "Nil"}
                                </Typography>
                            </Stack>
                        </Box>
                    </Fragment>
                )}
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
        </BaseInfoModalWrapper>
    )
}
