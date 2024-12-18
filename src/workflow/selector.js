export const calculateLines = (nodes = []) => {
  if (!nodes) return [];

  const newLines = [];

  nodes.forEach((_, index, array) => {
    if (index !== array.length - 1) {
      const startNode = array[index][1];
      const endNode = array[index + 1][0];

      if (startNode && endNode) {
        const startRect = startNode.getBoundingClientRect();
        const endRect = endNode.getBoundingClientRect();

        const startX = startRect.right;
        const startY = startRect.top + startRect.height / 2;

        const endX = endRect.left;
        const endY = endRect.top + endRect.height / 2;

        const midX = (startX + endX) / 2;

        const path = `M ${startX},${startY} C ${midX},${startY} ${midX},${endY} ${endX},${endY}`;

        newLines.push(path);
      }
    }
  });

  return newLines;
};

export const CHIP_TEXTS = {
  INPUT: "Initial value of x",
  OUTPUT: "Final Output y",
};
