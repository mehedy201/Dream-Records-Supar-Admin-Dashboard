import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CheckBox from "../../../components/CheckBox";
import { Collapsible } from "radix-ui";
import { useEffect, useState } from "react";
import axios from "axios";
function GeneralSettingsCheckBox() {
  const [settingsPaymentCollapse, setSettingsPaymentCollapse] = useState(true);


  const options = [
    { label: 'January', value: 'January'},
    { label: 'February', value: 'February'},
    { label: 'March', value: 'March'},
    { label: 'April', value: 'April'},
    { label: 'May', value: 'May'},
    { label: 'June', value: 'June'},
    { label: 'July', value: 'July'},
    { label: 'August', value: 'August'},
    { label: 'September', value: 'September'},
    { label: 'October', value: 'October'},
    { label: 'November', value: 'November'},
    { label: 'December', value: 'December'},
  ];
  const [activePaymentMonth, setActivePaymentMonth] = useState();

  useEffect(() => {
    axios.get(`http://localhost:5000/admin/api/v1/active-payment-month/66d80b32544c7126feb39661`)
      .then(res => {
        setActivePaymentMonth(res.data.data.activeMonth);
      })
  },[])

  const updatePaymentActiveMonth = (value, checked) => {
    let payload;
    if(checked){
      console.log('checked', value)
      payload = [...activePaymentMonth, value]
    }else{
      console.log('un checked', value)
      payload = activePaymentMonth.filter(month => month !== value)
    }
    const formData = {activeMonth: payload}
    axios.put(`http://localhost:5000/admin/api/v1/active-payment-month/66d80b32544c7126feb39661`, formData)
    .then(res => console.log(res.status))
  }





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
        {
          activePaymentMonth && 
          options.map(option => 
            <div key={option.value} className="settings-cehckbox-div">
            <CheckBox
              label={option.label}
              fromPage="SettingsPage"
              defaultChecked={activePaymentMonth?.includes(option.label)}
              customFun={updatePaymentActiveMonth}
            />
          </div>
          )
        }
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export default GeneralSettingsCheckBox;
