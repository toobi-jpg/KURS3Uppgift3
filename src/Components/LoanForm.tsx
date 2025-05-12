import FormInput from "./FormInput";
import * as yup from "yup";
import { useState } from "react";

const loanSchema = yup.object({
  name: yup.string().required("Vänligen ange för och efternamn."),
  phone: yup
    .string()
    .matches(/^\d{8,}$/, "Vänligen ange ett giltigt telefonnummer.")
    .required("Vänligen ange ett telefonnummer."),
  age: yup
    .number()
    .min(18, "Du måste vara minst 18 år.")
    .required("Vänligen ange din ålder."),
  employed: yup.boolean(),
  salary: yup.string().required("Vänligen ange ditt lönespann."),
  amount: yup
    .number()
    .min(10000, "Lånebeloppet måste vara minst 10 000kr")
    .required("Vänligen ange lånebelopp."),
  purpose: yup.string().required("Vänligen ange syfte med lånet."),
  period: yup
    .number()
    .min(1, "Återbetalningstid måste vara minst 1 år")
    .required("Vänligen ange en återbetalningstid."),
  comment: yup.string(),
});

export default function LoanForm() {
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("loanFormData");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {
          name: "",
          phone: "",
          age: "",
          employed: false,
          salary: "",
          amount: "",
          purpose: "",
          period: "",
          comment: "",
        };
      }
    }
    return {
      name: "",
      phone: "",
      age: "",
      employed: false,
      salary: "",
      amount: "",
      purpose: "",
      period: "",
      comment: "",
    };
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { id, type, value, checked } = e.target as HTMLInputElement;
    let newData = { ...formData };
    if (type === "checkbox") {
      newData = { ...formData, employed: checked };
    } else if (id === "salary-input") {
      newData = { ...formData, salary: value };
    } else if (id === "amount-input") {
      newData = { ...formData, amount: value };
    } else if (id === "name-input") {
      newData = { ...formData, name: value };
    } else if (id === "phone-input") {
      newData = { ...formData, phone: value };
    } else if (id === "age-input") {
      newData = { ...formData, age: value };
    } else if (id === "purpose-input") {
      newData = { ...formData, purpose: value };
    } else if (id === "period-input") {
      newData = { ...formData, period: value };
    } else if (id === "comment-input") {
      newData = { ...formData, comment: value };
    }
    setFormData(newData);
    localStorage.setItem("loanFormData", JSON.stringify(newData));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const convertFormTypes = {
      ...formData,
      age: Number(formData.age),
      phone: Number(formData.phone),
      amount: Number(formData.amount),
      period: Number(formData.period),
    };

    try {
      const validatedData = await loanSchema.validate(convertFormTypes, {
        abortEarly: false,
      });
      setErrors({});
      setShowSuccess(true);
      console.log(validatedData);
    } catch (err: any) {
      if (err.name === "ValidationError") {
        const formErrors: Record<string, string> = {};
        err.inner.forEach((error: any) => {
          if (error.path) formErrors[error.path] = error.message;
        });
        setErrors(formErrors);
      }
    }
  }

  return (
    <div className="flex mx-auto max-w-sm items-center rounded-xl bg-bg p-6 card-shadow">
      <form
        onSubmit={handleSubmit}
        action="loan-application"
        className="flex flex-col items-center"
      >
        <FormInput
          type="text"
          label="Namn"
          id="name-input"
          value={formData.name}
          onChange={handleChange}
          placeholder="Johan Johansson"
          error={errors.name}
        />
        <FormInput
          type="tel"
          label="Telefon"
          id="phone-input"
          value={formData.phone}
          onChange={handleChange}
          placeholder="070-123 45 67"
          error={errors.phone}
        />
        <FormInput
          type="number"
          label="Ålder"
          id="age-input"
          value={formData.age}
          onChange={handleChange}
          placeholder="32"
          error={errors.age}
        />
        <FormInput
          type="checkbox"
          label="Är du anställd?"
          value={formData.employed}
          onChange={handleChange}
          id="employed-input"
          error={errors.employed}
        />
        <FormInput
          type="select"
          label="Din lön"
          id="salary-input"
          value={formData.salary}
          onChange={handleChange}
          error={errors.salary}
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
          error={errors.amount}
        />
        <FormInput
          type="text"
          label="Syfte"
          id="purpose-input"
          value={formData.purpose}
          onChange={handleChange}
          placeholder="Bilköp"
          error={errors.purpose}
        />
        <FormInput
          type="number"
          label="Återbetalningstid i år"
          id="period-input"
          value={formData.period}
          onChange={handleChange}
          placeholder="3"
          error={errors.period}
        />
        <FormInput
          type="textarea"
          label="Kommentar"
          id="comment-input"
          value={formData.comment}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-button py-1 px-6 rounded-full border-1 border-button mt-2 font-medium"
        >
          Skicka
        </button>
        {showSuccess && (
          <div className="flex items-center font-semibold gap-2 bg-bg-light rounded-full border-1 border py-2 px-4 max-w-full mt-4">
            <i className="bx bxs-badge-check"></i>
            <h4>Låneansökan har skickats!</h4>
          </div>
        )}
      </form>
    </div>
  );
}
