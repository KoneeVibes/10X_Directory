import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";
import { DecodedUserType, RouteProtectorPropsType } from '../type/config.type';

export const RouteProtector: React.FC<RouteProtectorPropsType> = ({ allowedRoles }) => {
    const cookies = new Cookies();
    const { TOKEN } = cookies.getAll();

    if (!TOKEN) {
        return <Navigate to="/" />;
    }

    try {
        const decoded: DecodedUserType = jwtDecode(TOKEN);
        if (allowedRoles.includes(decoded?.role)) {
            return <Outlet />;
        } else {
            // should navigate to /unauthorized
            // instead of login page.
            return <Navigate to="/" />;
        }
    } catch (error) {
        console.error("Error decoding token or retrieving user role:", error);
        return <Navigate to="/" />;
    }
};
