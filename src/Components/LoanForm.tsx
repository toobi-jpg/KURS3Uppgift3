import FormInput from "./FormInput";

export default function LoanForm() {
  return (
    <div className="flex mx-auto max-w-sm items-center rounded-xl bg-bg p-6 card-shadow">
      <form action="loan-application" className="flex flex-col items-center">
        <FormInput type="text" label="Namn" id="name-input" />
        <FormInput type="number" label="Telefon" id="phone-input" />
        <FormInput type="number" label="Ålder" id="age-input" />
        <FormInput
          type="checkbox"
          label="Är du anställd?"
          id="employed-input"
        />
        <FormInput
          type="select"
          label="Din lön"
          id="salary-input"
          options={[
            { label: "Mindre än 5000kr", value: "<5000" },
            { label: "5000kr - 10 000kr", value: "5000-10000" },
            { label: "10 000kr - 20 000kr", value: "10000-20000" },
            { label: "Över 20 000kr", value: ">20000" },
          ]}
        />
        <FormInput type="number" label="Lånebelopp" id="amount-input" />
        <FormInput type="text" label="Syfte" id="purpose-input" />
        <FormInput type="number" label="Återbetalningstid" id="period-input" />
        <FormInput type="textarea" label="Kommentar" id="comment-input" />
      </form>
    </div>
  );
}
