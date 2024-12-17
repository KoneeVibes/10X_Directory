import { useContext } from "react";
import { Context } from "../../../context";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { TopNavigationWrapper } from "./styled";
import { TopNavigationPropsType } from "../../../type/container.type";
import MenuIcon from '@mui/icons-material/Menu';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { BaseInput } from "../../../component/form/input/styled";
import SearchIcon from '@mui/icons-material/Search';

export const TopNavigation: React.FC<TopNavigationPropsType> = ({ loggedInUser }) => {
    const { isMobileSideNavigationOpen, setIsMobileSideNavigationOpen } = useContext(Context);

    const handleDrawerOpen = () => {
        setIsMobileSideNavigationOpen(true);
    };

    return (
        <TopNavigationWrapper>
            <Toolbar
                sx={{
                    gap: "var(--flex-gap)",
                    justifyContent: "space-between"
                }}
            >
                <Typography
                    variant="h1"
                    fontFamily={"Poppins"}
                    fontWeight={400}
                    fontSize={24}
                    lineHeight={"normal"}
                    color="#000000"
                    display={{ mobile: "none", tablet: "inline-flex" }}
                    alignItems={"center"}
                    gap={"calc(var(--flex-gap)/4)"}
                >
                    <Typography
                        fontFamily={"inherit"}
                        fontWeight={"inherit"}
                        fontSize={"inherit"}
                        lineHeight={"inherit"}
                        color="inherit"
                    >
                        {`Hello ${loggedInUser || "User"}`}
                    </Typography>
                    <Typography
                        component={"span"}
                        display={"inline-flex"}
                        alignItems={"center"}
                    >
                        <WavingHandIcon sx={{ color: "#A67B5B" }} />,
                    </Typography>
                </Typography>
                <BaseInput
                    startAdornment={<SearchIcon />}
                    bgcolor={"#FFFFFF"}
                    placeholder="Search"
                />
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{
                        color: "#FFFFFF",
                        backgroundColor: "#722F49",
                        borderRadius: "12px",
                        display: { mobile: isMobileSideNavigationOpen ? "none" : "inline-flex", tablet: "none" }
                    }}
                    onClick={handleDrawerOpen}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </TopNavigationWrapper>
    )
}