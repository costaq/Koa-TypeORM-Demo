import { BaseContext, Context } from "koa"

/**
 * @description 拼接返回对象
 */
export default (ctx: BaseContext, returnData: Object = {}) => {
    ctx.type = 'application/json';
    const response = Object.assign({
        success: true,
        msg: 'success',
        errorCode: 0,
        data: {}
    }, returnData);
    ctx.body = JSON.stringify(response);
}