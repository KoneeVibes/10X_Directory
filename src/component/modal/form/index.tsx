import { DialogContent, DialogTitle } from "@mui/material";
import { BaseFormModalWrapper } from "./styled";
import { FormModalPropsType } from "../../../type/component.type";

export const BaseFormModal: React.FC<FormModalPropsType> = ({ open, className, handleClickOutside, title, handleSubmit, children }) => {
    return (
        <BaseFormModalWrapper
            open={open}
            onClose={handleClickOutside}
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit
            }}
            className={className}
        >
            <DialogTitle
                component={"legend"}
            >
                {title}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </BaseFormModalWrapper>
    )
}