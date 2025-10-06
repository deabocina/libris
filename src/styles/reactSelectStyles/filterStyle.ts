export const filterStyle = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#f9fafb",
    padding: "5px",
    border: state.isFocused ? "2px solid #10B981" : "1px solid #d1d5db",
    borderRadius: "0.5rem",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(16,185,129,0.3)" : "none",
    cursor: "pointer",
    "&:hover": {
      borderColor: "#10B981",
    },
    outline: "none",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#10B981"
      : state.isFocused
      ? "#d1fae5"
      : "white",
    color: state.isSelected ? "white" : "#065f46",
    padding: "10px 15px",
    cursor: "pointer",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#065f46",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#065f46",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#9ca3af",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "white",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  }),
};
