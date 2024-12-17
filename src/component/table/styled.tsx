import { styled, TableContainer, TableContainerProps } from "@mui/material";

export const TableWrapper = styled(TableContainer)<TableContainerProps>(() => {
    return {
        "& .MuiTableCell-root": {
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: "14px",
            color: "#292D32",
            overflow: "hidden",
            whiteSpace: "normal",
            textOverflow: "ellipsis",
            maxWidth: "7rem",
        },
        "& .MuiTableHead-root": {
            "& .MuiTableCell-root": {
                color: "#B5B7C0",
            }
        }
    }
})