import { ERROR_MSG } from "../core/errorMsg";
import { ErrorCode } from "../core/enum";

class HttpException extends Error {
    msg: string;
    errorCode: ErrorCode;

    constructor(errorCode: ErrorCode) {
        super();
        this.msg = ERROR_MSG[errorCode];
        this.errorCode = errorCode;
    }
}

export default HttpException;