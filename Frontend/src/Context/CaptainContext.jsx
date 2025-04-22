import React, { createContext, useState, useEffect } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    // Load captain data from localStorage when the component mounts
    const [captain, setCaptain] = useState(() => {
        const storedCaptain = localStorage.getItem("captain");
        return storedCaptain ? JSON.parse(storedCaptain) : {
            fullName: { firstName: "", lastName: "" },
            email: "",
            password: "",
        };
    });

    // Update localStorage whenever captain state changes
    useEffect(() => {
        if (captain && captain.email) {
            localStorage.setItem("captain", JSON.stringify(captain));
        } else {
            localStorage.removeItem("captain"); // Clear storage if no valid data
        }
    }, [captain]);

    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;
