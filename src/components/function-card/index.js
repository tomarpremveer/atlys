import "./styles.scss";
import DragAction from "./images/drag-action.svg";
import Input from "../../ui/input";
import Dropdown from "../../ui/dropdown";
import Dot from "../../ui/dot";
import { forwardRef } from "react";

const FunctionCard = forwardRef(function (
  {
    heading,
    equation,
    onEquationChange,
    nextFunctionDropdownList,
    nextFunction,
    functionId,
    error,
  },
  ref
) {
  console.log("rendered", equation);
  return (
    <div className="function-card-wrapper">
      <div className="function-card">
        <div className="card-header">
          <img src={DragAction} height={7} width={12} alt={"Drag"} />
          <span className="heading">{heading}</span>
        </div>
        <div className="equation-container">
          <p className="label"> Equation</p>
          <Input
            className="equation-input"
            value={equation}
            onChange={(e) => onEquationChange(e, functionId)}
          />
          {error && <p className="error-text">{error} </p>}
        </div>

        <div className="function-dropdown-container">
          <p className="label">Next Function</p>
          <Dropdown
            className="dropdown"
            disabled={true}
            options={nextFunctionDropdownList}
            defaultValue={nextFunction}
            selected={nextFunction}
          />
        </div>

        <div className="input-output-label-container">
          <div className="label-wrapper">
            <Dot ref={ref} />
            <span className="label">Input </span>
          </div>
          <div className="label-wrapper">
            <span className="label"> Output </span>
            <Dot ref={ref} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default FunctionCard;
