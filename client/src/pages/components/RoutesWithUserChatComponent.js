import { Outlet } from "react-router-dom";
import UserChatComponent from "./UserChatComponent";
import React from "react";
export default function RoutesWithUserChatComponent() {
  return (
    <>
      <UserChatComponent />
      <Outlet />
    </>
  );
}
