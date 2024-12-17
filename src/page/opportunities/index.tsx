import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Layout } from "../../container/layout";
import { signOutUser } from "../../util/api/authentication/signOutUser";
import { retrieveUserService } from "../../util/api/user/retrieveUser";
import { OpportunitiesPageWrapper } from "./styled";
import { Box, Typography } from "@mui/material";
import { BaseButton } from "../../component/button/styled";
import AddIcon from '@mui/icons-material/Add';
import { OpportunitiesTable } from "../../table/opportunitiestable";
import { retrieveAllOpportunitiesService } from "../../util/api/opportunity/retrieveOpportunities";

export const OpportunitiesPage = () => {
    const cookies = new Cookies();
    const TOKEN = cookies.getAll().TOKEN;

    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [filter, setFilter] = useState("");
    const [isOpportunitiesTableUpdateSuccessful, setIsOpportunitiesTableUpdateSuccessful] = useState(false);

    const { data: loggedInUser } = useQuery({
        queryKey: ['loggedInUser', TOKEN],
        queryFn: async () => {
            const user = await retrieveUserService(TOKEN);
            return user;
        },
        enabled: !!TOKEN,
    });

    const { data: filteredOpportunities, refetch: refetchFilteredOpportunities } = useQuery({
        queryKey: ['filteredOpportunities', TOKEN, filter],
        queryFn: async () => {
            const users = await retrieveAllOpportunitiesService(TOKEN, filter);
            return users;
        },
        enabled: !!TOKEN,
    });

    useEffect(() => {
        if (isOpportunitiesTableUpdateSuccessful) {
            refetchFilteredOpportunities();
            // reset the isUserTableUpdateSuccessful state to it's initial value
            // after refetch.
            setIsOpportunitiesTableUpdateSuccessful(false);
        };
    }, [isOpportunitiesTableUpdateSuccessful, refetchFilteredOpportunities]);

    const handleNavigateToAddOpportunityPage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        return navigate("/addopportunity");
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
    }

    return (
        <Layout
            pageId="Opportunities"
            username={loggedInUser?.firstName}
            role={loggedInUser?.role}
            handleSignOutUser={handleSignOutUser}
        >
            <OpportunitiesPageWrapper>
                <Box
                    component={"div"}
                    className="add-new-opportunity-button-box"
                >
                    <BaseButton
                        variant="contained"
                        bgcolor={"#FFFFFF"}
                        colour="#344054"
                        border="1px solid #D0D5DD"
                        startIcon={<AddIcon />}
                        disableElevation
                        onClick={handleNavigateToAddOpportunityPage}
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
                            Upload Opportunity
                        </Typography>
                    </BaseButton>
                </Box>
                <Box
                    component={"div"}
                    className="opportunities-table-box"
                >
                    <OpportunitiesTable
                        rows={filteredOpportunities}
                        setIsOpportunitiesTableUpdateSuccessful={setIsOpportunitiesTableUpdateSuccessful}
                    />
                </Box>
            </OpportunitiesPageWrapper>
        </Layout>
    )
}