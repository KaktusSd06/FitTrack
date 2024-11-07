import React, { createContext, useContext, ReactNode } from "react";

interface RoleContextProps {
  role: string;
}

const RoleContext = createContext<RoleContextProps | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context.role;
};

interface RoleProviderProps {
  role: string;
  children: ReactNode;
}

export const RoleProvider = ({ role, children }: RoleProviderProps) => {
  return (
    <RoleContext.Provider value={{ role }}>
      {children}
    </RoleContext.Provider>
  );
};
