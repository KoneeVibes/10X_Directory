export type ContextProviderPropsType = {
    children: React.ReactNode
};

export type ContextType = {
    isMobileSideNavigationOpen: boolean,
    setIsMobileSideNavigationOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isSideNavigationClosing: boolean,
    setIsSideNavigationClosing: React.Dispatch<React.SetStateAction<boolean>>,
    isAddUserFormModalOpen: boolean,
    setIsAddUserFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isUpdateUserRoleFormModalOpen: boolean,
    setIsUpdateUserRoleFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isAddUserSuccessfulAlertModalOpen: boolean,
    setIsAddUserSuccessfulAlertModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}