import { MenuItem, Typography } from "@mui/material";
import { BaseDropDownPropsType } from "../../../type/component.type";
import { BaseDropDownWrapper } from "./styled";

export const BaseDropDown: React.FC<BaseDropDownPropsType> = ({ open, handleClose, items, handleItemClick, className }) => {
    return (
        <BaseDropDownWrapper
            open={open}
            onClose={handleClose}
            className={className}
        >
            <ul>
                {items?.map((item, index) => {
                    return (
                        <MenuItem
                            key={index}
                            onClick={(e) => handleItemClick(e, item)}
                        >
                            <Typography
                                variant="subtitle1"
                                fontFamily={"Inter"}
                                fontWeight={400}
                                fontSize={"inherit"}
                                lineHeight={"normal"}
                                color={"#373737"}
                                whiteSpace={"normal"}
                            >
                                {item.title}
                            </Typography>
                        </MenuItem>
                    )
                })}
            </ul>
        </BaseDropDownWrapper>
    )
}