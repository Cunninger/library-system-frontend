/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bookclassification } from '../models/Bookclassification';
import type { PageResult_Bookclassification_ } from '../models/PageResult_Bookclassification_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookclassificationControllerService {
    /**
     * 删除数据
     * @param id id
     * @returns number OK
     * @throws ApiError
     */
    public static deleteUsingDelete(
        id?: number,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/bookclassification/delete',
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
     * 添加数据
     * @param record record
     * @returns number OK
     * @returns any Created
     * @throws ApiError
     */
    public static insertUsingPost(
        record: Bookclassification,
    ): CancelablePromise<number | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bookclassification/insert',
            body: record,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 查询所有数据
     * @returns Bookclassification OK
     * @throws ApiError
     */
    public static selectAllUsingGet(): CancelablePromise<Array<Bookclassification>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bookclassification/selectAll',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 根据分类描述或者分类名查询
     * @param keywords keywords
     * @returns Bookclassification OK
     * @throws ApiError
     */
    public static selectByClassDescriptionOrClassNameUsingGet(
        keywords?: string,
    ): CancelablePromise<Array<Bookclassification>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bookclassification/selectByClassDescriptionOrClassName',
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
     * 分页查询
     * @param page page
     * @param size size
     * @returns PageResult_Bookclassification_ OK
     * @throws ApiError
     */
    public static selectByPageUsingGet(
        page: number,
        size: number,
    ): CancelablePromise<PageResult_Bookclassification_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bookclassification/selectByPage',
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
     * 通过主键查询单条数据
     * @param id id
     * @returns Bookclassification OK
     * @throws ApiError
     */
    public static selectOneUsingGet(
        id?: number,
    ): CancelablePromise<Bookclassification> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bookclassification/selectOne',
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
     * 根据主键更新数据
     * @param record record
     * @returns number OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUsingPut(
        record: Bookclassification,
    ): CancelablePromise<number | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/bookclassification/update',
            body: record,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
