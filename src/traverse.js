const traverseNode = ({ node, parent, visitor }) => {
  const methods = visitor[node.type];
  if (methods && methods.enter) {
    methods.enter({ node, parent });
  }

  if (node.arguments) {
    for (const childNode of node.arguments) {
      traverseNode({node: childNode, parent: node, visitor})
    }
  }

  if (methods && methods.exit) {
    methods.exit({ node, parent });
  }
};

const traverse = (node, visitor) => {
  traverseNode({node, visitor})
};

module.exports = { traverse };
