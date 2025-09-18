import "./settings.css";
import * as Tabs from "@radix-ui/react-tabs";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import GeneralSettings from "./components/GeneralSettings";
import PropTypes from "prop-types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "../../components/Modal";
import { GoPencil } from "react-icons/go";
import { useForm, Controller, set } from "react-hook-form";
import { Checkbox } from "radix-ui";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import demoImg from "../../assets/artists/artist4.png";
import threeDotImg from "../../assets/icons/vertical-threeDots.png";
import toast from "react-hot-toast";
import EditAccess from "./components/EditAccess";

function Settings() {
  const closeRef = useRef(null);

  let settingsMemberCrateria = [
    { name: "User", path: "user" },
    { name: "Distribution", path: "distribution" },
    { name: "Artist", path: "artist" },
    { name: "Labels", path: "label" },
    { name: "Analytics", path: "analytics" },
    { name: "Service Request", path: "service-request" },
    { name: "Transactions", path: "transaction" },
    { name: "Profile", path: "profile" },
  ];
  const [settingsCollapse, setSettingsCollapse] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      access: [],
    },
  });

  const [refresh, setRefresh] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");
  const onSubmit = (data) => {
    setLoading(true);
    if (!data.access || data.access.length === 0) {
      setError("access", {
        type: "manual",
        message: "At least one access must be selected",
      });
      return;
    }

    const roll = "sub-admin";
    const openingDateISO = new Date().toISOString();
    const payload = { ...data, roll, openingDateISO };
    axios
      .post(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/authentication/create-sub-admin`,
        payload
      )
      .then((res) => {
        console.log("before", res);
        if (res.data.status === 200) {
          setLoading(false);
          setRefresh(refresh + 1);
          setErrorMassage("");
          toast.success("Invitation sent successfully");
          if (closeRef.current) {
            closeRef.current.click();
          }
        } else {
          setErrorMassage(res.data.message);
        }
      })
      .catch((error) => {
        toast.error("Error submitting form:", error);
        setLoading(false);
      });
  };

  const [subAdminList, setSubAdminList] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0);
  useEffect(() => {
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/authentication/sub-admin-list`
      )
      .then((res) => {
        setSubAdminList(res.data.data);
        setFilteredCount(res.data.filteredCount);
      });
  }, [refresh]);

  const deleteSubAdmin = (data) => {
    axios
      .delete(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/users/delete/${data._id}?uid=${data?.uid}`
      )
      .then((res) => {
        if (res.data.status === 200) {
          setRefresh(refresh + 1);
          toast.success('Deleted successfully');
        } else {
          toast.error(res.data.message);
        }
      });
  };

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

        {/* General Settings */}
        <Tabs.Content className="tabs-content" value="Settings">
          <GeneralSettings />
        </Tabs.Content>

        {/* Teams Section */}
        <Tabs.Content className="tabs-content" value="Teams">
          <Collapsible.Root
            open={settingsCollapse}
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
                <p>Total Member: {filteredCount}</p>

                {/* Add Member Modal */}
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="settings-form-grid">
                            <div>
                              <label className="settings-label ">
                                First Name *
                              </label>
                              <input
                                type="text"
                                {...register("first_name", {
                                  required: "First name is required",
                                })}
                              />
                              {errors.first_name && (
                                <p style={{ color: "red" }}>
                                  {errors.first_name.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="settings-label ">
                                Last Name *
                              </label>
                              <input
                                type="text"
                                {...register("last_name", {
                                  required: "Last name is required",
                                })}
                              />
                              {errors.last_name && (
                                <p style={{ color: "red" }}>
                                  {errors.last_name.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <label className="settings-label ">Email *</label>
                          <input
                            type="email"
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email address",
                              },
                            })}
                          />
                          {errors.email && (
                            <p style={{ color: "red" }}>
                              {errors.email.message}
                            </p>
                          )}

                          {/* Access Checkbox Group */}
                          <Controller
                            name="access"
                            control={control}
                            rules={{
                              validate: (value) =>
                                value.length > 0 ||
                                "At least one access must be selected",
                            }}
                            render={({ field, fieldState }) => (
                              <div className="settings-checkbox-group">
                                {settingsMemberCrateria.map((item) => {
                                  const isChecked = field.value.includes(
                                    item.path
                                  );
                                  return (
                                    <div
                                      className="settingsModal-checkbox-div"
                                      key={item.name}
                                    >
                                      <p>{item.name}</p>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "10px",
                                        }}
                                      >
                                        <span>Edit</span>
                                        <Checkbox.Root
                                          className="CheckboxRoot"
                                          checked={isChecked}
                                          onCheckedChange={(checked) => {
                                            const newValue = checked
                                              ? [...field.value, item.path]
                                              : field.value.filter(
                                                  (v) => v !== item.path
                                                );
                                            field.onChange(newValue);
                                            console.log(
                                              item.path,
                                              checked ? "checked" : "unchecked",
                                              newValue
                                            );

                                            if (newValue.length > 0) {
                                              clearErrors("access");
                                            }
                                          }}
                                        >
                                          <Checkbox.Indicator className="CheckboxIndicator">
                                            <FaCheck />
                                          </Checkbox.Indicator>
                                        </Checkbox.Root>
                                      </div>
                                    </div>
                                  );
                                })}
                                {fieldState.error && (
                                  <p style={{ color: "red" }}>
                                    {fieldState.error.message}
                                  </p>
                                )}
                              </div>
                            )}
                          />

                          {errorMassage && (
                            <p style={{ color: "red" }}>{errorMassage}</p>
                          )}
                          <br />
                          {loading ? (
                            <button
                              type="submit"
                              className="theme-btn"
                              style={{ width: "100%", margin: 0 }}
                            >
                              Loading...
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="theme-btn"
                              style={{ width: "100%", margin: 0 }}
                            >
                              Invite
                            </button>
                          )}
                        </form>

                        {/* Hidden Dialog.Close for programmatic close */}
                        <Dialog.Close asChild>
                          <button
                            ref={closeRef}
                            style={{ display: "none" }}
                          />
                        </Dialog.Close>
                      </Modal>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </div>

              {/* Team Members List */}
              {subAdminList.map((item, index) => (
                <div key={index} className="settings-member">
                  <div>
                    <img
                      src={item?.imgUrl || demoImg}
                      className="settings-member-img"
                      alt=""
                    />
                  </div>
                  <div className="setting-member-detail">
                    <p>
                      {item.first_name} {item.last_name}
                    </p>
                    <small>{item.email}</small>
                  </div>

                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="dropdown-trigger settings-dropdown-btn">
                        <img src={threeDotImg} />
                      </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content
                      align="left"
                      side="bottom"
                      className="dropdown-content settings-dropdown-content"
                    >
                      <DropdownMenu.Item
                        className="dropdown-item"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <div>
                              <GoPencil /> Edit Access
                            </div>
                          </Dialog.Trigger>
                          <Dialog.Portal>
                            <Dialog.Overlay className="dialog-overlay" />
                            <Dialog.Content className="dialog-content">
                              <Modal title="Edit Member Access?">
                                <EditAccess
                                  data={item}
                                  refresh={refresh}
                                  setRefresh={setRefresh}
                                  closeRef={closeRef}
                                />
                                {/* Hidden Dialog.Close for programmatic close */}
                                <Dialog.Close asChild>
                                  <button
                                    ref={closeRef}
                                    style={{ display: "none" }}
                                  />
                                </Dialog.Close>
                              </Modal>
                            </Dialog.Content>
                          </Dialog.Portal>
                        </Dialog.Root>
                      </DropdownMenu.Item>

                      <hr />
                      <DropdownMenu.Item
                        className="dropdown-item"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <div>
                              <RiDeleteBin6Line /> <span>Delete Admin</span>
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
                                  <Dialog.Close
                                    onClick={() => deleteSubAdmin(item)}
                                  >
                                    Yes, Remove
                                  </Dialog.Close>
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
