/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_Users_ } from '../models/ApiResponse_Users_';
import type { LoginVo } from '../models/LoginVo';
import type { PageResult_Users_ } from '../models/PageResult_Users_';
import type { PwdVO } from '../models/PwdVO';
import type { RegisterVo } from '../models/RegisterVo';
import type { Users } from '../models/Users';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersControllerService {
    /**
     * 新增用户
     * @param users users
     * @returns number OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUsingPost(
        users: Users,
    ): CancelablePromise<number | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/add',
            body: users,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 生成验证码
     * @returns any OK
     * @throws ApiError
     */
    public static captchaUsingGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/captcha',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 删除用户
     * @param id id
     * @returns number OK
     * @throws ApiError
     */
    public static deleteUsingDelete1(
        id?: number,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/delete',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * 登录
     * @param loginVo loginVo
     * @returns ApiResponse_Users_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static loginUsingPost1(
        loginVo: LoginVo,
    ): CancelablePromise<ApiResponse_Users_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/login',
            body: loginVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 注册
     * @param registerVo registerVo
     * @returns ApiResponse_Users_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static registerUsingPost(
        registerVo: RegisterVo,
    ): CancelablePromise<ApiResponse_Users_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/register',
            body: registerVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 查询所有用户
     * @returns Users OK
     * @throws ApiError
     */
    public static selectAllUsingGet4(): CancelablePromise<Array<Users>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/selectAll',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 分页查询
     * @param page page
     * @param size size
     * @returns PageResult_Users_ OK
     * @throws ApiError
     */
    public static selectByPageUsingGet3(
        page: number,
        size: number,
    ): CancelablePromise<PageResult_Users_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/selectByPage',
            query: {
                'page': page,
                'size': size,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 根据角色查询用户
     * @param role role
     * @returns Users OK
     * @throws ApiError
     */
    public static selectByRoleUsingGet(
        role?: string,
    ): CancelablePromise<Array<Users>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/selectByRole',
            query: {
                'role': role,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 根据用户名或者邮箱或者手机号查询
     * @param keywords keywords
     * @returns Users OK
     * @throws ApiError
     */
    public static selectByUsernameOrEmailOrPhoneUsingGet(
        keywords?: string,
    ): CancelablePromise<Array<Users>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/selectByUsernameOrEmailOrPhone',
            query: {
                'keywords': keywords,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 通过主键查询单条数据
     * @param id id
     * @returns Users OK
     * @throws ApiError
     */
    public static selectOneUsingGet5(
        id?: number,
    ): CancelablePromise<Users> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/selectOne',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 更新用户
     * @param users users
     * @returns number OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUsingPut2(
        users: Users,
    ): CancelablePromise<number | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/users/update',
            body: users,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 修改密码
     * @param pwdVo pwdVO
     * @returns ApiResponse_Users_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updatePasswordUsingPost(
        pwdVo: PwdVO,
    ): CancelablePromise<ApiResponse_Users_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/updatePassword',
            body: pwdVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
