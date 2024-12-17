import { useContext, useEffect, useMemo, useState } from "react";
import { Context } from "../../context";
import { BaseFormModal } from "../../component/modal/form"
import { UpdateUserFormWrapper } from "./styled";
import { BaseSelect } from "../../component/form/select/styled";
import { BaseOption } from "../../component/form/option/styled";
import { CircularProgress, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { BaseButton } from "../../component/button/styled";
import { UpdateUserRoleFormPropsType } from "../../type/form.type";
import { updateUserRoleService } from "../../util/api/user/updateUserRole";
import Cookies from "universal-cookie";
import { retrieveUserByIdService } from "../../util/api/user/retrieveUserById";

export const UpdateUserRoleForm: React.FC<UpdateUserRoleFormPropsType> = ({ userId, alertModalController }) => {
    const cookies = new Cookies();
    const TOKEN = cookies.getAll().TOKEN;

    const roles: Record<any, any> = useMemo(() => [
        {
            id: 0,
            name: "Super Admin"
        },
        {
            id: 1,
            name: "Admin"
        },
        {
            id: 2,
            name: "Support"
        },
        {
            id: 3,
            name: "User"
        },
    ], []);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { isUpdateUserRoleFormModalOpen, setIsUpdateUserRoleFormModalOpen } = useContext(Context);
    const [formDetails, setFormDetails] = useState({
        role: " "
    });

    useEffect(() => {
        if (!userId) return;
        const fetchUserRole = async () => {
            try {
                const data = await retrieveUserByIdService(TOKEN, userId);
                const transformedRole = roles.find((role: Record<any, any>) => role.name === data.role);
                setFormDetails({ role: transformedRole.id });
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        }
        fetchUserRole();
    }, [TOKEN, userId, roles]);

    const handleClickOutside = () => {
        return setIsUpdateUserRoleFormModalOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<unknown>) => {
        const { name, value } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userId) return;
        setError(null);
        setIsLoading(true);
        try {
            const response = await updateUserRoleService(TOKEN, userId, formDetails);
            if (response.status === "success") {
                setIsLoading(false);
                setIsUpdateUserRoleFormModalOpen(false);
                return alertModalController(true);
            } else {
                setIsLoading(false);
                setError('Update role operation failed. Please check your credentials and try again.');
            }
        } catch (error: any) {
            setIsLoading(false);
            setError(`Update role operation failed. ${error.message}`);
            console.error('Update role operation failed:', error);
        }
    };

    return (
        <BaseFormModal
            open={isUpdateUserRoleFormModalOpen}
            handleClickOutside={handleClickOutside}
            handleSubmit={handleSubmit}
            title="Change Role"
            className="update-user-form-modal"
        >
            <UpdateUserFormWrapper>
                <BaseSelect
                    required
                    name="role"
                    value={formDetails.role}
                    onChange={(e) => handleChange(e)}
                >
                    <BaseOption
                        value={" "}
                    >
                        Select Role
                    </BaseOption>
                    {roles?.map((role: Record<any, any>, index: string) => {
                        return (
                            <BaseOption
                                key={index}
                                value={role.id}
                            >
                                {role.name}
                            </BaseOption>
                        )
                    })}
                </BaseSelect>
                {error && <Typography
                    fontFamily={"Poppins"}
                    fontWeight={700}
                    fontSize={13}
                    lineHeight={"normal"}
                    color={"#FF0000"}
                    whiteSpace={"normal"}
                >
                    {error}
                </Typography>}
                <Stack
                    direction={{ miniTablet: "row" }}
                    gap={"calc(var(--flex-gap)/4)"}
                    overflow={"hidden"}
                >
                    <BaseButton
                        variant="contained"
                        sx={{
                            flex: 1
                        }}
                        radius="4px"
                        colour="#000000"
                        bgcolor={"#E5E5E5"}
                        onClick={() => setIsUpdateUserRoleFormModalOpen(false)}
                    >
                        <Typography
                            variant={"button"}
                            fontFamily={"inherit"}
                            fontWeight={"inherit"}
                            fontSize={"inherit"}
                            lineHeight={"inherit"}
                            color={"inherit"}
                            textTransform={"inherit"}
                        >
                            Cancel
                        </Typography>
                    </BaseButton>
                    <BaseButton
                        type="submit"
                        variant="contained"
                        sx={{
                            flex: 1
                        }}
                        radius="4px"
                        bgcolor="#313131"
                    >
                        {isLoading ? (
                            <CircularProgress color="inherit" className="loader" />
                        ) : (
                            <Typography
                                variant={"button"}
                                fontFamily={"inherit"}
                                fontWeight={"inherit"}
                                fontSize={"inherit"}
                                lineHeight={"inherit"}
                                color={"inherit"}
                                textTransform={"inherit"}
                            >
                                Ok
                            </Typography>
                        )}
                    </BaseButton>
                </Stack>
            </UpdateUserFormWrapper>
        </BaseFormModal>
    )
}