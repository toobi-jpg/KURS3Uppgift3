import FormInput from "./FormInput";
import { useState } from "react";

export default function LoanForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    employed: false,
    salary: "",
    amount: "",
    purpose: "",
    period: "",
    comment: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { id, type, value, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData({ ...formData, employed: checked });
    } else if (id === "salary-input") {
      setFormData({ ...formData, salary: value });
    } else if (id === "amount-input") {
      setFormData({ ...formData, amount: value });
    } else if (id === "name-input") {
      setFormData({ ...formData, name: value });
    } else if (id === "phone-input") {
      setFormData({ ...formData, phone: value });
    } else if (id === "age-input") {
      setFormData({ ...formData, age: value });
    } else if (id === "purpose-input") {
      setFormData({ ...formData, purpose: value });
    } else if (id === "period-input") {
      setFormData({ ...formData, period: value });
    } else if (id === "comment-input") {
      setFormData({ ...formData, comment: value });
    }
  }

  function handleSubmit(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    event.preventDefault();
    const finalFormData = {
      ...formData,
      name: formData.name,
      phone: Number(formData.phone),
      age: Number(formData.age),
      employed: formData.employed,
      salary: formData.salary,
      amount: Number(formData.amount),
      purpose: formData.purpose,
      period: Number(formData.period),
      comment: formData.comment,
    };
    console.log(finalFormData);
  }

  return (
    <div className="flex mx-auto max-w-sm items-center rounded-xl bg-bg p-6 card-shadow">
      <form action="loan-application" className="flex flex-col items-center">
        <FormInput
          type="text"
          label="Namn"
          id="name-input"
          value={formData.name}
          onChange={handleChange}
          placeholder="Johan Johansson"
        />
        <FormInput
          type="number"
          label="Telefon"
          id="phone-input"
          value={formData.phone}
          onChange={handleChange}
          placeholder="070-123 45 67"
        />
        <FormInput
          type="number"
          label="Ålder"
          id="age-input"
          value={formData.age}
          onChange={handleChange}
          placeholder="32"
        />
        <FormInput
          type="checkbox"
          label="Är du anställd?"
          value={formData.employed}
          onChange={handleChange}
          id="employed-input"
        />
        <FormInput
          type="select"
          label="Din lön"
          id="salary-input"
          value={formData.salary}
          onChange={handleChange}
          options={[
            { label: "", value: "" },
            { label: "Mindre än 5000kr", value: "<5000" },
            { label: "5000kr - 10 000kr", value: "5000-10000" },
            { label: "10 000kr - 20 000kr", value: "10000-20000" },
            { label: "Över 20 000kr", value: ">20000" },
          ]}
        />
        <FormInput
          type="number"
          label="Lånebelopp"
          id="amount-input"
          value={formData.amount}
          onChange={handleChange}
          placeholder="100 000"
        />
        <FormInput
          type="text"
          label="Syfte"
          id="purpose-input"
          value={formData.purpose}
          onChange={handleChange}
          placeholder="Bilköp"
        />
        <FormInput
          type="number"
          label="Återbetalningstid i år"
          id="period-input"
          value={formData.period}
          onChange={handleChange}
          placeholder="3"
        />
        <FormInput
          type="textarea"
          label="Kommentar"
          id="comment-input"
          value={formData.comment}
          onChange={handleChange}
        />
        <button
          onClick={() => handleSubmit(event)}
          className="bg-button py-1 px-6 rounded-xl border-1 border-button mt-2 font-medium"
        >
          Skicka
        </button>
      </form>
    </div>
  );
}
