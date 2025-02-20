import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  nextStep,
  onResumeInput,
  previousStep,
  updateCurrentStep,
  updateResumeSection,
} from "@/lib/redux/features/ResumeStates/resumeSlice";
import { selectUserData } from "@/lib/redux/features/UserAuthentication/authenticationSlice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormInputWrapper from "./FormInputWrapper";
import FormLayout from "./FormLayout";
import Certification from "./FormSteps/Certification";
import Courses from "./FormSteps/Courses";
import Skill from "./FormSteps/Skill";
import NavigationButtonWrapper from "./NavigationButtonWrapper";

function Skills({ formData, resumeID }: any) {
  const dispatch = useAppDispatch();
  // const resumeState = useAppSelector(selectResumeData);
  const userData = useAppSelector(selectUserData);
  //   console.log(formData);
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
    // resolver: yupResolver(schema),
    defaultValues: formData.Skills,
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
    const path = `resumeData.formData.Skills`;

    dispatch(onResumeInput({ path, value: formData }));

    try {
      await dispatch(
        updateResumeSection({
          section: "Skills",
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
  const handleBack = async () => {
    dispatch(previousStep());

    try {
      await dispatch(
        updateCurrentStep({ _id: resumeID, value: formData.currentStep - 1 })
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
            <Skill
              {...{
                control,
                register,
                handleFieldUpdate,
                getValues,
                setValue,
                errors,
              }}
            />
            
            <Certification
              {...{
                control,
                register,
                handleFieldUpdate,
                getValues,
                setValue,
                errors,
              }}
            />
            <Courses
              {...{
                control,
                register,
                handleFieldUpdate,
                getValues,
                setValue,
                errors,
              }}
            />
          </FormInputWrapper>
          <NavigationButtonWrapper>
            <div className="flex gap-3 justify-end">
              <Button onClick={handleBack} variant="secondary">
                Back
              </Button>
              <Button onClick={handleSubmit(onSubmit)}>Next</Button>
            </div>
          </NavigationButtonWrapper>
        </div>
      </div>
    </FormLayout>
  );
}

export default Skills;
