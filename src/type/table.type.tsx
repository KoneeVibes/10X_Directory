export type UsersTablePropsType = {
    rows: Record<any, any>[],
    setIsUsersTableUpdateSuccessful: React.Dispatch<React.SetStateAction<boolean>>
}

export type OpportunitiesTablePropsType = Omit<UsersTablePropsType, "setIsUsersTableUpdateSuccessful"> & {
    setIsOpportunitiesTableUpdateSuccessful: React.Dispatch<React.SetStateAction<boolean>>
}

