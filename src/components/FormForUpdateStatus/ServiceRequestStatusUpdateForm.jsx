import { Check, ChevronDown } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as Select from "@radix-ui/react-select";
import { Checkbox } from "radix-ui";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import textToHTML from "../../hooks/textToHTML";

const ServiceRequestStatusUpdateForm = ({ id, closeRef }) => {
  // Service Rejections List Fetch______________________________________
  // ___________________________________________________________________
  const [serviceRejectionsList, setServiceRejectionsList] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/settings/service-rejections-list`
      )
      .then((res) => {
        if (res.status == 200) {
          setServiceRejectionsList(res.data.data);
        }
      });
  }, []);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "",
      rejectionReasons: [],
      customReason: "",
    },
  });

  const onSubmit = (data) => {
    const ansDate = new Date().toISOString();
    let payload;
    if (data.status === "Solved") {
      payload = { status: data.status, ansDate };
    }

    // If status is Rejected, we need to handle rejection reasons and custom reason
    if (data.status === "Rejected") {
      let actionRequired;
      if (data.actionRequired) {
        actionRequired = textToHTML(data.actionRequired);
      }
      if (
        data.actionRequired ||
        (data.rejectionReasons && data.rejectionReasons.length > 0)
      ) {
        payload = {
          actionRequired,
          ansDate,
          status: data?.status,
          rejectionReasons: data.rejectionReasons,
        };
      } else {
        toast.error("Please Provide at least one reason.");
        return;
      }
    }
    axios
      .patch(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/claim-release/update-status/${id}`,
        payload
      )
      .then((res) => {
        if (res.status == 200) {
          console.log("yes");
          toast.success(res.data.message);
          closeRef.current?.click(); // close modal
        }
      });

    console.log(payload);
  };

  const selectedStatus = watch("status");

  const toggleReason = (reason) => {
    const current = getValues("rejectionReasons") || [];
    const exists = current.includes(reason);
    const updated = exists
      ? current.filter((r) => r !== reason)
      : [...current, reason];

    setValue("rejectionReasons", updated, {
      shouldValidate: true,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Status Select (Dropdown) */}
        <Controller
          control={control}
          name="status"
          rules={{ required: "Status is required" }}
          render={({ field }) => (
            <Select.Root
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
              }}
            >
              <Select.Trigger className="dropdown-trigger analytics-modal-dropdown">
                <Select.Value placeholder="Select Status" />
                <Select.Icon className="select-icon">
                  <ChevronDown />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  className="dropdown-content"
                  style={{ zIndex: 9999 }}
                >
                  <Select.Viewport>
                    <Select.Item value="Solved" className="select-item">
                      <Select.ItemText>Solved</Select.ItemText>
                      <Select.ItemIndicator className="select-item-indicator">
                        <Check size={18} />
                      </Select.ItemIndicator>
                    </Select.Item>
                    <Select.Item value="Rejected" className="select-item">
                      <Select.ItemText>Rejected</Select.ItemText>
                      <Select.ItemIndicator className="select-item-indicator">
                        <Check size={18} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          )}
        />
        {errors.status && (
          <p style={{ color: "red" }}>{errors.status.message}</p>
        )}

        {/* Rejected Reason Checkboxes (Only if Rejected is selected) */}
        {selectedStatus === "Rejected" && (
          <>
            <p style={{ marginTop: "15px", fontWeight: "bold" }}>
              Reject Reasons:
            </p>
            <Controller
              name="rejectionReasons"
              control={control}
              render={({ field }) => (
                <div>
                  {serviceRejectionsList.map((option) => {
                    const isChecked = field.value?.includes(option.option);

                    return (
                      <div
                        key={option._id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                          gap: "10px",
                        }}
                      >
                        <Checkbox.Root
                          id={option._id}
                          className="CheckboxRoot"
                          checked={isChecked}
                          onCheckedChange={() => toggleReason(option.option)}
                        >
                          <Checkbox.Indicator className="CheckboxIndicator">
                            <FaCheck />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label htmlFor={option._id} className="checkbox-label">
                          {option.option}
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
            />
            {/* Custom reason */}
            <textarea
              {...register("actionRequired")}
              placeholder="Write additional reason..."
              style={{ width: "100%", marginTop: "10px", padding: "10px" }}
              onKeyDown={(e) => e.stopPropagation()}
            />
          </>
        )}

        <br />
        <br />
        {/* Submit Button */}
        <button
          type="submit"
          style={{ width: "100%", margin: "0px" }}
          className="theme-btn"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ServiceRequestStatusUpdateForm;
