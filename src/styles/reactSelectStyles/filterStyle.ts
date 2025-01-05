export const filterStyle = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#2d2d2d",
    padding: "5px",
    border: "transparent",
    boxShadow: state.isFocused ? "0 0 0 3px #10B981" : "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#3c3c3c",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#10B981"
      : state.isFocused
      ? "#34D399"
      : "none",
    color: state.isSelected ? "white" : state.isFocused ? "white" : "#10B981",
    padding: "10px 15px",
    cursor: "pointer",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "white",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "white",
  }),
};
