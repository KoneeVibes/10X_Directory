import { FormLabelProps, InputBaseProps } from "@mui/material";

export type BaseInputPropsType = {
    fontweight?: number
    fontsize?: string
    colour?: string,
    bgcolor?: string,
    border?: string,
    borderradius?: string
} & InputBaseProps

export type BaseLabelPropsType = {
    fontSize?: string,
    fontWeight?: number,
    colour?: string,
} & FormLabelProps

export type BaseButtonPropType = {
    fontfamily?: string,
    fontsize?: number,
    fontweight?: number,
    radius?: string,
    padding?: string,
    bgcolor?: string,
    border?: string,
    colour?: string
}

export type BaseTablePropsType = {
    headers: string[]
    children: React.ReactNode
}

export type BaseDropDownItemType = {
    id?: string,
    title?: string,
    icon?: React.ReactNode,
    action: string,
}

export type BaseDropDownPropsType = {
    open: boolean,
    handleClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined,
    items: BaseDropDownItemType[],
    handleItemClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: BaseDropDownItemType) => void,
    className?: string,
}

export type FormModalPropsType = {
    open: boolean,
    handleClickOutside: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    title?: string,
    children: React.ReactNode,
    className?: string,
}

export type AlertModalPropsType = Omit<FormModalPropsType, "children" | "title" | "handleSubmit"> & {
    message: string,
    callToAction: string,
    handleCallToActionClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
};

export type InfoModalPropsType = Omit<AlertModalPropsType, "message"> & {
    title?: string,
    subtitle?: string,
    location: string,
    thumbnail?: React.ReactNode,
    details?: Record<any, any>,
}

export type ConfirmationModalPropsType = Omit<AlertModalPropsType, "handleCallToActionClick" | "callToAction"> & {
    error?: string,
    isLoading?: boolean,
    location?: string,
    handleCallToActionClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, action: string) => void,
}
