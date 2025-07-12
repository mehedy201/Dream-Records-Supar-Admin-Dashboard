import * as Dialog from "@radix-ui/react-dialog";
import "../Settings.css";
import PropTypes from "prop-types";
import Modal from "../../../components/Modal";
import SelectDropdown from "../../../components/SelectDropdown";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const GeneralSettingsList = ({
  title,
  items,
  setItems,
  newItem,
  setNewItem,
}) => {
  const [settingsListCollapse, setSettingsListCollapse] = useState(true);
  const addItem = () => {
    const trimmed = newItem.trim();
    if (
      trimmed &&
      !items.some((i) => i.name.toLowerCase() === trimmed.toLowerCase())
    ) {
      const newEntry = {
        id: crypto.randomUUID(),
        name: trimmed,
      };
      setItems([...items, newEntry]);
      setNewItem("");
    }
  };

  const removeItem = (id) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
  };

  return (
    <Collapsible.Root
      open={settingsListCollapse} // Use object state
      onOpenChange={() => setSettingsListCollapse(!settingsListCollapse)}
      className="generalSettingsList-container"
    >
      <div>
        <div className="d-flex">
          <h3>{title}</h3>
          <Collapsible.Trigger asChild>
            <div style={{ marginLeft: "auto" }}>
              {settingsListCollapse ? (
                <IoIosArrowUp className="collapse-arrowIcon" />
              ) : (
                <IoIosArrowDown className="collapse-arrowIcon" />
              )}
            </div>
          </Collapsible.Trigger>
        </div>
      </div>

      <Collapsible.Content className="generalSettingsList-collapse-content">
        <div className="generalSettingsList-header">
          {title === "Sub-Genre" ? (
            <SelectDropdown
              options={["Option 1", "Option 2", "Option 3"]}
              placeholder="Select Genre"
              className="settings-dropdown"
            />
          ) : title === "Language" ||
            title === "Release Rejections List" ||
            title === "Service Rejections List" ||
            title === "Label Rejections List" ? (
            <>
              <div className="search-setion settings-search">
                <input
                  type="text"
                  placeholder="Search..."
                  style={{ width: "100%" }}
                />
              </div>{" "}
              <p className="item-count" style={{ marginRight: "20px" }}>
                Total &nbsp; <span>{title}</span>: {items.length}
              </p>
            </>
          ) : (
            <p className="item-count">
              Total {title}: {items.length}
            </p>
          )}

          <Dialog.Root>
            <Dialog.Trigger asChild>
              {title === "Release Rejections List" ||
              title === "Service Rejections List" ||
              title === "Label Rejections List" ? (
                <button className="theme-btn settings-addNew-btn">
                  + Add New <span> {title}</span>
                </button>
              ) : (
                <button className="theme-btn settings-addNew-btn">
                  + Add New {title}
                </button>
              )}
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="dialog-overlay" />
              <Dialog.Content className="dialog-content">
                <Modal title="Add a New Genre">
                  <input
                    className="genre-input"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder={`Enter ${title.toLowerCase()} name`}
                  />
                  <br />
                  <br />
                  <div className="analytics-deleteModal-btns">
                    <Dialog.Close>Cancel</Dialog.Close>
                    <Dialog.Close onClick={addItem}>Add</Dialog.Close>
                  </div>
                </Modal>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        <div className="generalSettingsList-item-list">
          {items.map((item) => (
            <div className="tag" key={item.id}>
              {item.name}
              <button
                className="remove-btn"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
GeneralSettingsList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  setItems: PropTypes.func.isRequired,
  newItem: PropTypes.string.isRequired,
  setNewItem: PropTypes.func.isRequired,
};

export default GeneralSettingsList;
