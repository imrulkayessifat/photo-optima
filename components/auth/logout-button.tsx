"use client";

import { logout } from "@/actions/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
};

export const LogoutButton = ({
  children
}: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer dark:bg-[#0f0f0f]">
      {children}
    </span>
  );
};