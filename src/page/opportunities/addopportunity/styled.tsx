import { Box, styled } from "@mui/material";

export const AddOpportunityPageWrapper = styled(Box)(({ theme }) => {
    return {
        "& form": {
            display: "flex",
            flexDirection: "column",
            gap: "var(--flex-gap)",
            justifyContent: "center",
            marginBlockStart: "var(--basic-margin)",
            [theme.breakpoints.up("laptop")]: {
                padding: "0 calc(var(--basic-padding) * 3) var(--basic-padding)",
            }
        },
        "& .MuiInputBase-root": {
            borderBottom: "0.89px solid #737B7D",
            borderRadius: "0",
            color: "#383C3E",
        },
        "& .SDG-fields": {
            borderBottom: "0.89px solid #737B7D",
            padding: "0 calc(var(--basic-padding)/2) calc(var(--basic-padding)/2)",
            overflow: "hidden",
            "& .MuiFormLabel-root": {
                fontWeight: 400,
                fontSize: "16px",
                color: "#8E8E8E"
            }
        },
        "& .add-button-box": {
            overflow: "hidden",
        }
    }
})
