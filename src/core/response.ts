import { Context } from "koa";

/**
 * @description 扩展koa context的body对象
 */
export type ExtendedContext<T> = Context & {
    request: { body?: T }
}

/**
 * @description 创建用户
 */
export type CreateUserReq = {
    userName: string;
    displayName: string;
    password: string;
    name: string;
    birthDate: Date;
}

/**
 * @description 更新用户显示名密码
 */
export type UpdateUserReq = {
    displayName: string;
    password: string;
}

/**
 * @description 更新用户基本信息
 */
export type UpdateUserInfoReq = {
    name: string;
    birthDate: Date;
}