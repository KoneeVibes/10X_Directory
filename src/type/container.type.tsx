export type LayoutPropsType = {
    pageId: string,
    username?: string,
    role?: string,
    children: React.ReactNode
    handleSignOutUser: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}

export type MainAreaPropsType = {
    children: React.ReactNode
}

export type TopNavigationPropsType = {
    loggedInUser: string | undefined
}

export type SideNavigationPropsType = {
    role: string | undefined,
    handleSignOutUser: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
} & TopNavigationPropsType