import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import { UsersPageWrapper } from "./styled";
import { Layout } from "../../container/layout";
import { Box, Card, CardContent, CardMedia, CircularProgress, Stack, Typography } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import opportunitiesstaticon from "../../assets/icons/opportunitycardicon.svg";
import usersstaticon from "../../assets/icons/usercardicon.svg";
import { UsersTable } from "../../table/userstable";
import { BaseButton } from "../../component/button/styled";
import AddIcon from '@mui/icons-material/Add';
import { AddUserForm } from "../../modalform/adduserform";
import { BaseAlertModal } from "../../component/modal/alert";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { retrieveAllUsersService } from "../../util/api/user/retrieveAllUsers";
import { retrieveUserService } from "../../util/api/user/retrieveUser";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../../util/api/authentication/signOutUser";
import { retrieveUserOverviewService } from "../../util/api/user/retrieveUserOverview";
// import { UsersStatCardBg } from "../../assets";
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const UsersPage = () => {
    const cookies = new Cookies();
    const TOKEN = cookies.getAll().TOKEN;

    const navigate = useNavigate();
    const {
        isAddUserSuccessfulAlertModalOpen,
        setIsAddUserSuccessfulAlertModalOpen,
        setIsAddUserFormModalOpen
    } = useContext(Context);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [filter, setFilter] = useState("");
    const [isUsersTableUpdateSuccessful, setIsUsersTableUpdateSuccessful] = useState(false);

    const { data: filteredUsers, refetch: refetchFilteredUsers } = useQuery({
        queryKey: ['filteredUsers', TOKEN, filter],
        queryFn: async () => {
            const users = await retrieveAllUsersService(TOKEN, filter);
            return users;
        },
        enabled: !!TOKEN,
    });

    const { data: loggedInUser } = useQuery({
        queryKey: ['loggedInUser', TOKEN, isUsersTableUpdateSuccessful],
        queryFn: async () => {
            const user = await retrieveUserService(TOKEN);
            return user;
        },
        enabled: !!TOKEN,
    });

    const { data: overview, refetch: refetchUserOverview, isLoading: userOverviewIsLoading } = useQuery({
        queryKey: ['userOverview', TOKEN],
        queryFn: () => retrieveUserOverviewService(TOKEN),
        enabled: !!TOKEN,
    });

    useEffect(() => {
        if (isAddUserSuccessfulAlertModalOpen || isUsersTableUpdateSuccessful) {
            refetchFilteredUsers();
            refetchUserOverview();
            // reset the isUserTableUpdateSuccessful state to it's initial value
            // after refetch.
            setIsUsersTableUpdateSuccessful(false);
        }
    }, [isAddUserSuccessfulAlertModalOpen, isUsersTableUpdateSuccessful, refetchUserOverview, refetchFilteredUsers]);

    const handleClickOutside = () => {
        return setIsAddUserSuccessfulAlertModalOpen(true);
    };

    const handleShowAddNewUserFormModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        return setIsAddUserFormModalOpen(true);
    };

    const handleCallToActionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        return setIsAddUserSuccessfulAlertModalOpen(false);
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
            pageId="Users"
            username={loggedInUser?.firstName}
            role={loggedInUser?.role}
            handleSignOutUser={handleSignOutUser}
        >
            <UsersPageWrapper>
                {/* Add User Form Modal Above */}
                <AddUserForm />
                {/* User Confirmation Modal Below */}
                <BaseAlertModal
                    callToAction="Close"
                    className="add-user-successful-modal"
                    message="User added successfully"
                    open={isAddUserSuccessfulAlertModalOpen}
                    handleClickOutside={handleClickOutside}
                    handleCallToActionClick={handleCallToActionClick}
                />
                {/*Add User and Add User Success Modals Above */}
                <Box
                    component={"div"}
                    className="add-new-user-button-box"
                >
                    <BaseButton
                        variant="contained"
                        bgcolor={"#FFFFFF"}
                        colour="#344054"
                        border="1px solid #D0D5DD"
                        startIcon={<AddIcon />}
                        disableElevation
                        onClick={handleShowAddNewUserFormModal}
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
                            Add New User
                        </Typography>
                    </BaseButton>
                </Box>
                <Stack
                    direction={{ tablet: "row" }}
                    gap={"var(--flex-gap)"}
                >
                    <Card
                        className="users-stat-card"
                    >
                        <CardContent>
                            {/* <UsersStatCardBg /> */}
                            <Typography
                                variant="subtitle1"
                                fontFamily={"Poppins"}
                                fontWeight={400}
                                fontSize={14}
                                lineHeight={"normal"}
                                color="#ACACAC"
                            >
                                Total Active Users
                            </Typography>
                            <Typography
                                variant="h2"
                                fontFamily={"Poppins"}
                                fontWeight={600}
                                fontSize={50}
                                lineHeight={"normal"}
                                color="#FFFFFF"
                            >
                                {userOverviewIsLoading ? (
                                    <CircularProgress color="inherit" className="loader" />
                                ) : (
                                    overview?.totalActiveUsers
                                )}
                            </Typography>
                            <Typography
                                variant="body1"
                                fontFamily={"Poppins"}
                                fontWeight={400}
                                fontSize={12}
                                lineHeight={"normal"}
                                color="#FFFFFF"
                                display={"inline-flex"}
                                alignItems={"center"}
                                gap={"calc(var(--flex-gap)/4)"}
                            >
                                <Typography
                                    component={"span"}
                                    display={"inline-flex"}
                                    alignItems={"center"}
                                    fontFamily={"Poppins"}
                                    fontWeight={700}
                                    fontSize={12}
                                    lineHeight={"normal"}
                                    color="#00AC4F"
                                >
                                    <ArrowUpwardIcon /> 16%
                                </Typography> this month
                            </Typography>
                        </CardContent>
                        <CardMedia
                            image={opportunitiesstaticon}
                            sx={{
                                height: 57,
                                backgroundSize: "contain",
                                backgroundPosition: "right",
                            }}
                        />
                    </Card>
                    <Card
                        className="opportunities-stat-card"
                    >
                        <CardContent>
                            <Typography
                                variant="subtitle1"
                                fontFamily={"Poppins"}
                                fontWeight={400}
                                fontSize={14}
                                lineHeight={"normal"}
                                color="#454545"
                            >
                                Total Suspended Users
                            </Typography>
                            <Typography
                                variant="h2"
                                fontFamily={"Poppins"}
                                fontWeight={600}
                                fontSize={50}
                                lineHeight={"normal"}
                                color="#262626"
                            >
                                {userOverviewIsLoading ? (
                                    <CircularProgress color="inherit" className="loader" />
                                ) : (
                                    overview?.totalInactiveUsers
                                )}
                            </Typography>
                            <Typography
                                variant="body1"
                                fontFamily={"Poppins"}
                                fontWeight={400}
                                fontSize={12}
                                lineHeight={"normal"}
                                color="#262626"
                                display={"inline-flex"}
                                alignItems={"center"}
                                gap={"calc(var(--flex-gap)/4)"}
                            >
                                <Typography
                                    component={"span"}
                                    display={"inline-flex"}
                                    alignItems={"center"}
                                    fontFamily={"Poppins"}
                                    fontWeight={700}
                                    fontSize={12}
                                    lineHeight={"normal"}
                                    color="#00AC4F"
                                >
                                    <ArrowUpwardIcon /> 16%
                                </Typography> this month
                            </Typography>
                        </CardContent>
                        <CardMedia
                            image={usersstaticon}
                            sx={{
                                height: 57,
                                backgroundSize: "contain",
                                backgroundPosition: "right",
                            }}
                        />
                    </Card>
                </Stack>
                <Box
                    component={"div"}
                    className="users-table-box"
                >
                    <UsersTable
                        rows={filteredUsers}
                        setIsUsersTableUpdateSuccessful={setIsUsersTableUpdateSuccessful}
                    />
                </Box>
            </UsersPageWrapper>
        </Layout>
    )
}
