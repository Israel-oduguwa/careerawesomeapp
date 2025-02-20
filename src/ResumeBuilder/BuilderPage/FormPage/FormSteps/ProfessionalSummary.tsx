import React from "react";
import { Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { NotebookTabs } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
function ProfessionalSummary({
  control,
  register,
  onChange,
  getValues,
  setValue,
  watch,
  handleFieldUpdate,
  errors,
}: any) {
  return (
    <div>
      <div className="mb-4 mt-10">
        <h2 className="text-lg text-slate-900 flex flex-row items-center font-bold antialiased leading-tight tracking-tight">
          <NotebookTabs strokeWidth={1.5} /> Contact Details
        </h2>
      </div>
      <div>
        <div className="row mb-5">
          <div className="col-6 p-0 m-0">
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <motion.div
                  animate={{
                    x: !!errors.firstName ? [-10, 10, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label
                      className="text-sm text-slate-600 antialiased"
                      htmlFor="email"
                    >
                      First name
                    </Label>
                    <Input
                      {...field}
                      onBlur={(e) => {
                        field.onBlur(); // Call the original onBlur event handler
                        handleFieldUpdate(field.name, e.target.value); // Call the custom handleFieldUpdate function
                      }}
                      type="text"
                      id="first-name"
                      placeholder="Jane"
                    />
                  </div>
                </motion.div>
              )}
            />
          </div>
          <div className="col-6 p-0 m-0">
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <motion.div
                  animate={{
                    x: !!errors.firstName ? [-10, 10, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label
                      className="text-sm text-slate-600 antialiased"
                      htmlFor="last name"
                    >
                      Last name
                    </Label>
                    <Input
                      {...field}
                      onBlur={(e) => {
                        field.onBlur(); // Call the original onBlur event handler
                        handleFieldUpdate(field.name, e.target.value); // Call the custom handleFieldUpdate function
                      }}
                      type="text"
                      id="last_name"
                      placeholder="Doe"
                    />
                  </div>
                </motion.div>
              )}
            />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-12 p-0 m-0">
            <Controller
              name="profession"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <motion.div
                  animate={{
                    x: !!errors.firstName ? [-10, 10, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid w-full gap-1.5">
                    <Label
                      className="text-sm text-slate-600 antialiased"
                      htmlFor="Profession"
                    >
                      Profession
                    </Label>
                    <Input
                      {...field}
                      className="w-full block"
                      onBlur={(e) => {
                        field.onBlur(); // Call the original onBlur event handler
                        handleFieldUpdate(field.name, e.target.value); // Call the custom handleFieldUpdate function
                      }}
                      type="text"
                      id="profession"
                      placeholder="Senior front end web developer"
                    />
                  </div>
                </motion.div>
              )}
            />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-6 p-0 m-0">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <motion.div
                  animate={{
                    x: !!errors.email ? [-10, 10, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label
                      className="text-sm text-slate-600 antialiased"
                      htmlFor="email"
                    >
                      Email
                    </Label>
                    <Input
                      {...field}
                      onBlur={(e) => {
                        field.onBlur(); // Call the original onBlur event handler
                        handleFieldUpdate(field.name, e.target.value); // Call the custom handleFieldUpdate function
                      }}
                      type="email"
                      id="email"
                      placeholder="Jane@careerawesome.com"
                    />
                  </div>
                </motion.div>
              )}
            />
          </div>
          <div className="col-6 p-0 m-0">
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <motion.div
                  animate={{
                    x: !!errors.phone ? [-10, 10, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label
                      className="text-sm text-slate-600 antialiased"
                      htmlFor="last name"
                    >
                      Last name
                    </Label>
                    <Input
                      {...field}
                      onBlur={(e) => {
                        field.onBlur(); // Call the original onBlur event handler
                        handleFieldUpdate(field.name, e.target.value); // Call the custom handleFieldUpdate function
                      }}
                      type="number"
                      id="phone"
                      placeholder="Phone number"
                    />
                  </div>
                </motion.div>
              )}
            />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-6 p-0 m-0">
            <Controller
              name="streetAddress"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <motion.div
                  animate={{
                    x: !!errors.streetAddress ? [-10, 10, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label
                      className="text-sm text-slate-600 antialiased"
                      htmlFor="email"
                    >
                      Street address
                    </Label>
                    <Input
                      {...field}
                      onBlur={(e) => {
                        field.onBlur(); // Call the original onBlur event handler
                        handleFieldUpdate(field.name, e.target.value); // Call the custom handleFieldUpdate function
                      }}
                      type="text"
                      id="address"
                      placeholder="12 Princeton str"
                    />
                  </div>
                </motion.div>
              )}
            />
          </div>
          <div className="col-6 p-0 m-0">
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <motion.div
                  animate={{
                    x: !!errors.phone ? [-10, 10, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label
                      className="text-sm text-slate-600 antialiased"
                      htmlFor="last name"
                    >
                      City
                    </Label>
                    <Input
                      {...field}
                      onBlur={(e) => {
                        field.onBlur(); // Call the original onBlur event handler
                        handleFieldUpdate(field.name, e.target.value); // Call the custom handleFieldUpdate function
                      }}
                      type="text"
                      id="city"
                      placeholder="Albany"
                    />
                  </div>
                </motion.div>
              )}
            />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-6 p-0 m-0">
            <Controller
              name="countryCode"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <motion.div
                  animate={{
                    x: !!errors.countryCode ? [-10, 10, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label
                      className="text-sm text-slate-600 antialiased"
                      htmlFor="Country"
                    >
                      Country
                    </Label>
                    <Input
                      {...field}
                      onBlur={(e) => {
                        field.onBlur(); // Call the original onBlur event handler
                        handleFieldUpdate(field.name, e.target.value); // Call the custom handleFieldUpdate function
                      }}
                      type="text"
                      id="Country"
                      placeholder="USA"
                    />
                  </div>
                </motion.div>
              )}
            />
          </div>
          <div className="col-3 p-0 m-0">
            <Controller
              name="postalCode"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <motion.div
                  animate={{
                    x: !!errors.postalCode ? [-10, 10, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label
                      className="text-sm text-slate-600 antialiased"
                      htmlFor="postal_code"
                    >
                      Postal Code
                    </Label>
                    <Input
                      {...field}
                      onBlur={(e) => {
                        field.onBlur(); // Call the original onBlur event handler
                        handleFieldUpdate(field.name, e.target.value); // Call the custom handleFieldUpdate function
                      }}
                      type="number"
                      id="postal_code"
                      placeholder="25156"
                    />
                  </div>
                </motion.div>
              )}
            />
          </div>
          <div className="col-3 p-0 m-0">
            <Controller
              name="region"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <motion.div
                  animate={{
                    x: !!errors.region ? [-10, 10, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label
                      className="text-sm text-slate-600 antialiased"
                      htmlFor="region"
                    >
                      Region/State
                    </Label>
                    <Input
                      {...field}
                      onBlur={(e) => {
                        field.onBlur(); // Call the original onBlur event handler
                        handleFieldUpdate(field.name, e.target.value); // Call the custom handleFieldUpdate function
                      }}
                      type="text"
                      id="region"
                      placeholder="New York"
                    />
                  </div>
                </motion.div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalSummary;
