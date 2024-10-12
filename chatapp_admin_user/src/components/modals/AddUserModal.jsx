import { Button } from "@mui/material";
import { useState } from "react";

const { Modal } = require("antd");

const AddUserModal = ({ open, setOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [fullAccess, setFullAccess] = useState(true);
  const handleCancel = () => {
    if (isLoading) {
      setIsLoading(false);
    } else {
      setOpen(false);
    }
  };
  return (
    <Modal
      //   title="Add New User"
      centered
      open={open}
      onOk={() => setIsLoading(true)}
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
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-[#23022e]"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex items-center w-full">
            <div className="flex flex-1 justify-evenly items-center">
              <span className="text-md font-semibold text-[#23022e]">
                Is Admin?
              </span>
              <input
                type="checkbox"
                name="isadmin"
                value={isAdmin}
                onChange={(e) => {
                  setIsAdmin((prev) => !prev);
                  console.log(isAdmin);
                }}
                id=""
              />
            </div>
            <div className="flex flex-1 justify-evenly items-center">
              <span className="text-md font-semibold text-[#23022e]">
                Full Access?
              </span>
              <input
                type="checkbox"
                name="fullaccess"
                value={fullAccess}
                onChange={(e) => {
                  setFullAccess((prev) => !prev);
                  console.log(fullAccess);
                }}
                id=""
              />
            </div>
          </div>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-[#23022e]"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddUserModal;
