import CryptoJS from "crypto-js";

const secretPass = `${process.env.REACT_APP_SECRET_KEY}`;

export const encryptData = (message) => {
    const data = CryptoJS.AES.encrypt(
        JSON.stringify(message),
        secretPass
    ).toString();
    return data

};


export const decryptData = (message) => {
    const bytes = CryptoJS.AES.decrypt(message, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data
};