import { useEffect } from "react";
import { LayoutPropsType } from "../../type/container.type";
import { MainArea } from "../mainarea";
import { SideNavigation } from "../navigation/sidenavigation";
import { TopNavigation } from "../navigation/topnavigation";
import { LayoutWrapper } from "./styled";

export const Layout: React.FC<LayoutPropsType> = ({ pageId, username, role, handleSignOutUser, children }) => {
    useEffect(() => {
        document.body.id = pageId;
        return () => {
            document.body.removeAttribute("id");
        };
    }, [pageId]);
    return (
        <LayoutWrapper
            id={pageId}
            maxWidth={false}
        >
            <SideNavigation
                loggedInUser={username}
                role={role}
                handleSignOutUser={handleSignOutUser}
            />
            <TopNavigation
                loggedInUser={username}
            />
            <MainArea>
                {children}
            </MainArea>
        </LayoutWrapper>
    )
}