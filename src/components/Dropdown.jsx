import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";
const Dropdown = ({ label, options, onSelect, select, className }) => {
  return (
    <DropdownMenu.Root onOpenChange={onSelect}>
      <DropdownMenu.Trigger asChild>
        <button className={`dropdown-trigger ${className || ""}`}>
          {label}{" "}
          <ChevronDown
            className={`${select ? "rotate" : ""}`}
            style={{ marginLeft: "auto" }}
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align="center"
        side="bottom"
        className="dropdown-content"
      >
        {options.map((option, index) => (
          <DropdownMenu.Item
            key={index}
            className="dropdown-item"
            // onSelect={() => onSelect(option)}
          >
            {option}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func,
  select: PropTypes.bool,
  className: PropTypes.string,
};

// ✅ Default props (optional, in case props are not passed)
Dropdown.defaultProps = {
  label: "Select",
  options: [],
  onSelect: () => {},
  select: false,
};
export default Dropdown;
