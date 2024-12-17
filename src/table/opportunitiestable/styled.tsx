import { styled, TableBody } from "@mui/material";

export const OpportunitiesTableBodyWrapper = styled(TableBody)(() => {
    return {
        "& .MuiList-root": {
            position: "absolute",
            right: "calc(var(--basic-padding) * 1.5)",
            background: "#FFFFFF",
            zIndex: 1,
            borderRadius: "8px",
            boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
            "& .MuiListItem-root": {
                padding: 0,
                "& .MuiListItemText-root": {
                    margin: 0,
                    "& >*": {
                        fontFamily: "Switzer",
                        fontWeight: 500,
                        fontSize: 14,
                        lineHeight: "normal",
                        color: "#000000",
                    },
                },
                "&:hover": {
                    backgroundColor: "#FCD3BF",
                }
            }
        },
    }
});
