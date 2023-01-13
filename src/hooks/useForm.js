import { useState } from "react";
import { parseUnits } from "ethers/lib/utils";

import { ZERO } from "constants";
import format from "utils/format";
import { toFixed } from "utils/numbers";

const empty = {
  display: "",
  raw: ZERO,
};

const formatValue = (value, rounded) =>
  format(value, 2, rounded).replace(/\,/g, "");

export default function useForm(props = {}) {
  const { validate } = props;

  const [values, setValues] = useState();
  const [errors, setErrors] = useState();

  const setNumber = (name, value, type, rounded) => {
    let newValues;

    if (!value) {
      // If the value is empty set the raw value to 0 and
      // the display value to an empty string
      newValues = { ...values, [name]: { raw: ZERO, display: "" } };
    } else {
      const parsed =
        type === "display"
          ? { raw: parseUnits(toFixed(value)), display: value }
          : { raw: value, display: formatValue(value, rounded) };

      newValues = { ...values, [name]: parsed };
    }

    const validationErrors = validate && validate(newValues);
    setErrors((err) => ({ ...err, [name]: validationErrors }));
    setValues(newValues);
  };

  const setSimple = (name, value) => {
    const newValues = { ...values, [name]: value };
    const validationErrors = validate && validate(newValues);

    setErrors((err) => ({ ...err, [name]: validationErrors }));
    setValues(newValues);
  };

  const setValue = (name, display, type, rounded = true) => {
    if (type === "number") {
      setNumber(name, display, "display", rounded);
    } else {
      setSimple(name, display);
    }
  };

  const setRawValue = (name, raw, rounded = true) => {
    setNumber(name, raw, "raw", rounded);
  };

  const register = (name) => (event) => {
    setValue(name, event.target.value, event.target.type);
  };

  return {
    values,
    errors: errors,
    setValue,
    setRawValue,
    setSimple,
    register,
    empty,
    isErrored: Object.values(errors || {}).filter(Boolean).length > 0,
  };
}
