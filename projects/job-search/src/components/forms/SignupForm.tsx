"use client";

import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import TermsCheckbox from "./components/TermsCheckbox";
import SubmitButton from "./components/SubmitButton";
import StatusMessage from "./components/StatusMessage";
import { useSignupForm } from "./hooks/useSignupForm";
import { ROLE_OPTIONS, FORM_FIELDS } from "./constants/signupFormFields";

export default function SignupForm({ intercepted }: { intercepted: boolean }) {
  const { formDetails, status, isPending, handleChange, handleSubmit } =
    useSignupForm(intercepted);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <FormInput
        {...FORM_FIELDS.username}
        value={formDetails.username}
        onChange={handleChange}
      />

      <FormInput
        {...FORM_FIELDS.email}
        value={formDetails.email}
        onChange={handleChange}
      />

      <FormInput
        {...FORM_FIELDS.password}
        value={formDetails.password}
        onChange={handleChange}
      />

      <FormSelect
        {...FORM_FIELDS.role}
        value={formDetails.role}
        options={ROLE_OPTIONS}
        onChange={handleChange}
      />

      <TermsCheckbox />

      <SubmitButton
        isPending={isPending}
        text="Create Account"
        pendingText="Creating Account..."
      />

      <StatusMessage status={status} />
    </form>
  );
}
