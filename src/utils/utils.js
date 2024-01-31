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

  export const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  export const truncateWords = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };