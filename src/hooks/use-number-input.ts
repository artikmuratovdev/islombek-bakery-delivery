import { useState, useCallback } from "react";

export const useNumberInput = (initialValue: string | number = "") => {
  const [value, setValue] = useState(() => {
    const numValue =
      typeof initialValue === "string"
        ? initialValue.replace(/\D/g, "")
        : String(initialValue);
    return numValue;
  });

  const formattedValue = useCallback(() => {
    if (!value) return "";
    return Number(value).toLocaleString("ru-RU");
  }, [value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setValue(onlyNumbers);
  }, []);

  const setRawValue = useCallback((newValue: string | number) => {
    const numValue =
      typeof newValue === "string"
        ? newValue.replace(/\D/g, "")
        : String(newValue);
    setValue(numValue);
  }, []);

  return {
    value,
    formattedValue: formattedValue(),
    handleChange,
    setValue: setRawValue,
    numericValue: Number(value) || 0,
  };
};
