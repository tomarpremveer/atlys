const Input = ({ value, onChange, className, ...restProps }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className={className}
      {...restProps}
    />
  );
};

export default Input;
