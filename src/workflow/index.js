import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import FunctionCard from "../components/function-card";
import InputOutputPlaceholder from "../components/input-output-placeholder";
import { PLACEHOLDER_TYPES } from "../constants";
import { evaluateWorkflow, validateEquation } from "../utils";
import { fetchConfig } from "./actions";
import workflowParser, { getNextFunctionDropdownData } from "./parser";
import { calculateLines, CHIP_TEXTS } from "./selector";
import "./styles.scss";

const Workflow = () => {
  const [config, setConfig] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownList, setDropdownList] = useState([]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [lines, setLines] = useState([]);
  const count = useRef(0);
  const nodesRef = useRef([]);

  useEffect(() => {
    setIsLoading(true);
    fetchConfig()
      .then(({ data }) => {
        setConfig(workflowParser(data));
        setDropdownList(getNextFunctionDropdownData(data));
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const onEquationChange = useCallback(
    (e, functionId) => {
      const { value } = e.target;

      setConfig((prevConfig) => {
        const updatedConfig = prevConfig.map((config) => {
          if (config.id == functionId) {
            return {
              ...config,
              equation: value,
              error: validateEquation(value) ? "" : "Invalid Equation",
            };
          }
          return config;
        });
        if (value && input) {
          setOutput(evaluateWorkflow(updatedConfig, input));
        } else {
          setOutput("");
        }
        return updatedConfig;
      });
    },
    [input]
  );

  const onInputChange = useCallback(
    (e) => {
      const { value } = e.target;
      if (value) {
        setOutput(evaluateWorkflow(config, value));
      } else {
        setOutput("");
      }
      setInput(value);
    },
    [config]
  );

  const displayConfig = useMemo(() => {
    if (!config) return [];
    return [...config].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [config]);

  const updateNodes = (index, node) => {
    if (nodesRef.current[index]) {
      const first = nodesRef.current[index][0];
      nodesRef.current[index] = [first, node];
    } else {
      nodesRef.current[index] = [node, node];
    }
  };

  useLayoutEffect(() => {
    setLines(calculateLines(nodesRef.current));
  }, [nodesRef, config]);

  if (isLoading) {
    return <div>Loading </div>;
  }

  return (
    <div className="row">
      <svg className="svg">
        {lines.map((path, index) => (
          <path
            key={index}
            d={path}
            stroke="#0066FF4D"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </svg>
      <div className="function-card-container">
        {displayConfig.map(
          (
            { id, name, equation, nextFunction, error, executionOrder },
            index
          ) => {
            return (
              <div key={id} className="function-card-wrapper">
                {executionOrder === 1 && (
                  <div className="input-placeholder">
                    <InputOutputPlaceholder
                      type={PLACEHOLDER_TYPES.INPUT}
                      chipText={CHIP_TEXTS.INPUT}
                      onChange={onInputChange}
                      value={input}
                      ref={(el) => updateNodes(index, el)}
                    />
                  </div>
                )}
                <FunctionCard
                  heading={name}
                  key={id}
                  equation={equation}
                  nextFunctionDropdownList={dropdownList}
                  nextFunction={nextFunction}
                  functionId={id}
                  onEquationChange={onEquationChange}
                  error={error}
                  executionOrder={executionOrder}
                  ref={(el) => updateNodes(executionOrder, el)}
                />
                {executionOrder === config.length && (
                  <div className="output-placeholder">
                    <InputOutputPlaceholder
                      type={PLACEHOLDER_TYPES.OUTPUT}
                      chipText={CHIP_TEXTS.OUTPUT}
                      disabled={true}
                      value={output}
                      ref={(el) => updateNodes(executionOrder + 1, el)}
                    />
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Workflow;
