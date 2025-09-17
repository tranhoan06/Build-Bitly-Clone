import { subDomainList } from "./constant";

export const getApps = (): any => {
    const subdomain: any = getSubDomain(window.location.hostname);

    const mainApp: any = subDomainList.find((app: any) => app.main) || {}; // fallback {}
    if (subdomain === "") return mainApp.app;

    const apps: any = subDomainList.find((app: any) => subdomain === app.subdomain);
    return apps ? apps.app : mainApp.app;
}

// url.localhost
// url.urlbestshort.com
export const getSubDomain = (location: any): any => {
    const locationParts: any = location.split(".");
    const isLocalhost: any = locationParts.slice(-1)[0] === "localhost";
    const sliceTill: any = isLocalhost ? -1 : -2;
    return locationParts.slice(0, sliceTill).join("");
};
