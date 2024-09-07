/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_Readers_ } from '../models/ApiResponse_Readers_';
import type { LoginVo } from '../models/LoginVo';
import type { Readers } from '../models/Readers';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReadersControllerService {
    /**
     * 登录
     * @param loginVo loginVo
     * @returns ApiResponse_Readers_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static loginUsingPost(
        loginVo: LoginVo,
    ): CancelablePromise<ApiResponse_Readers_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/readers/login',
            body: loginVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 通过联系方式查询单条数据
     * @param contact contact
     * @returns Readers OK
     * @throws ApiError
     */
    public static selectByContactInfoUsingGet(
        contact?: string,
    ): CancelablePromise<Array<Readers>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/readers/selectByContactInfo',
            query: {
                'contact': contact,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 根据读者姓名查
     * @param name name
     * @returns Readers OK
     * @throws ApiError
     */
    public static selectByNameUsingGet(
        name?: string,
    ): CancelablePromise<Array<Readers>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/readers/selectByName',
            query: {
                'name': name,
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
     * @returns Readers OK
     * @throws ApiError
     */
    public static selectOneUsingGet4(
        id?: number,
    ): CancelablePromise<Readers> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/readers/selectOne',
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
}
