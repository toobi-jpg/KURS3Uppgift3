import FormInput from "./FormInput";
import * as yup from "yup";
import { useState } from "react";
import ThreeDots from "react-loading-icons/dist/esm/components/three-dots";

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

  const salaryWarning = () => {
    if (formData.salary === "<5000") {
      return (
        <div className="flex justify-center font-semibold text-xs bg-button rounded-lg border-1 border-button py-1 px-1 min-w-64 mt-4">
          Obs! Lägre lön kan påverka din ansökan
        </div>
      );
    } else if (formData.salary === "5000-10000" && formData.amount >= 100000) {
      return (
        <div className="flex justify-center font-semibold text-xs bg-button rounded-lg border-1 border-button py-1 px-1 min-w-64 mt-4">
          Obs! Lägre lön kan påverka din ansökan
        </div>
      );
    }
  };

  const initialFormState = {
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

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("loanFormData");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialFormState;
      }
    }
    return initialFormState;
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  function handleChange(e) {
    const { id, type, value, checked } = e.target;
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

  async function handleSubmit(event) {
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
      setShowLoading(true);

      setTimeout(() => {
        setShowLoading(false);
        setShowSuccess(true);
        setFormData(initialFormState);
        localStorage.removeItem("loanFormData");
        console.log(validatedData);
      }, 3000);
    } catch (err) {
      if (err.name === "ValidationError") {
        const formErrors = {};
        err.inner.forEach((error) => {
          if (error.path) formErrors[error.path] = error.message;
        });
        setErrors(formErrors);
      }
    }
  }

  return (
    <div className="flex flex-col mx-auto items-center rounded-xl bg-bg2 p-6 card-shadow">
      <form
        id="loan-form"
        onSubmit={handleSubmit}
        action="loan-application"
        className="flex sm:flex-row sm:items-start items-center flex-col gap-6 w-full"
      >
        <div id="left-container" className="flex flex-col items-center w-1/2">
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
        </div>
        <div id="right-container" className="flex flex-col items-center w-1/2">
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
          {salaryWarning()}

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
        </div>
      </form>
      <div
        id="bottom-container"
        className="flex mx-auto flex-col sm:flex-row sm:items-center gap-6 w-full mt-2"
      >
        <div id="left-inner-container" className="sm:w-1/2 flex items-center">
          <FormInput
            type="textarea"
            label="Kommentar"
            id="comment-input"
            value={formData.comment}
            onChange={handleChange}
          />
        </div>
        <div
          id="right-inner-container"
          className="sm:w-1/2 flex items-center justify-center mt-4"
        >
          <button
            type="submit"
            form="loan-form"
            className="bg-button py-1 px-6 rounded-full border-1 border-button font-medium"
          >
            Skicka ansökan
          </button>
        </div>
      </div>
      {showLoading && (
        <div className="mt-4">
          <ThreeDots width={"48px"} fill={"#09b880"} />
        </div>
      )}
      {showSuccess && (
        <div className="flex items-center font-semibold gap-2 bg-button rounded-full border-1 border-button py-2 px-5 max-w-full mt-4">
          <i className="bx bxs-badge-check bx-md text-icon"></i>
          <h4>Låneansökan har skickats!</h4>
        </div>
      )}
    </div>
  );
}
