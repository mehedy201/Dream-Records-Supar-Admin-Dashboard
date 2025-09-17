import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "radix-ui";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

const EditAccess = ({data, refresh, setRefresh, closeRef}) => {
    console.log('data', data)

    let settingsMemberCrateria = [
        {name: "User", path: "user"},
        {name: "Distribution", path: "distribution"},
        {name: "Artist", path: "artist"},
        {name: "Labels", path: "label"},
        {name: "Analytics", path: "analytics"},
        {name: "Service Request", path: "service-request"},
        {name: "Transactions", path: "transaction"},
        {name: "Profile", path: "profile"},
    ];

    const {
        register,
        handleSubmit,
        control,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: {...data},
    });

    const [loading, setLoading] = useState(false);
    const onSubmit = (data) => {
        setLoading(true);
        if (!data.access || data.access.length === 0) {
        setError("access", {
            type: "manual",
            message: "At least one access must be selected",
        });
        return;
        }
        const payload = { access: data.access };
        axios.patch(`http://localhost:5000/common/api/v1/authentication/update-sub-admin-access/${data._id}`, payload)
        .then((res) => {
            if(res.data.status === 200){
                toast.success(res.data.message)
                setRefresh(refresh + 1);
                closeRef.current?.click(); // close modal 
                setLoading(false);
            }else{
                toast.error(res.data.message)
                setLoading(false);
            }
        })
    };



    return (
        <div>          
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="settings-form-grid">
                <div>
                    <label className="settings-label ">
                    First Name *
                    </label>
                    <input
                    disabled
                    type="text"
                    {...register("first_name", {
                        required: "First name is required",
                    })}
                    />
                    {errors.firstName && (
                    <p style={{color: 'red'}}>
                        {errors.firstName.message}
                    </p>
                    )}
                </div>
                <div>
                    <label className="settings-label ">
                    Last Name *
                    </label>
                    <input
                    type="text"
                    disabled
                    {...register("last_name", {
                        required: "Last name is required",
                    })}
                    />
                    {errors.lastName && (
                    <p style={{color: 'red'}}>
                        {errors.lastName.message}
                    </p>
                    )}
                </div>
                </div>

                <label className="settings-label ">Email *</label>
                <input
                type="email"
                disabled
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                    },
                })}
                />
                {errors.email && (
                <p style={{color: 'red'}}>{errors.email.message}</p>
                )}


                {/* Access Checkbox Group */}
                <Controller
                    name="access"
                    control={control}
                    rules={{
                    validate: (value) =>
                        value.length > 0 || "At least one access must be selected",
                    }}
                    render={({ field, fieldState }) => (
                    <div className="settings-checkbox-group">
                        {settingsMemberCrateria.map((item) => {
                        const isChecked = field.value.includes(item.path);
                        return (
                            <div className="settingsModal-checkbox-div" key={item.name}>
                            <p>{item.name}</p>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span>Edit</span>
                                <Checkbox.Root
                                className="CheckboxRoot"
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                    const newValue = checked
                                    ? [...field.value, item.path]
                                    : field.value.filter((v) => v !== item.path);
                                    field.onChange(newValue);
                                    console.log(item.path, checked ? "checked" : "unchecked", newValue);

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
                        <p style={{color: 'red'}}>{fieldState.error.message}</p>
                        )}
                    </div>
                    )}
                />
                <br />
                {
                    loading ?
                    <button
                    type="submit"
                    className="theme-btn"
                    style={{ width: "100%", margin: 0 }}
                    >
                    Loading...
                    </button>:
                    <button
                    type="submit"
                    className="theme-btn"
                    style={{ width: "100%", margin: 0 }}
                    >
                    Update
                    </button>
                }
            </form>
        </div>
    );
};

export default EditAccess;