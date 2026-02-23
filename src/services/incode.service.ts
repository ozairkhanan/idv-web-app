import { create } from "@incodetech/welcome";

const apiURL = import.meta.env.VITE_INCODE_API_URL;
const clientId = import.meta.env.VITE_INCODE_CLIENT_ID;
export const FlowID = import.meta.env.VITE_INCODE_FLOW_ID;
export const adminEmail = import.meta.env.VITE_PANEL_ADMINISTRATOR;

const incode = create({
  apiKey: clientId,
  apiURL: apiURL,

  theme: {
    // main: "",
    // mainButton: {
    //   borderRadius: "",
    //   color: "",
    //   border: "",
    // },
  },
});

export default incode;
