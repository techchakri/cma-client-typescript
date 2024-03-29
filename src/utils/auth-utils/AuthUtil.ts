import axios from "axios";
import { TokenUtil } from "../token-utils/TokenUtil";

export class AuthUtil {
    public static isSetTokenToHeader () {
        const token = TokenUtil.getToken();
        const isLoggedIn = TokenUtil.isLoggedIn();
        if (token) {
            axios.defaults.headers['x-auth-token'] = token;
            return true;
        }
        else {
            delete axios.defaults.headers['x-auth-token'];
            return false;
        }
    }


}