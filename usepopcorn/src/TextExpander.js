import { useState } from "react";

export default function TextExpander({
  collapsedNumWords = 10,
  expandButtonText = "Show text",
  collapseButtonText = "Collapse text",
  buttonColor = "#1f09cd",
  expanded = false,
  className = "",
  children,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

  const buttonStyle = {
    background: "none",
    border: "none",
    font: "inherit",
    cursor: "pointer",
    marginLeft: "6px",
    color: buttonColor,
  };

  return (
    <div className={className}>
      <span>{displayText}</span>

      <button
        onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
        style={buttonStyle}
      >
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>

      {/* {isExpanded && arrayChildren.length} */}
    </div>
  );
}
