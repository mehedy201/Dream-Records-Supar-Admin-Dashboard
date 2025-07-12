import "./settings.css";
import * as Tabs from "@radix-ui/react-tabs";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import GeneralSettings from "./components/GeneralSettings";
import PropTypes from "prop-types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "../../components/Modal";
import { GoPencil } from "react-icons/go";
import CheckBox from "../../components/CheckBox";
import { settingsMemberCrateria } from "../../data";
function Settings({ settingsTeamMember }) {
  const [settingsCollapse, setSettingsCollapse] = useState(true);

  // Simulate fetching from table

  return (
    <div className="main-content settings-content">
      <h2 style={{ fontWeight: "500", fontSize: "24px" }}>Settings</h2>
      <Tabs.Root
        className="tabs-root"
        defaultValue="Settings"
        style={{ marginTop: 0 }}
      >
        <Tabs.List className="tabs-list">
          <Tabs.Trigger
            className="tabs-trigger distribution-tabs-trigger"
            value="Settings"
          >
            General Settings
          </Tabs.Trigger>
          <Tabs.Trigger
            className="tabs-trigger distribution-tabs-trigger"
            value="Teams"
          >
            Teams
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="tabs-content" value="Settings">
          <GeneralSettings />
        </Tabs.Content>
        <Tabs.Content className="tabs-content" value="Teams">
          <Collapsible.Root
            open={settingsCollapse} // Use object state
            onOpenChange={() => setSettingsCollapse(!settingsCollapse)}
            className="setting-teams-collapse"
          >
            <div className="">
              <div className="d-flex">
                <h5 className="setting-collapse-title">User & teams</h5>
                <Collapsible.Trigger asChild>
                  <div style={{ marginLeft: "auto" }}>
                    {settingsCollapse ? (
                      <IoIosArrowUp className="collapse-arrowIcon" />
                    ) : (
                      <IoIosArrowDown className="collapse-arrowIcon" />
                    )}
                  </div>
                </Collapsible.Trigger>
              </div>
            </div>

            <Collapsible.Content>
              <div className="add-member-div">
                <p>Total Member:{settingsTeamMember.length}</p>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button className="theme-btn"> + Add New Member</button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="dialog-overlay" />
                    <Dialog.Content className="dialog-content">
                      <Modal
                        title="Invite to your team"
                        className="settings-addMember-modal"
                      >
                        <div className="settings-form-grid">
                          <div>
                            <label className="settings-label ">
                              First Name *
                            </label>
                            <input type="text" />
                          </div>
                          <div>
                            <label className="settings-label ">
                              Last Name *
                            </label>
                            <input type="text" />
                          </div>
                        </div>
                        <label className="settings-label ">Email *</label>
                        <input type="text" />
                        {settingsMemberCrateria.map((item, index) => (
                          <div
                            className="settingsModal-checkbox-div"
                            key={index}
                          >
                            <p>{item.name}</p>
                            <CheckBox
                              label="Edit"
                              fromPage="SettingsPage"
                              defaultChecked={false}
                            />
                          </div>
                        ))}
                        <br />
                        <Dialog.Close
                          className="theme-btn"
                          style={{ width: "100%", margin: 0 }}
                        >
                          Invite
                        </Dialog.Close>
                        <br />
                      </Modal>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </div>
              {settingsTeamMember.map((item, index) => (
                <div key={index} className="settings-member">
                  <div>
                    <img
                      src={`src/assets/${item.img}`}
                      className="settings-member-img"
                      alt=""
                    />
                  </div>
                  <div className="setting-member-detail">
                    <p>{item.name}</p>
                    <small>{item.email}</small>
                  </div>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="dropdown-trigger settings-dropdown-btn">
                        <img src="src/assets/icons/vertical-threeDots.png" />
                      </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content
                      align="left"
                      side="bottom"
                      className="dropdown-content settings-dropdown-content"
                    >
                      <DropdownMenu.Item className="dropdown-item">
                        <div>
                          <GoPencil /> Edit Access
                        </div>
                      </DropdownMenu.Item>

                      <hr />
                      <DropdownMenu.Item
                        className="dropdown-item"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <div>
                              <RiDeleteBin6Line /> <span>Delete Artist</span>
                            </div>
                          </Dialog.Trigger>
                          <Dialog.Portal>
                            <Dialog.Overlay className="dialog-overlay" />
                            <Dialog.Content className="dialog-content">
                              <Modal title="Remove Team Member ?">
                                <p className="modal-description">
                                  Are you sure you want to remove access for
                                  other users? They will no longer be able to
                                  view or manage this account. This action
                                  cannot be undone.
                                </p>
                                <br />
                                <div className="artist-deleteModal-btns">
                                  <Dialog.Close>No</Dialog.Close>
                                  <Dialog.Close>Yes, Remove</Dialog.Close>
                                </div>
                              </Modal>
                            </Dialog.Content>
                          </Dialog.Portal>
                        </Dialog.Root>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </div>
              ))}
            </Collapsible.Content>
          </Collapsible.Root>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
Settings.propTypes = {
  settingsTeamMember: PropTypes.array.isRequired,
};
export default Settings;
