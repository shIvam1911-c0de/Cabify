import { createContext, useEffect, useState } from "react";

// user data ko store karne ke liye
export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          fullName: { firstName: "", lastName: "" },
          email: "",
        };
  });

  // Whenever user state updates, save it to localStorage
  useEffect(() => {
    if (user && user.email) {
      // Only save valid user data
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <>
      {/* UserDataContext.Provider ek method hai jiske madad se hum data ko provide kar sakte hai jaha bhi required ho */}
      <UserDataContext.Provider value={{ user, setUser }}>
        {children}
      </UserDataContext.Provider>
    </>
  );
};

export default UserContext;
