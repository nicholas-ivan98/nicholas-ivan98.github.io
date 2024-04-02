import { AES, enc } from 'crypto-js';

const KEY_AES = "aes.1pay.network"

const Crypto = {
    encrypt: (str: string) => {
        return AES.encrypt(str, KEY_AES).toString()
    },
    decrypt: (ciphertext: string) => {
        return AES.decrypt(ciphertext, KEY_AES).toString(enc.Utf8)
    }
}

export default Crypto