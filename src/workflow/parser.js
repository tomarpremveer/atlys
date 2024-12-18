export default function workflowParser(data) {
  if (!data) return [];
  const sortedConfig = data.sort((a, b) => a.executionOrder - b.executionOrder);
  return sortedConfig.map((row) => ({
    ...row,
    error: "",
  }));
}

export const getNextFunctionDropdownData = (data) => {
  if (!data) return [];
  return data.map(({ id, name }) => ({
    id: id,
    label: name,
  }));
};
