import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { BaseTable } from "../../component/table";
import { OpportunitiesTableBodyWrapper } from "./styled";
import { OpportunitiesTablePropsType } from "../../type/table.type";
import { IconButton, List, ListItem, ListItemButton, ListItemText, TableCell, TableRow } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BaseAlertModal } from "../../component/modal/alert";
import { BaseConfirmationModal } from "../../component/modal/confirmation";
import { deleteOpportunityService } from "../../util/api/opportunity/deleteOpportunity";
import { useNavigate } from "react-router-dom";
import { BaseInfoModal } from "../../component/modal/info";
import { retrieveOpportunityService } from "../../util/api/opportunity/retrieveOpportunity";

export const OpportunitiesTable: React.FC<OpportunitiesTablePropsType> = ({ rows, setIsOpportunitiesTableUpdateSuccessful }) => {
    const cookies = new Cookies();
    const TOKEN = cookies.getAll().TOKEN;

    const actions = ["Edit Details", "View Details", "Delete Opportunity"];
    const tableHeaders = ["Organisation", "Opportunity Description", "Organization Type", "Email", "Location", "Action"];

    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLUListElement | null>(null);

    const [opportunityId, setOpportunityId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activatedRowId, setActivatedRowId] = useState<string | null>(null);
    const [activatedOpportunity, setActivatedOpportunity] = useState<Record<any, any>>({});
    const [isOpportunityDetailsModalOpen, setIsOpportunityDetailsModalOpen] = useState(false);
    const [isDeleteOpportunityConfirmationModalOpen, setIsDeleteOpportunityConfirmationModalOpen] = useState(false);
    const [isDeleteOpportunitySuccessfulAlertModalOpen, setIsDeleteOpportunitySuccessfulAlertModalOpen] = useState(false);

    const handleActionIconClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        e.stopPropagation();
        setActivatedRowId(id);
        return setOpportunityId(id);
    };

    const handleFetchActivatedOpportunity = async (id: string) => {
        try {
            const data = await retrieveOpportunityService(TOKEN, id);
            setActivatedOpportunity(data);
            console.log(data);
        } catch (err) {
            console.error("Failed to fetch opportunity:", err);
        }
    };

    useEffect(() => console.log(activatedRowId), [activatedRowId]);

    const handleActionItemClick = async (e: React.MouseEvent<HTMLLIElement, MouseEvent>, action: string) => {
        e.stopPropagation();
        if (!activatedRowId) return;
        switch (action) {
            case "Edit Details":
                navigate(`/editopportunity/${activatedRowId}`);
                break;
            case "View Details":
                await handleFetchActivatedOpportunity(activatedRowId);
                setIsOpportunityDetailsModalOpen(true);
                break;
            case "Delete Opportunity":
                setIsDeleteOpportunityConfirmationModalOpen(true);
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

    const handleDeleteOpportunitySuccessfulAlertModalCallToActionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        // trigger the user table to refresh
        setIsOpportunitiesTableUpdateSuccessful(true);
        return setIsDeleteOpportunitySuccessfulAlertModalOpen(false);
    };

    const handleDeleteOpportunitySuccessfulAlertModalClickOutside = () => {
        // persist the success modal on click outside
        return setIsDeleteOpportunitySuccessfulAlertModalOpen(true);
    };

    const handleOpportunityDetailsModalCallToActionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        return setIsOpportunityDetailsModalOpen(false);
    };

    const handleOpportunityDetailsModalClickOutside = () => {
        return setIsOpportunityDetailsModalOpen(false);
    };

    const handleDeleteOpportunityConfirmationModalClickOutside = () => {
        setError(null);
        return setIsDeleteOpportunityConfirmationModalOpen(false);
    };

    const handleDeleteOpportunity = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!opportunityId) return;
        setError(null);
        setIsLoading(true);
        try {
            const response = await deleteOpportunityService(TOKEN, opportunityId);
            if (response.status === "success") {
                setIsLoading(false);
                setIsDeleteOpportunityConfirmationModalOpen(false);
                return setIsDeleteOpportunitySuccessfulAlertModalOpen(true);
            } else {
                setIsLoading(false);
                setError('Delete opportunity operation failed. Please try again.');
            }
        } catch (error: any) {
            setIsLoading(false);
            setError(`Delete opportunity operation failed. ${error.message}`);
            console.error('Delete opportunity operation failed:', error);
        }
    };

    const handleDeleteOpportunityConfirmationModalCallToActionClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, action: string) => {
        switch (action) {
            case "cancel":
                setIsDeleteOpportunityConfirmationModalOpen(false);
                break;
            case "yes":
                await handleDeleteOpportunity(e);
                break;
            default:
                return
        }
    };

    return (
        <BaseTable
            headers={tableHeaders}
        >
            <OpportunitiesTableBodyWrapper>
                {rows?.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell>{row?.organizationName}</TableCell>
                        <TableCell>{row?.opportunityDescription}</TableCell>
                        <TableCell>{row?.organizationType}</TableCell>
                        <TableCell>{row?.organizationContactEmail}</TableCell>
                        <TableCell>{row?.organizationLocation}</TableCell>
                        <TableCell>
                            <IconButton
                                onClick={(e) => handleActionIconClick(e, row?._id)}
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
            </OpportunitiesTableBodyWrapper>
            {/* Suspend User Confirmation Modal below */}
            <BaseConfirmationModal
                className="delete-opportunity-confirmation-modal"
                message="Are you sure you want to delete this opportunity?"
                open={isDeleteOpportunityConfirmationModalOpen}
                error={error as string}
                isLoading={isLoading}
                handleClickOutside={handleDeleteOpportunityConfirmationModalClickOutside}
                handleCallToActionClick={handleDeleteOpportunityConfirmationModalCallToActionClick}
            />
            {/* Delete Opportunity Success Modal Below */}
            <BaseAlertModal
                callToAction="Close"
                className="delete-opportunity-successful-modal"
                message="Opportunity deleted successfully"
                open={isDeleteOpportunitySuccessfulAlertModalOpen}
                handleClickOutside={handleDeleteOpportunitySuccessfulAlertModalClickOutside}
                handleCallToActionClick={handleDeleteOpportunitySuccessfulAlertModalCallToActionClick}
            />
            {/* Opportunity Detail Below */}
            <BaseInfoModal
                callToAction="Close"
                location="Opportunities"
                title="Opportunity Details"
                subtitle="Opportunity"
                details={activatedOpportunity}
                className="opportunity-details-modal"
                open={isOpportunityDetailsModalOpen}
                handleClickOutside={handleOpportunityDetailsModalClickOutside}
                handleCallToActionClick={handleOpportunityDetailsModalCallToActionClick}
            />
        </BaseTable>
    )
}
