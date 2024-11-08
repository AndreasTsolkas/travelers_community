
import { useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Important from "src/important";
import * as Display from "src/display";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { hasAccessAuth } from "src/useAuth";
import { httpClient } from "src/requests";
import MuiTextField from "src/components/MuiTextField";
import {
  DisplaySmallGenericTitle,
} from "src/display";
import "src/css/pages.css";

const PasswordEdit = () => {
  const profileUrl = Important.profileUrl;
  const [isCurrentPasswordValidated, setIsCurrentPasswordValidated] =
    useState<boolean>(false);
  const [passwordChangedSuccessfully, setPasswordChangedSuccessfully] =
    useState<boolean>(false);
  const defaultFormTitleText = "Validate current password";
  const [formTitle, setFormTitle] = useState<string>(defaultFormTitleText);

  hasAccessAuth();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const navigate = useNavigate();

  const onReset = () => {
    reset({
      oldPassword: "",
      newPassword: "",
    });
    setIsCurrentPasswordValidated(false);
    setPasswordChangedSuccessfully(false);
    setFormTitle(defaultFormTitleText);
  };

  const onPasswordValidation = async (data: any) => {
    const requestUrl = profileUrl + "/checkpassword";
    const postData = {
      password: data.oldPassword,
    };

    await httpClient
      .post(requestUrl, postData)
      .then((response) => {
        toast.success(
          "The password you sent is valid. You are ready to set your new password."
        );
        setIsCurrentPasswordValidated(true);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message);
      });
  };

  const onPasswordChange = async (data: any) => {
    const requestUrl = profileUrl + "/update/password";
    const patchData = {
      newpassword: data.newPassword,
    };
    await httpClient
      .patch(requestUrl, patchData)
      .then((response) => {
        toast.success("Your password changed successfully.");
        setPasswordChangedSuccessfully(true);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message);
      });
  };

  const onSubmit = async (data: any) => {
    try {
      if (!isCurrentPasswordValidated) await onPasswordValidation(data);
      else await onPasswordChange(data);
    } catch (error) {
      console.error(error);
    }
  };

  function updateFormTitle() {
    if (isCurrentPasswordValidated) setFormTitle("Enter your new password");
  }

  useEffect(() => {
    updateFormTitle();
  }, [isCurrentPasswordValidated]);

  return (
    <>
      
        <Box className='display-form-box'>
        {Display.DisplayIconButton()}
            {!passwordChangedSuccessfully ? (
              <form onReset={onReset} onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: "0.9375rem", marginTop: "0.9375rem" }}>
                  <DisplaySmallGenericTitle text={formTitle} />
                </div>
                {!isCurrentPasswordValidated ? (
                  <>
                    <MuiTextField
                      errors={errors}
                      control={control}
                      name="oldPassword"
                      label="Password"
                    />
                  </>
                ) : (
                  <MuiTextField
                    errors={errors}
                    control={control}
                    name="newPassword"
                    label="New password"
                  />
                )}

                <Button color = 'inherit' className = 'icon-button-no-focus' type="submit" variant="contained" sx={{ mt: 1, mb: 2 }}>
                  Submit
                </Button>
                <Button
                  color = 'inherit'
                  className = 'icon-button-no-focus'
                  type="reset"
                  sx={{ mt: 1, mb: 2 }}
                  style={{ marginLeft: "1.25rem" }}
                  variant="outlined"
                >
                  Reset
                </Button>
              </form>
            ) : (
              <h3>Password changed successfully.</h3>
            )}
        </Box>
    </>
  );
};

export default PasswordEdit;
