// import * as Select from "@radix-ui/react-select";
// import { ChevronDown, Check } from "lucide-react";
// import PropTypes from "prop-types";

// const SelectDropdown = ({
//   // selected,
//   // setSelected,
//   options,
//   placeholder,
//   className,
// }) => {
//   return (
//     <Select.Root>
//       <Select.Trigger className={`dropdown-trigger ${className || ""}`}>
//         <Select.Value placeholder={placeholder || "Select an option"} />
//         <Select.Icon className="select-icon">
//           <ChevronDown />
//         </Select.Icon>
//       </Select.Trigger>

//       <Select.Portal>
//         <Select.Content
//           className="dropdown-content"
//           style={{ padding: 0, overflowY: "auto", zIndex: "123" }}
//         >
//           <Select.Viewport>
//             {options.map((option, index) => (
//               <Select.Item key={index} value={option} className="select-item">
//                 <Select.ItemText>{option}</Select.ItemText>
//                 <Select.ItemIndicator className="select-item-indicator">
//                   <Check size={18} />
//                 </Select.ItemIndicator>
//               </Select.Item>
//             ))}
//           </Select.Viewport>
//         </Select.Content>
//       </Select.Portal>
//     </Select.Root>
//   );
// };

// SelectDropdown.propTypes = {
//   // selected: PropTypes.string.isRequired,
//   // setSelected: PropTypes.func.isRequired,
//   options: PropTypes.arrayOf(PropTypes.string).isRequired,
//   placeholder: PropTypes.string,
//   className: PropTypes.string,
// };

// export default SelectDropdown;

import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import PropTypes from "prop-types";

const SelectDropdown = ({
  filterByYearAndStatus,
  options,
  placeholder,
  className,
}) => {


  return (
    <Select.Root onValueChange={e => filterByYearAndStatus(e)}>
      <Select.Trigger className={`dropdown-trigger ${className || ""}`}>
        <Select.Value placeholder={placeholder || "Select an option"} />
        <Select.Icon className="select-icon">
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="dropdown-content"
          style={{ padding: 0, overflowY: "auto" }}
        >
          <Select.Viewport>
            {options?.map((option, index) => (
              <Select.Item key={index} value={option} className="select-item">
                <Select.ItemText>{option}</Select.ItemText>
                <Select.ItemIndicator className="select-item-indicator">
                  <Check size={18} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

SelectDropdown.propTypes = {
  // selected: PropTypes.string.isRequired,
  // setSelected: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  filterByYear: PropTypes.func
};

export default SelectDropdown;

