const formValidation = (data, rules) => {
  const errors = {};
  let isValid = true;

  for (const [field, rule] of Object.entries(rules)) {
    if (rule.required && !data[field]) {
      errors[field] = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } is required`;
      isValid = false;
    }
  }

  return { isValid, errors };
};
export default formValidation;
