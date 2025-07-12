import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CheckBox from "../../../components/CheckBox";
import { Collapsible } from "radix-ui";
import { useState } from "react";
function GeneralSettingsCheckBox() {
  const [settingsPaymentCollapse, setSettingsPaymentCollapse] = useState(true);
  return (
    <Collapsible.Root
      open={settingsPaymentCollapse} // Use object state
      onOpenChange={() => setSettingsPaymentCollapse(!settingsPaymentCollapse)}
      className="generalSettingsList-container"
    >
      <div style={{ marginBottom: "20px" }}>
        <div className="d-flex">
          <h3>Payment Withdrawal Active Months</h3>
          <Collapsible.Trigger asChild>
            <div style={{ marginLeft: "auto" }}>
              {settingsPaymentCollapse ? (
                <IoIosArrowUp className="collapse-arrowIcon" />
              ) : (
                <IoIosArrowDown className="collapse-arrowIcon" />
              )}
            </div>
          </Collapsible.Trigger>
        </div>
      </div>

      <Collapsible.Content
        className="d-flex"
        style={{ flexWrap: "wrap", gap: "12px" }}
      >
        <div className="settings-cehckbox-div">
          <CheckBox
            label="January"
            fromPage="SettingsPage"
            defaultChecked={false}
          />
        </div>
        <div className="settings-cehckbox-div">
          <CheckBox
            label="February"
            fromPage="SettingsPage"
            defaultChecked={true}
          />
        </div>
        <div className="settings-cehckbox-div">
          <CheckBox
            label="March"
            fromPage="SettingsPage"
            defaultChecked={false}
          />
        </div>
        <div className="settings-cehckbox-div">
          <CheckBox
            label="April"
            fromPage="SettingsPage"
            defaultChecked={true}
          />
        </div>
        <div className="settings-cehckbox-div">
          <CheckBox
            label="May"
            fromPage="SettingsPage"
            defaultChecked={false}
          />
        </div>
        <div className="settings-cehckbox-div">
          <CheckBox
            label="June"
            fromPage="SettingsPage"
            defaultChecked={true}
          />
        </div>
        <div className="settings-cehckbox-div">
          <CheckBox
            label="July"
            fromPage="SettingsPage"
            defaultChecked={true}
          />
        </div>
        <div className="settings-cehckbox-div">
          <CheckBox
            label="August"
            fromPage="SettingsPage"
            defaultChecked={true}
          />
        </div>
        <div className="settings-cehckbox-div">
          <CheckBox
            label="September"
            fromPage="SettingsPage"
            defaultChecked={true}
          />
        </div>
        <div className="settings-cehckbox-div">
          <CheckBox
            label="October"
            fromPage="SettingsPage"
            defaultChecked={true}
          />
        </div>
        <div className="settings-cehckbox-div">
          <CheckBox
            label="November"
            fromPage="SettingsPage"
            defaultChecked={true}
          />
        </div>
        <div className="settings-cehckbox-div">
          <CheckBox
            label="December"
            fromPage="SettingsPage"
            defaultChecked={false}
          />
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export default GeneralSettingsCheckBox;
