import { BaseContext } from "koa";
import { ERROR_MSG } from "../core/errorMsg";
import { ErrorCode } from "../core/enum";
import HttpException from "../utils/httpException";
import response from "../utils/response";

export default async (ctx: BaseContext, next: () => void) => {
    try {
        await next();
    } catch (error) {
        if(error instanceof HttpException) {
            console.log(error.msg)
            return response(ctx, {
                success: false,
                errorCode: error.errorCode,
                msg: error.msg
            });
        }else {
            console.log(error);
            return response(ctx, {
                success: false,
                errorCode: ErrorCode.UNKNOWN,
                msg: ERROR_MSG[ErrorCode.UNKNOWN]
            });
        }
    }
}