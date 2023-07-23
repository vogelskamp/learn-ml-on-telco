import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

function PythonHighlighter({ startLine = 1, children }) {
  return (
    <SyntaxHighlighter
      language="python"
      style={okaidia}
      showLineNumbers={true}
      startingLineNumber={startLine}
    >
      {children}
    </SyntaxHighlighter>
  );
}

export default PythonHighlighter;
