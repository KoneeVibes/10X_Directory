import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Drawer, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from "@mui/material";
import { sideNavigationItems } from "../../../config/static";
import { ArrowForwardIos, Close, KeyboardArrowDown } from "@mui/icons-material";
import { DashboardIcon } from "../../../assets";
import { Context } from "../../../context";
import { SideNavigationPropsType } from "../../../type/container.type";
import headshot from "../../../assets/images/headshot.svg";
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { DecodedUserType } from "../../../type/config.type";

export const SideNavigation: React.FC<SideNavigationPropsType> = ({ loggedInUser, role, handleSignOutUser }) => {
    const cookies = new Cookies();
    const { TOKEN } = cookies.getAll();
    const decoded: DecodedUserType = jwtDecode(TOKEN);
    const allowedSideNavigationItems = ['Super Admin', 'Admin', 'Support'].includes(decoded?.role) ? sideNavigationItems : sideNavigationItems.filter((item) => item.name !== "Users");

    const navigate = useNavigate();
    const matches = useMediaQuery('(min-width:425px)');
    const { setIsSideNavigationClosing, isMobileSideNavigationOpen, setIsMobileSideNavigationOpen } = useContext(Context);

    const [showUserProfileMenu, setShowUserProfile] = useState(false);

    const handleToggleUserProfileMenu = () => {
        return setShowUserProfile(!showUserProfileMenu);
    }

    const handleNavItemClick = (item: string) => {
        setIsSideNavigationClosing(true);
        setIsMobileSideNavigationOpen(false);
        return navigate(item);
    }

    const handleDrawerClose = () => {
        setIsSideNavigationClosing(true);
        setIsMobileSideNavigationOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsSideNavigationClosing(false);
    };

    const drawer = (
        allowedSideNavigationItems?.map((sideNavItem, index) => {
            return (
                <ListItem
                    key={index}
                    className={`${sideNavItem.name}-item Side-Nav-Item`}
                    component={"div"}
                    sx={{
                        flexDirection: "column",
                        alignItems: "stretch",
                        marginTop: (index === 0) ? "calc(var(--basic-margin)/2)" : "0",
                    }}
                    onClick={() => handleNavItemClick(sideNavItem.url)}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            {sideNavItem.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={sideNavItem.name}
                        />
                        <ListItemIcon
                            sx={{
                                justifyContent: "flex-end"
                            }}
                        >
                            <ArrowForwardIos sx={{ color: "#FFFFFF" }} />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
            )
        })
    )
    return (
        <Box>
            <Drawer
                variant="temporary"
                open={isMobileSideNavigationOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true
                }}
                sx={{
                    display: { mobile: 'block', tablet: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: "var(--side-nav-width)",
                        padding: "var(--basic-padding) 0",
                        border: "none",
                        boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
                    },
                }}
            >
                <ListItem
                    className="app-icon"
                >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={"Dashboard"}
                        sx={{
                            color: "#000000",
                        }}
                    />
                    <IconButton
                        sx={{
                            color: "#FFFFFF",
                            backgroundColor: "#722F49",
                            borderRadius: "8px",
                            display: matches ? "none" : "inline-flex"
                        }}
                        onClick={handleDrawerClose}
                    >
                        <Close />
                    </IconButton>
                </ListItem>
                {drawer}
                <ListItem
                    sx={{ marginTop: "auto", cursor: "pointer" }}
                    onClick={handleToggleUserProfileMenu}
                >
                    <ListItemIcon>
                        <Avatar
                            alt="logged in user headshot"
                            src={headshot}
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={loggedInUser}
                        secondary={role}
                        sx={{
                            color: "#000000",
                        }}
                    />
                    <ListItemIcon
                        sx={{
                            justifyContent: "flex-end"
                        }}
                    >
                        <KeyboardArrowDown
                            sx={{
                                color: "#757575",
                                transform: showUserProfileMenu ? "rotate(0deg)" : "rotate(270deg)"
                            }}
                        />
                    </ListItemIcon>
                </ListItem>
                <ListItem
                    sx={{
                        display: showUserProfileMenu ? "inline-flex" : "none",
                        gap: "calc(var(--flex-gap)/2)",
                        cursor: "pointer", paddingLeft: "calc(var(--basic-padding) * 2.25)",
                        "& .MuiListItemIcon-root": { minWidth: 0 }
                    }}
                    onClick={handleSignOutUser}
                >
                    <ListItemIcon>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                    </ListItemIcon>
                    <ListItemText
                        primary={"Sign Out"}
                        sx={{
                            color: "#000000",
                        }}
                    />
                </ListItem>
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { mobile: 'none', tablet: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: "var(--side-nav-width)",
                        padding: "var(--basic-padding) 0",
                        border: "none",
                        boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
                    },
                }}
                open
            >
                <ListItem
                    className="app-icon"
                >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={"Dashboard"}
                        sx={{
                            color: "#000000",
                        }}
                    />
                </ListItem>
                {drawer}
                <ListItem
                    sx={{ marginTop: "auto", cursor: "pointer" }}
                    onClick={handleToggleUserProfileMenu}
                >
                    <ListItemIcon>
                        <Avatar
                            alt="logged in user headshot"
                            src={headshot}
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={loggedInUser}
                        secondary={role}
                        sx={{
                            color: "#000000",
                        }}
                    />
                    <ListItemIcon
                        sx={{
                            justifyContent: "flex-end"
                        }}
                    >
                        <KeyboardArrowDown
                            sx={{
                                color: "#757575",
                                transform: showUserProfileMenu ? "rotate(0deg)" : "rotate(270deg)"
                            }}
                        />
                    </ListItemIcon>
                </ListItem>
                <ListItem
                    sx={{
                        display: showUserProfileMenu ? "inline-flex" : "none",
                        gap: "calc(var(--flex-gap)/2)",
                        cursor: "pointer",
                        paddingLeft: "calc(var(--basic-padding) * 2.25)",
                        "& .MuiListItemIcon-root": { minWidth: 0 }
                    }}
                    onClick={handleSignOutUser}
                >
                    <ListItemIcon>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                    </ListItemIcon>
                    <ListItemText
                        primary={"Sign Out"}
                        sx={{
                            color: "#000000",
                        }}
                    />
                </ListItem>
            </Drawer>
        </Box>
    )
}