import React, { useEffect } from "react";
import FormLayout from "./FormLayout";
import FormInputWrapper from "./FormInputWrapper";
import ProfessionalSummary from "./FormSteps/ProfessionalSummary";
import NavigationButtonWrapper from "./NavigationButtonWrapper";
import { Button } from "@/components/ui/button";
import SocialMedia from "./FormSteps/SocialMedia";
import Summary from "./FormSteps/Summary";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectResumeData,
  onResumeInput,
  updateCurrentStep,
  updateResumeSection,
  nextStep,
} from "@/lib/redux/features/ResumeStates/resumeSlice";
import { selectUserData } from "@/lib/redux/features/UserAuthentication/authenticationSlice";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required(
      "Want to make a great impression on your resume? enter your first name!"
    ),
  lastName: yup
    .string()
    .required(
      "Increase your chances of getting hired by adding your last name."
    ),
  profession: yup
    .string()
    .required(
      "Let recruiters know about your expertise by entering your profession."
    ),
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Don't miss out on important updates about your job application - add a valid email address - (your name)@gmail.com."
    )
    .required(
      "Oops, you forgot to add an email address! Please enter a valid one to stay informed."
    ),
});

function BasicDetails({ formData, resumeID }: any) {
  const dispatch = useAppDispatch();
  // const resumeState = useAppSelector(selectResumeData);
  const userData = useAppSelector(selectUserData);
  console.log(formData);
  // populate the form fields on mount
  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
    setFocus,
    getValues,
  } = useForm({
    mode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(schema),
    defaultValues: formData.BasicDetails,
  });
  useEffect(() => {
    if (errors) {
      const errorsvalues: any = Object.values(errors);
      if (errorsvalues.length > 0) {
        let firstErrorElement = document.getElementsByName(
          errorsvalues[0].ref.name
        )[0];
        firstErrorElement.scrollIntoView({
          behavior: `smooth`,
          block: "center",
        });
      }
    }
  }, [errors]);

  const handleFieldUpdate = async (name: any, value: string) => {
    setValue(name, value);
    const formData = JSON.parse(JSON.stringify(getValues()));
    const path = `resumeData.formData.BasicDetails`;

    dispatch(onResumeInput({ path, value: formData }));

    try {
      await dispatch(
        updateResumeSection({
          section: "BasicDetails",
          data: { _id: resumeID, value: formData },
        })
      );
    } catch (error) {
      console.error("Failed to update the resume section:", error);
    }
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    dispatch(nextStep());
    try {
      await dispatch(
        updateCurrentStep({
          _id: resumeID,
          value: formData.currentStep + 1,
        })
      );
    } catch (error) {
      console.error("Failed to update the current step:", error);
    }
  };
  
  return (
    <FormLayout>
      <div style={{ margin: "0 auto", maxWidth: "768px" }}>
        {/* <div className="row m-0 p-0">

        </div> */}
        <div className="">
          <FormInputWrapper>
            <ProfessionalSummary
              {...{
                control,
                register,
                getValues,
                setValue,
                watch,
                errors,
                handleFieldUpdate,
              }}
            />

            <SocialMedia
              {...{
                control,
                register,
                getValues,
                setValue,
                watch,
                errors,
                handleFieldUpdate,
              }}
            />
            <Summary
              userData={userData}
              {...{
                control,
                register,
                getValues,
                setValue,
                watch,
                errors,
                handleFieldUpdate,
              }}
            />
          </FormInputWrapper>
          <NavigationButtonWrapper>
            <div className="flex justify-end">
            <Button onClick={handleSubmit(onSubmit)}>Next</Button>
            </div>
          </NavigationButtonWrapper>
        </div>
      </div>
    </FormLayout>
  );
}

export default BasicDetails;

// <div>
// {/* this is an editable text  */}
// <h6 className="text-lg font-bold text-slate-700 dark:text-slate-100">
//   {formData.resumeName}
// </h6>
// </div>
