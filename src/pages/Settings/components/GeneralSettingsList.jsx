import * as Dialog from "@radix-ui/react-dialog";
import "../Settings.css";
import PropTypes from "prop-types";
import Modal from "../../../components/Modal";
import SelectDropdown from "../../../components/SelectDropdown";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
const GeneralSettingsList = ({
  title,
  items,
  total,
  createLink,
  deleteLink,
  reFetch,
  setReFetch,
  setItems,
  forFilter,
}) => {
  const [settingsListCollapse, setSettingsListCollapse] = useState(true);
  const inputName = title.toLowerCase();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const closeRef = useRef(null);

  const onSubmit = (data) => {
    axios.post(`${createLink}`, data)
      .then(res => {
          if(res.status == 200){
            setReFetch(reFetch + 1)
            reset(); 
            closeRef.current?.click(); // close modal               
            toast.success(res.data.message)
          }
      })
      .catch(er => console.log(er))
  };

  const handleDelete = (id) => {
    axios.delete(`${deleteLink}/${id}`)
    .then(res => {
        if(res.status == 200){
            setReFetch(reFetch + 1)
            toast.success(res.data.message)
        }
    })
    .catch(er => console.log(er))
  }




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
          <div className="search-setion settings-search">
            <input
              type="text"
              placeholder="Search..."
              style={{ width: "100%" }}
              onChange={(e) => {
                if(title === 'Genre'){
                  console.log(forFilter)
                  const filtered = forFilter.filter(item =>
                    item.genre.toLowerCase().includes(e.target.value.toLowerCase())
                  );
                  setItems(filtered)
                }
                if(title === 'Language'){
                  console.log(forFilter)
                  const filtered = forFilter.filter(item =>
                    item.language.toLowerCase().includes(e.target.value.toLowerCase())
                  );
                  setItems(filtered)
                }
              }}
            />
          </div>{" "}
          <p className="item-count" style={{ marginRight: "20px" }}>
            Total &nbsp; <span>{title}</span>: {total}
          </p>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="theme-btn settings-addNew-btn">
                + Add New {title}
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="dialog-overlay" />
              <Dialog.Content className="dialog-content">
                <Modal title={`Add a New ${title}`}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      className="genre-input"
                      {...register(inputName, { required: true })}
                      placeholder={`Enter ${inputName} name`}
                    />
                    {
                      errors[inputName] && <p style={{color: 'red', marginBottom: '0px'}}>{title} Required</p>
                    }
                    <br /><br />
                    <div className="analytics-deleteModal-btns">
                      <Dialog.Close type="button">Cancel</Dialog.Close>
                      <button type="submit" className="theme-btn">Add</button>
                    </div>
                  </form>

                  {/* Hidden Dialog.Close for programmatic close */}
                  <Dialog.Close asChild>
                    <button ref={closeRef} style={{ display: 'none' }} />
                  </Dialog.Close>
                </Modal>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        <div className="generalSettingsList-item-list">
          {items.map((item, index) => (
            <div className="tag" key={index}>
              {title === 'Genre' ? item.genre : title === 'Language' ? item.language : 'll'}
              <button
                className="remove-btn"
                onClick={() => handleDelete(item._id)}
                aria-label={`Remove ${item.genre}`}
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
  // setItems: PropTypes.func.isRequired,
  // newItem: PropTypes.string.isRequired,
  // setNewItem: PropTypes.func.isRequired,
};

export default GeneralSettingsList;
