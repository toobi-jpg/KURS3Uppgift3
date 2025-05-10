import FormInput from "./FormInput";

export default function LoanForm() {
  return (
    <div className="flex mx-auto max-w-sm items-center rounded-xl bg-bg p-6 border-1 border-light">
      <form action="loan-application" className="flex flex-col items-center">
        <FormInput type="text" label="Name" id="name-input" />
        <FormInput type="number" label="Phone" id="phone-input" />
        <FormInput type="number" label="Age" id="age-input" />
        <FormInput
          type="checkbox"
          label="Are you Employed?"
          id="employed-input"
        />
      </form>
    </div>
  );
}
