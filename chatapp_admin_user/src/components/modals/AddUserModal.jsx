import { Button } from "@mui/material";
import { useState } from "react";

import { Modal } from "antd";
import socketio from "@/app/socketio";
import { useDispatch } from "react-redux";
import { addUserInList } from "../../../lib/redux/userSlice/UserReducer";

const AddUserModal = ({ open, setOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [formdata, setFormData] = useState({
    is_admin: false,
    full_access: false,
  });
  const handleCancel = () => {
    if (isLoading) {
      setIsLoading(false);
    } else {
      setOpen(false);
    }
  };
  const handleFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleAddUser = () => {
    setIsLoading(true);
    // alert(JSON.stringify(formdata));
    // setIsLoading(false);
    fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.success) {
          dispatch(addUserInList(data.user));
        } else {
          alert(data?.message);
        }
        setIsLoading(false);
        setOpen(false);
      })
      .catch(() => {
        setIsLoading(false);
        alert("Failed to add user");
      });
  };
  return (
    <Modal
      centered
      open={open}
      onOk={() => handleAddUser()}
      onCancel={handleCancel}
      okText="Add User"
      confirmLoading={isLoading}
      okButtonProps={{
        style: {
          backgroundColor: "#23022e",
          color: "#fff",
        },
      }}
    >
      <div className="flex flex-col">
        <div className="min-w-96 flex flex-col gap-2">
          <p className="text-2xl text-center font-semibold text-[#23022e]">
            Add New User
          </p>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-[#23022e]"
            name="name"
            value={formdata?.name}
            onChange={(e) => handleFormData(e)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-[#23022e]"
            name="email"
            value={formdata?.email}
            onChange={(e) => handleFormData(e)}
          />
          <div className="flex items-center w-full">
            <div className="flex flex-1 justify-evenly items-center">
              <span className="text-md font-semibold text-[#23022e]">
                Is Admin?
              </span>
              <input
                type="checkbox"
                name="is_admin"
                value={formdata?.is_admin}
                onChange={(e) => handleFormData(e)}
                id=""
                defaultValue={false}
              />
            </div>
            <div className="flex flex-1 justify-evenly items-center">
              <span className="text-md font-semibold text-[#23022e]">
                Full Access?
              </span>
              <input
                type="checkbox"
                name="full_access"
                value={formdata?.full_access}
                onChange={(e) => handleFormData(e)}
                id=""
                defaultValue={false}
              />
            </div>
          </div>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-[#23022e]"
            name="password"
            value={formdata?.password}
            onChange={(e) => handleFormData(e)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddUserModal;
