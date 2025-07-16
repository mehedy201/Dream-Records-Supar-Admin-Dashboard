import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";
const Dropdown = ({ label, options, className, customFunDropDown }) => {

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={`dropdown-trigger ${className || ""}`}>
          {label}{" "}
          <ChevronDown
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
          >
            <p style={{cursor: 'pointer'}} onClick={() => customFunDropDown(option)}>{option}</p>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  handlePerPageItem: PropTypes.func,
};

// ✅ Default props (optional, in case props are not passed)
Dropdown.defaultProps = {
  label: "Select",
  options: [],
};
export default Dropdown;

