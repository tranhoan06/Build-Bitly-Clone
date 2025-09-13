import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type ContextApiType = {
    token: any;
    setToken: React.Dispatch<any>;
};

const ContextApi = createContext<ContextApiType>({
    token: null,
    setToken: () => {},
});


export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const storedToken = localStorage.getItem("JWT_TOKEN");
    const getToken = storedToken ? JSON.parse(storedToken) : null;

    const [token, setToken] = useState(getToken);

    const sendData = {
        token,
        setToken,
    };

    return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>
};


export const useStoreContext = () => {
    const context = useContext(ContextApi);
    return context;
}