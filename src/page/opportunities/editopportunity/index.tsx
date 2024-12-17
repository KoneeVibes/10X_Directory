import { useQuery } from "@tanstack/react-query";
import { Layout } from "../../../container/layout";
import { EditOpportunityPageWrapper } from "./styled";
import Cookies from "universal-cookie";
import { retrieveUserService } from "../../../util/api/user/retrieveUser";
import { signOutUser } from "../../../util/api/authentication/signOutUser";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, IconButton, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { BaseButton } from "../../../component/button/styled";
import { BaseInput } from "../../../component/form/input/styled";
import { BaseLabel } from "../../../component/form/label/styled";
import { BaseFieldSet } from "../../../component/form/fieldset/styled";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { BaseSelect } from "../../../component/form/select/styled";
import { BaseOption } from "../../../component/form/option/styled";
import { updateOpportunityService } from "../../../util/api/opportunity/updateOpportunity";
import { retrieveOpportunityService } from "../../../util/api/opportunity/retrieveOpportunity";
import { BaseAlertModal } from "../../../component/modal/alert";

export const EditOpportunityPage = () => {
    const organizationTypes = ["For Profit", "Non Profit"];
    const SDGs = [
        "No Poverty",
        "Zero Hunger",
        "Good Health and Well-being",
        "Quality Education",
        "Gender Equality",
        "Clean Water and Sanitation",
        "Affordable and Clean Energy",
        "Decent Work and Economic Growth",
        "Industry, Innovation, and Infrastructure",
        "Reduced Inequality",
        "Sustainable Cities and Communities",
        "Responsible Consumption and Production",
        "Climate Action",
        "Life Below Water",
        "Life on Land",
        "Peace, Justice, and Strong Institutions",
        "Partnerships for the Goals"
    ];

    const { id } = useParams();
    const cookies = new Cookies();
    const TOKEN = cookies.getAll().TOKEN;

    const navigate = useNavigate();
    const initialFormDetails = useMemo(() => ({
        organizationName: "",
        opportunityDescription: "",
        organizationType: " ",
        organizationContactEmail: "",
        organizationContactName: "",
        organizationContactPhone: "",
        organizationLocation: "",
        organizationWebsite: "",
        SDGs: [""],
        others: ""
    }), []);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPostSuccessAlertModalOpen, setIsPostSuccessAlertModalOpen] = useState(false);
    const [formDetails, setFormDetails] = useState(initialFormDetails);

    const { data: loggedInUser } = useQuery({
        queryKey: ['loggedInUser', TOKEN],
        queryFn: async () => {
            const user = await retrieveUserService(TOKEN);
            return user;
        },
        enabled: !!TOKEN,
    });

    useEffect(() => {
        if (!id) return;
        retrieveOpportunityService(TOKEN, id)
            .then((data) => setFormDetails(data))
            .catch((err) => {
                console.error("Failed to fetch institutions:", err);
            });
    }, [TOKEN, id]);

    const handleNavigateToPrevious = () => {
        return navigate(-1);
    };

    const handleSignOutUser = async (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.stopPropagation();
        try {
            const response = await signOutUser(TOKEN);
            if (response.status === "success") {
                cookies.remove("TOKEN", { path: '/' });
                navigate("/");
            } else {
                console.error('User signout failed. Try again');
            }
        } catch (error: any) {
            console.error('User signout failed, Contact Admin:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<unknown>) => {
        const { name, value } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (SDG: string) => {
        setFormDetails((prev) => {
            const updatedSDGs = prev.SDGs.includes(SDG)
                ? prev.SDGs.filter((item: string) => item !== SDG) // Remove if already selected
                : [...prev.SDGs, SDG].filter((item) => item !== ""); // Add if not already selected
            return { ...prev, SDGs: updatedSDGs.length === 0 ? [""] : updatedSDGs };
        });
    };

    const handlePostSuccessAlertModalClickOutside = () => {
        // modal should persist on click outside
        return setIsPostSuccessAlertModalOpen(true);
    };

    const handlePostSuccessAlertModalCallToActionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setFormDetails(initialFormDetails);
        setIsPostSuccessAlertModalOpen(false);
        return navigate("/opportunities");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!id) return;
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const response: Record<any, any> = await updateOpportunityService(TOKEN, id, formDetails);
            if (response.status === "success") {
                setIsLoading(false);
                return setIsPostSuccessAlertModalOpen(true);
            } else {
                setIsLoading(false);
                setError('Add opportunity operation failed. Please check your credentials and try again.');
            }
        } catch (error: any) {
            setIsLoading(false);
            setError(`Add opportunity operation failed: ${error.message}`);
            console.error('Add opportunity operation failed:', error);
        }
    };

    return (
        <Layout
            pageId="Opportunities"
            username={loggedInUser?.firstName}
            role={loggedInUser?.role}
            handleSignOutUser={handleSignOutUser}
        >
            <EditOpportunityPageWrapper>
                <Stack
                    direction={"row"}
                    gap={"calc(var(--flex-gap)/2)"}
                    alignItems={"center"}
                    borderBottom={"1px solid #D1D1D1"}
                    paddingBottom={"calc(var(--basic-padding)/4)"}
                    overflow={"hidden"}
                >
                    <IconButton
                        onClick={handleNavigateToPrevious}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography
                        variant="subtitle1"
                        fontFamily={"Inter"}
                        fontWeight={500}
                        fontSize={14}
                        lineHeight={"normal"}
                        color="#8A8A8A"
                    // whiteSpace={"normal"}
                    >
                        Opportunities
                    </Typography>
                    <ArrowForwardIosIcon sx={{ color: "#8A8A8A" }} />
                    <Typography
                        variant="subtitle1"
                        fontFamily={"Inter"}
                        fontWeight={500}
                        fontSize={14}
                        lineHeight={"normal"}
                        color="#000000"
                    // whiteSpace={"normal"}
                    >
                        Edit Opportunity
                    </Typography>
                </Stack>
                <form
                    onSubmit={handleSubmit}
                >
                    <Typography
                        variant="h2"
                        fontFamily={"Inter"}
                        fontWeight={400}
                        fontSize={16}
                        lineHeight={"normal"}
                        color="#737B7D"
                        whiteSpace={"normal"}
                    >
                        Edit Opportunity
                    </Typography>
                    <BaseInput
                        required
                        type="text"
                        name="organizationName"
                        value={formDetails.organizationName}
                        placeholder="Organization Name"
                        onChange={(e) => handleChange(e)}
                    />
                    <BaseInput
                        type="text"
                        name="opportunityDescription"
                        multiline
                        minRows={2}
                        value={formDetails.opportunityDescription}
                        placeholder="Description of opportunity"
                        onChange={(e) => handleChange(e)}
                    />
                    <BaseInput
                        required
                        type="text"
                        name="organizationLocation"
                        value={formDetails.organizationLocation}
                        placeholder="Location"
                        onChange={(e) => handleChange(e)}
                    />
                    <BaseInput
                        required
                        type="text"
                        name="organizationContactName"
                        value={formDetails.organizationContactName}
                        placeholder="Contact Name"
                        onChange={(e) => handleChange(e)}
                    />
                    <BaseInput
                        type="email"
                        name="organizationContactEmail"
                        value={formDetails.organizationContactEmail}
                        placeholder="Contact Email"
                        onChange={(e) => handleChange(e)}
                    />
                    <BaseInput
                        type="text"
                        name="organizationWebsite"
                        value={formDetails.organizationWebsite}
                        placeholder="Organization Website"
                        onChange={(e) => handleChange(e)}
                    />
                    <BaseInput
                        type="phone"
                        name="organizationContactPhone"
                        value={formDetails.organizationContactPhone}
                        placeholder="Contact Phone Number"
                        onChange={(e) => handleChange(e)}
                    />
                    <BaseSelect
                        required
                        name="organizationType"
                        value={formDetails.organizationType}
                        onChange={(e) => handleChange(e)}
                        sx={{ border: "none", fontFamily: "Inter", fontSize: "16px" }}
                    >
                        <BaseOption
                            value={" "}
                        >
                            Select organization type
                        </BaseOption>
                        {organizationTypes?.map((organizationType: string, index: number) => {
                            return (
                                <BaseOption
                                    key={index}
                                    value={organizationType}
                                >
                                    {organizationType}
                                </BaseOption>
                            )
                        })}
                    </BaseSelect>
                    <BaseFieldSet
                        className="SDG-fields"
                    >
                        <BaseLabel
                            sx={{ display: "inline-block", width: "100%", whiteSpace: "normal" }}
                        >
                            Check Applicable Sustainable Development Goals (SDGs)
                        </BaseLabel>
                        {SDGs.map((SDG, index) => (
                            <Stack
                                key={index}
                                direction={"row"}
                                alignItems="center"
                            >
                                <BaseInput
                                    type="checkbox"
                                    id={`SDG-${index}`}
                                    name="SDGs"
                                    value={SDG}
                                    inputProps={{
                                        checked: formDetails.SDGs.includes(SDG)
                                    }}
                                    sx={{ borderBottom: "none !important", flexShrink: 0, cursor: "pointer" }}
                                    onChange={() => handleCheckboxChange(SDG)}
                                />
                                <BaseLabel
                                    htmlFor={`SDG-${index}`}
                                    sx={{
                                        color: "#383C3E !important",
                                        cursor: "pointer"
                                    }}
                                >
                                    {SDG}
                                </BaseLabel>
                            </Stack>
                        ))}
                    </BaseFieldSet>
                    <BaseInput
                        type="text"
                        name="others"
                        multiline
                        minRows={8}
                        value={formDetails.others}
                        placeholder="Enter other details"
                        onChange={(e) => handleChange(e)}
                    />
                    {/* I want to have checkboxes for all the sdgs */}
                    {error && <Typography
                        fontFamily={"Poppins"}
                        fontWeight={700}
                        fontSize={13}
                        lineHeight={"normal"}
                        color={"#FF0000"}
                        whiteSpace={"normal"}
                    >
                        {error}
                    </Typography>}
                    <Box
                        component={"div"}
                        className="edit-button-box"
                    >
                        <BaseButton
                            type="submit"
                            variant="contained"
                            sx={{
                                width: "100%",
                                textTransform: "uppercase"
                            }}
                            radius="4px"
                            colour="#FFFFFF"
                            bgcolor="#313131"
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
                                    Update
                                </Typography>
                            )}
                        </BaseButton>
                    </Box>
                </form>
                <BaseAlertModal
                    callToAction="Proceed"
                    className="edit-opportunity-successful-alert-modal"
                    message="Opportunity has been successfully edited."
                    open={isPostSuccessAlertModalOpen}
                    handleClickOutside={handlePostSuccessAlertModalClickOutside}
                    handleCallToActionClick={handlePostSuccessAlertModalCallToActionClick}
                />
            </EditOpportunityPageWrapper>
        </Layout>
    )
}
