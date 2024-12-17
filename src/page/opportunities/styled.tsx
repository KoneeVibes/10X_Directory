import { Box, styled } from "@mui/material";

export const OpportunitiesPageWrapper = styled(Box)(() => {
    return {
        "& .opportunities-table-box": {
            marginBlock: "calc(var(--basic-margin) * 2) var(--basic-margin)",
            "& .MuiTableContainer-root": {
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
            },
        },
        "& .add-new-opportunity-button-box": {
            display: "flex",
            justifyContent: "flex-end",
            marginBlockEnd: "var(--basic-margin)"
        }
    }
})