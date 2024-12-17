import { JwtPayload } from "jwt-decode";

export type RouteProtectorPropsType = {
    allowedRoles: string[];
}

export type DecodedUserType = JwtPayload & {
    role: string;
};