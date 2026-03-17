import { useState } from "react";

export function useForm({ initialValues, validate }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Validación en tiempo real solo si el campo ya fue tocado
    if (touched[name]) { 
      
      const validationErrors = validate({ ...values, [name]: value });
      setErrors((prev) => ({
        ...prev,
        [name]: validationErrors[name] || "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validar al salir del campo
    const validationErrors = validate(values);
    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name] || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Marcar todos como tocados
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {},
    );
    setTouched(allTouched);

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setValues(initialValues);
      setTouched({});

      setTimeout(() => setIsSubmitted(false), 3000);
    }, 500);
  };

  return {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
