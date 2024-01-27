import { notification } from "antd";

export const capitalizeFirstLetter = string => {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  };
  
  export const validateEmail = e => {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (e.match(isValidEmail)) {
      return true;
    } else {
      return false;
    }
  };
  
  export const openNotificationWithIcon = (type, msg, des) => {
    notification[type]({
      message: msg,
      description: des,
    });
  };
  
  export const toInputUppercase = e => {
    e.target.value = ('' + e.target.value).toUpperCase();
  };