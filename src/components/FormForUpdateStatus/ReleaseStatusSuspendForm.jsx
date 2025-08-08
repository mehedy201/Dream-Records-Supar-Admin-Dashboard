import { Check, ChevronDown } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as Select from "@radix-ui/react-select";
import { Checkbox } from "radix-ui";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import textToHTML from "../../hooks/textToHTML";
import { useSelector } from "react-redux";

const ReleaseStatusSuspendForm = ({ id, closeRef, releaseData}) => {

    const { userData } = useSelector((state) => state.userData);

    // Release Rejections List Fetch______________________________________
    // ___________________________________________________________________
    const [releaseRejectionsList, setReleaseRejectionsList] = useState([]);
    useEffect(() => {
        axios
        .get(
            `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/settings/release-rejections-list`
        )
        .then((res) => {
            if (res.status == 200) {
            setReleaseRejectionsList(res.data.data);
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
        actionRequired: "",
        actionRequiredHistory: [],
        },
    });

    const onSubmit = (data) => {

        let actionRequired;
        if(data.actionRequired){
            actionRequired = textToHTML(data.actionRequired);
        }
        if (!data.actionRequired && (!data.rejectionReasons || data.rejectionReasons.length === 0)) {
            return toast.error("Please provide at least one reason");
        }

        let actionReqHistory = releaseData?.actionReqHistory || [];
        if (data.actionRequired){
            if (releaseData?.actionReqHistory) {
                actionReqHistory = [...releaseData?.actionReqHistory, actionRequired];
            }else{
                actionReqHistory.push(data.actionRequired);
            }
        }

        let payload;
        if (data.status === "Takedown") {
            payload = {
                status: data.status,
                actionRequired,
                actionReqHistory,
                rejectionReasons: data.rejectionReasons,
                takedownAdminInfo: {
                    adminEmail: userData?.email,
                    adminUserName: userData?.userName,
                    adminId: userData?._id,
                    updatedAt: new Date().toISOString(),
                },
            };
        } else if (data.status === "Blocked") {
            payload = {
                status: data.status,
                actionRequired,
                actionReqHistory,
                rejectionReasons: data.rejectionReasons,
                blockedAdminInfo: {
                    adminEmail: userData?.email,
                    adminUserName: userData?.userName,
                    adminId: userData?._id,
                    updatedAt: new Date().toISOString(),
                },
            };  
        } else if (data.status === "Error") {
            payload = {
                status: data.status,
                actionRequired,
                actionReqHistory,
                rejectionReasons: data.rejectionReasons,
                errorAdminInfo: {
                    adminEmail: userData?.email,
                    adminUserName: userData?.userName,
                    adminId: userData?._id,
                    updatedAt: new Date().toISOString(),
                },
            };
        }

        axios.patch(`https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/release/update-release-status/${id}`, payload)
        .then((res) => {
            if (res.status == 200) {
                window.location.reload();
                closeRef.current?.click(); // close modal
            }
        });
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
                            <Select.Item value="Error" className="select-item">
                            <Select.ItemText>Error</Select.ItemText>
                            <Select.ItemIndicator className="select-item-indicator">
                                <Check size={18} />
                            </Select.ItemIndicator>
                            </Select.Item>
                            <Select.Item value="Takedown" className="select-item">
                            <Select.ItemText>Takedown</Select.ItemText>
                            <Select.ItemIndicator className="select-item-indicator">
                                <Check size={18} />
                            </Select.ItemIndicator>
                            </Select.Item>
                            <Select.Item value="Blocked" className="select-item">
                            <Select.ItemText>Blocked</Select.ItemText>
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
                <>
                    <p style={{ marginTop: "15px", fontWeight: "bold" }}>
                    Reject Reasons:
                    </p>
                    <Controller
                    name="rejectionReasons"
                    control={control}
                    // rules={{
                    //     required: "At least one reason is required",
                    //     validate: (val) => val.length > 0 || "At least one reason is required",
                    // }}
                    render={({ field }) => (
                        <div>
                        {releaseRejectionsList.map((option) => {
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

                    {/* {errors.rejectionReasons && (
                    <p style={{ color: "red" }}>{errors.rejectionReasons.message}</p>
                    )} */}

                    {/* Custom reason */}
                    <textarea
                    {...register("actionRequired", 
                        // {
                        // required: "This field is required",
                        // }
                    )}
                    placeholder="Write additional reason..."
                    style={{ width: "100%", marginTop: "10px", padding: "10px" }}
                    onKeyDown={(e) => e.stopPropagation()}
                    />
                    {/* {errors.actionRequired && (
                    <p style={{ color: "red" }}>{errors.actionRequired.message}</p>
                    )} */}
                </>

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

export default ReleaseStatusSuspendForm;