import { useContext, useEffect, useRef, useState } from "react";
import { IconButton, List, ListItem, ListItemButton, ListItemText, TableCell, TableRow } from "@mui/material";
import { BaseTable } from "../../component/table";
import { UsersTablePropsType } from "../../type/table.type";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { UsersTableBodyWrapper } from "./styled";
import { Context } from "../../context";
import { UpdateUserRoleForm } from "../../modalform/updateuserroleform";
import { BaseAlertModal } from "../../component/modal/alert";
import { BaseConfirmationModal } from "../../component/modal/confirmation";
import { suspendUserService } from "../../util/api/user/suspendUser";
import Cookies from "universal-cookie";

export const UsersTable: React.FC<UsersTablePropsType> = ({ rows, setIsUsersTableUpdateSuccessful }) => {
    const cookies = new Cookies();
    const TOKEN = cookies.getAll().TOKEN;

    const actions = ["Change Role", "Suspend User"];
    const tableHeaders = ["User Name", "Phone Number", "Email", "Role", "Action"];

    const dropdownRef = useRef<HTMLUListElement | null>(null);
    const { setIsUpdateUserRoleFormModalOpen } = useContext(Context);

    const [userId, setUserId] = useState("");
    const [activatedRowId, setActivatedRowId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuspendUserConfirmationModalOpen, setIsSuspendUserConfirmationModalOpen] = useState(false);
    const [isUpdateUserRoleSuccessfulAlertModalOpen, setIsUpdateUserRoleSuccessfulAlertModalOpen] = useState(false);
    const [isSuspendUserSuccessfulAlertModalOpen, setIsSuspendUserSuccessfulAlertModalOpen] = useState(false);

    const handleUpdateUserRoleSuccessfulAlertModalClickOutside = () => {
        // persist the success modal on click outside
        return setIsUpdateUserRoleSuccessfulAlertModalOpen(true);
    };

    const handleUpdateUserRoleSuccessfulAlertModalCallToActionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        // trigger the user table to refresh
        setIsUsersTableUpdateSuccessful(true);
        return setIsUpdateUserRoleSuccessfulAlertModalOpen(false);
    };

    const handleSuspendUserSuccessfulAlertModalClickOutside = () => {
        // persist the success modal on click outside
        return setIsSuspendUserSuccessfulAlertModalOpen(true);
    };

    const handleSuspendUserSuccessfulAlertModalCallToActionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        // trigger the user table to refresh
        setIsUsersTableUpdateSuccessful(true);
        return setIsSuspendUserSuccessfulAlertModalOpen(false);
    };

    const handleSuspendUserConfirmationModalClickOutside = () => {
        setError(null);
        return setIsSuspendUserConfirmationModalOpen(false);
    };

    const handleSuspendUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!userId) return;
        setError(null);
        setIsLoading(true);
        try {
            const response = await suspendUserService(TOKEN, userId);
            if (response.status === "success") {
                setIsLoading(false);
                setIsSuspendUserConfirmationModalOpen(false);
                return setIsSuspendUserSuccessfulAlertModalOpen(true);
            } else {
                setIsLoading(false);
                setError('Suspend user operation failed. Please try again.');
            }
        } catch (error: any) {
            setIsLoading(false);
            setError(`Suspend user operation failed. ${error.message}`);
            console.error('Suspend user operation failed:', error);
        }
    }

    const handleSuspendUserConfirmationModalCallToActionClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, action: string) => {
        switch (action) {
            case "cancel":
                setIsSuspendUserConfirmationModalOpen(false);
                break;
            case "yes":
                await handleSuspendUser(e);
                break;
            default:
                return
        }
    };

    const handleActionIconClick = (id: string) => {
        setActivatedRowId(id);
        return setUserId(id);
    };

    const handleActionItemClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, action: string) => {
        e.preventDefault();
        switch (action) {
            case "Change Role":
                setIsUpdateUserRoleFormModalOpen(true);
                break;
            case "Suspend User":
                setIsSuspendUserConfirmationModalOpen(true);
                break;
            default:
                return
        };
        return setActivatedRowId(null);
    };

    const handleDropDownClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setActivatedRowId(null);
        }
    };

    useEffect(() => {
        if (activatedRowId !== null) {
            document.addEventListener("mousedown", handleDropDownClickOutside);
        } else {
            document.removeEventListener("mousedown", handleDropDownClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleDropDownClickOutside);
        };
    }, [activatedRowId]);

    return (
        <BaseTable
            headers={tableHeaders}
        >
            <UsersTableBodyWrapper>
                {rows?.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell>{row?.firstName + " " + row?.lastName}</TableCell>
                        <TableCell>{row?.phone}</TableCell>
                        <TableCell>{row?.email}</TableCell>
                        <TableCell>{row?.role}</TableCell>
                        <TableCell>
                            <IconButton
                                onClick={() => handleActionIconClick(row?._id)}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            {(activatedRowId === row?._id) && (
                                <List
                                    component={"ul"}
                                    ref={dropdownRef}
                                >
                                    {actions.map((action, index) => (
                                        <ListItem
                                            key={index}
                                            onClick={(e) => handleActionItemClick(e, action)}
                                        >
                                            <ListItemButton>
                                                <ListItemText
                                                    primary={action}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </UsersTableBodyWrapper>
            {/* Update User Modal below */}
            <UpdateUserRoleForm
                userId={userId}
                alertModalController={setIsUpdateUserRoleSuccessfulAlertModalOpen}
            />
            {/* Suspend User Confirmation Modal below */}
            <BaseConfirmationModal
                className="suspend-user-confirmation-modal"
                message="Are you sure you want to Suspend user?"
                open={isSuspendUserConfirmationModalOpen}
                error={error as string}
                isLoading={isLoading}
                handleClickOutside={handleSuspendUserConfirmationModalClickOutside}
                handleCallToActionClick={handleSuspendUserConfirmationModalCallToActionClick}
            />
            {/* Suspend User Success Modal Below */}
            <BaseAlertModal
                callToAction="Close"
                className="suspend-user-successful-modal"
                message="User suspended successfully"
                open={isSuspendUserSuccessfulAlertModalOpen}
                handleClickOutside={handleSuspendUserSuccessfulAlertModalClickOutside}
                handleCallToActionClick={handleSuspendUserSuccessfulAlertModalCallToActionClick}
            />
            {/* Role Update Success Modal Below */}
            <BaseAlertModal
                callToAction="Close"
                className="update-user-role-successful-modal"
                message="Role changed successfully"
                open={isUpdateUserRoleSuccessfulAlertModalOpen}
                handleClickOutside={handleUpdateUserRoleSuccessfulAlertModalClickOutside}
                handleCallToActionClick={handleUpdateUserRoleSuccessfulAlertModalCallToActionClick}
            />
        </BaseTable>
    )
}
