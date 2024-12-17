import { useContext, useState } from "react";
import { Context } from "../../context";
import { BaseFormModal } from "../../component/modal/form"
import { AddUserFormWrapper } from "./styled";
import { BaseInput } from "../../component/form/input/styled";
import { BaseSelect } from "../../component/form/select/styled";
import { BaseOption } from "../../component/form/option/styled";
import { Box, CircularProgress, SelectChangeEvent, Typography } from "@mui/material";
import { BaseButton } from "../../component/button/styled";
import { createUserService } from "../../util/api/user/createUser";
import Cookies from "universal-cookie";

export const AddUserForm = () => {
    const cookies = new Cookies();
    const TOKEN = cookies.getAll().TOKEN;
    const roles: Record<any, any> = [
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
        }
    ];

    const { isAddUserFormModalOpen, setIsAddUserFormModalOpen, setIsAddUserSuccessfulAlertModalOpen } = useContext(Context);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formDetails, setFormDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: " "
    });

    const handleClickOutside = () => {
        // reset form;
        setError(null);
        setFormDetails({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            role: " "
        });
        return setIsAddUserFormModalOpen(false);
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
        setError(null);
        setIsLoading(true);
        try {
            const response = await createUserService(TOKEN, formDetails);
            if (response.status === "success") {
                setIsLoading(false);
                // reset form;
                setFormDetails({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    role: " "
                });
                setIsAddUserFormModalOpen(false);
                return setIsAddUserSuccessfulAlertModalOpen(true);
            } else {
                setIsLoading(false);
                setError('Create user operation failed. Please check your credentials and try again.');
            }
        } catch (error: any) {
            setIsLoading(false);
            setError(`Create user operation failed. ${error.message}`);
            console.error('Create user operation failed:', error);
        }
    };

    return (
        <BaseFormModal
            open={isAddUserFormModalOpen}
            handleClickOutside={handleClickOutside}
            handleSubmit={handleSubmit}
            title="Add a new user"
            className="add-user-form-modal"
        >
            <AddUserFormWrapper>
                <BaseInput
                    required
                    type="text"
                    name="firstName"
                    value={formDetails.firstName}
                    placeholder="First Name"
                    onChange={(e) => handleChange(e)}
                />
                <BaseInput
                    required
                    type="text"
                    name="lastName"
                    value={formDetails.lastName}
                    placeholder="Last Name"
                    onChange={(e) => handleChange(e)}
                />
                <BaseInput
                    required
                    type="email"
                    name="email"
                    value={formDetails.email}
                    placeholder="Email"
                    onChange={(e) => handleChange(e)}
                />
                <BaseInput
                    type="phone"
                    name="phone"
                    value={formDetails.phone}
                    placeholder="Phone"
                    onChange={(e) => handleChange(e)}
                />
                <BaseSelect
                    required
                    name="role"
                    value={formDetails.role}
                    onChange={(e) => handleChange(e)}
                >
                    <BaseOption
                        value={" "}
                    >
                        Select a role
                    </BaseOption>
                    {roles?.map((role: Record<any, any>, index: string) => {
                        return (
                            <BaseOption
                                key={index}
                                value={role.name}
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
                <Box
                    component={"div"}
                    className="add-button-box"
                >
                    <BaseButton
                        type="submit"
                        variant="contained"
                        sx={{
                            width: "100%"
                        }}
                        radius="4px"
                        colour="#FFFFFF"
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
                                Add
                            </Typography>
                        )}
                    </BaseButton>
                </Box>
            </AddUserFormWrapper>
        </BaseFormModal>
    )
}
