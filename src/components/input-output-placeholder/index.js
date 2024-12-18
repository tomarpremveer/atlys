import { forwardRef } from "react";
import { PLACEHOLDER_TYPES } from "../../constants";
import Dot from "../../ui/dot";
import Input from "../../ui/input";
import "./styles.scss";

const InputOutputPlaceholder = forwardRef(function (
  { type, onChange, disabled, chipText, value },
  ref
) {
  const isInputPlaceholder = type === PLACEHOLDER_TYPES.INPUT;
  return (
    <div className="input-output-wrapper">
      <div
        className={`chip ${isInputPlaceholder ? "input-chip" : "output-chip"}`}
      >
        <p className="text">{chipText} </p>
      </div>
      <div
        className={`placeholder-dot-wrapper ${
          isInputPlaceholder ? "input-wrapper" : "output-wrapper"
        }`}
      >
        {!isInputPlaceholder && (
          <div className={`output-dot-container dot-container`}>
            <Dot ref={ref} />
          </div>
        )}
        <Input
          disabled={disabled}
          className="input"
          onChange={onChange}
          value={value}
          type="number"
        />
        {isInputPlaceholder && (
          <div className={`input-dot-container dot-container`}>
            <Dot ref={ref} />
          </div>
        )}
      </div>
    </div>
  );
});
export default InputOutputPlaceholder;
