import { createContext, useState } from "react";
import { ContextProviderPropsType, ContextType } from "../type/context.type";

export const Context = createContext({} as ContextType);

export const ContextProvider: React.FC<ContextProviderPropsType> = ({ children }) => {
    const [isMobileSideNavigationOpen, setIsMobileSideNavigationOpen] = useState(false);
    const [isSideNavigationClosing, setIsSideNavigationClosing] = useState(false);
    const [isAddUserFormModalOpen, setIsAddUserFormModalOpen] = useState(false);
    const [isUpdateUserRoleFormModalOpen, setIsUpdateUserRoleFormModalOpen] = useState(false);
    const [isAddUserSuccessfulAlertModalOpen, setIsAddUserSuccessfulAlertModalOpen] = useState(false);

    return (
        <Context.Provider
            value={{
                isMobileSideNavigationOpen,
                setIsMobileSideNavigationOpen,
                isSideNavigationClosing,
                setIsSideNavigationClosing,
                isAddUserFormModalOpen,
                setIsAddUserFormModalOpen,
                isUpdateUserRoleFormModalOpen,
                setIsUpdateUserRoleFormModalOpen,
                isAddUserSuccessfulAlertModalOpen,
                setIsAddUserSuccessfulAlertModalOpen,
            }}
        >
            {children}
        </Context.Provider>
    )
}