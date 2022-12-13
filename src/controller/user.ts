import { Context } from "koa";
import { body, path, query, request, responsesAll, summary, tagsAll } from "koa-swagger-decorator";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User, createUserSchema, editUserSchema } from "../entity/user";
import { CreateUserReq, ExtendedContext, UpdateUserInfoReq, UpdateUserReq } from "../core/response";
import response from "../utils/response";
import HttpException from "../utils/httpException";
import { ErrorCode } from "../core/enum";
import { editUserInfoSchema, UserInfo } from "../entity/userInfo";

@responsesAll({ 200: { description: "success" }, 400: { description: "bad request" } })
@tagsAll(["User"])
export default class UserController {
    @request("get", "/user/{id}")
    @summary("根据id查询用户")
    @path({
        id: { type: "string", required: true, description: "用户id" }
    })
    public static async getUser(ctx: Context): Promise<void> {
        const id = ctx.params.id;
        const userRepository: Repository<User> = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id }, relations: ["info"] });
        response(ctx, {
            data: user
        });
    }

    @request("get", "/users")
    @summary("分页查询用户列表")
    @query({
        pageIndex: { type: 'number', description: '分页索引' },
        pageSize: { type: 'number', description: '分页数' },
        userName: { type: 'string', description: '用户名' },
        displayName: { type: 'string', description: '显示名' }
    })
    public static async getUsers(ctx: Context): Promise<void> {
        let { pageIndex, pageSize, userName, displayName } = ctx.validatedQuery;
        if (!userName) userName = '';
        if (!displayName) displayName = '';
        const userRepository: Repository<User> = AppDataSource.getRepository(User);
        const execSql = userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.info", "info")
            .where(`user.userName like '%${userName}%'`)
            .andWhere(`user.displayName like '%${displayName}%'`);
        const users = await execSql
            .orderBy("user.createdTime", "DESC")
            .skip(pageIndex * pageSize)
            .take(pageSize)
            .getMany();
        const count = await execSql.getCount();
        response(ctx, {
            data: {
                count,
                list: users
            }
        });
    }

    @request("post", "/user/add")
    @summary("创建用户")
    @body(createUserSchema)
    public static async createUser(ctx: ExtendedContext<CreateUserReq>): Promise<void> {
        const { userName, displayName, password, name, birthDate } = ctx.request.body;
        const userRepository: Repository<User> = AppDataSource.getRepository(User);
        const userToBeSaved = new User(userName, displayName, password, name, birthDate);
        await userRepository.save(userToBeSaved);
        response(ctx);
    }

    @request("delete", "/user/{id}")
    @summary("根据id删除用户")
    @path({
        id: { type: "string", required: true, description: "用户id" }
    })
    public static async deleteUser(ctx: Context): Promise<void> {
        const id = ctx.params.id;
        const userRepository: Repository<User> = AppDataSource.getRepository(User);
        const userToRemove = await userRepository.findOne({ where: { id }, relations: ["info"] });
        if (userToRemove) {
            await userRepository.remove(userToRemove);
            response(ctx);
        }
        else {
            throw new HttpException(ErrorCode.USER_NOT_FOUND);
        }
    }

    @request("put", "/user/{id}")
    @summary("根据id编辑用户")
    @path({
        id: { type: "string", required: true, description: "用户id" }
    })
    @body(editUserSchema)
    public static async editUser(ctx: ExtendedContext<UpdateUserReq>): Promise<void> {
        const id = ctx.params.id;
        const { displayName, password } = ctx.request.body;
        const userRepository: Repository<User> = AppDataSource.getRepository(User);
        const userToUpdate = await userRepository.findOne({ where: { id }, relations: ["info"] });
        if (userToUpdate) {
            userToUpdate.edit(displayName, password);
            await userRepository.save(userToUpdate);
            response(ctx);
        }
        else {
            throw new HttpException(ErrorCode.USER_NOT_FOUND);
        }
    }

    @request("put", "/userinfo/{id}")
    @summary("根据id编辑用户基础信息")
    @path({
        id: { type: "string", required: true, description: "用户id" }
    })
    @body(editUserInfoSchema)
    public static async editUserInfo(ctx: ExtendedContext<UpdateUserInfoReq>): Promise<void> {
        const id = ctx.params.id;
        const { name, birthDate } = ctx.request.body;
        const userRepository: Repository<User> = AppDataSource.getRepository(User);
        const userToUpdate = await userRepository.findOne({ where: { id }, relations: ["info"] });
        if (userToUpdate) {
            userToUpdate.editUserInfo(name, birthDate);
            await userRepository.save(userToUpdate);
            response(ctx);
        }
        else {
            throw new HttpException(ErrorCode.USER_NOT_FOUND);
        }
    }
}