import { Box, styled } from "@mui/material";

export const UsersPageWrapper = styled(Box)(() => {
    return {
        "& .users-stat-card": {
            flex: 1,
            padding: "var(--basic-padding)",
            backgroundColor: "#722F49",
            borderRadius: "30px",
        },
        "& .opportunities-stat-card": {
            flex: 1,
            padding: "var(--basic-padding)",
            backgroundColor: "#FFFFFF",
            borderRadius: "30px",
        },
        "& .users-table-box": {
            marginBlock: "calc(var(--basic-margin) * 2) var(--basic-margin)",
            "& .MuiTableContainer-root": {
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
            },
        },
        "& .add-new-user-button-box": {
            display: "flex",
            justifyContent: "flex-end",
            marginBlockEnd: "var(--basic-margin)"
        }
    }
})