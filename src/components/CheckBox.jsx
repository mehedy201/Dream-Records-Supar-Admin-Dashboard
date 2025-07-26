import PropTypes from "prop-types";
import { Checkbox } from "radix-ui";
import { FaCheck } from "react-icons/fa";

const CheckBox = ({ label, fromPage, defaultChecked, customFun }) => {

  const handleCheckedChange = (checked) => {
    if (customFun) {
      customFun(label, checked);
    }
  };

  return (
    <form>
      <div style={{ display: "flex", alignItems: "center" }}>
        {fromPage === "SettingsPage" ? (
          <label className="checkbox-label" htmlFor="c1">
            {label}
          </label>
        ) : (
          ""
        )}
        <Checkbox.Root
          className="CheckboxRoot"
          defaultChecked={defaultChecked}
          id="c1"
          onCheckedChange={handleCheckedChange}
        >
          <Checkbox.Indicator className="CheckboxIndicator">
            <FaCheck />
          </Checkbox.Indicator>
        </Checkbox.Root>
        {fromPage === "serviceRequestPage" ? (
          <label className="checkbox-label" htmlFor="c1">
            {label}
          </label>
        ) : (
          ""
        )}
      </div>
    </form>
  );
};
CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  fromPage: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool,
};
export default CheckBox;
