/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Library } from '../models/Library';
import type { PageResult_Library_ } from '../models/PageResult_Library_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LibraryControllerService {
    /**
     * 根据主键删除
     * @param libraryId libraryId
     * @returns number OK
     * @throws ApiError
     */
    public static deleteByPrimaryKeyUsingDelete2(
        libraryId?: number,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/library/delete',
            query: {
                'libraryId': libraryId,
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
    public static insertUsingPost3(
        record: Library,
    ): CancelablePromise<number | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/library/insert',
            body: record,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 查找所有图书馆信息
     * @returns Library OK
     * @throws ApiError
     */
    public static selectAllUsingGet3(): CancelablePromise<Array<Library>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/library/selectAll',
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
     * @returns PageResult_Library_ OK
     * @throws ApiError
     */
    public static selectByPageUsingGet2(
        page: number,
        size: number,
    ): CancelablePromise<PageResult_Library_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/library/selectByPage',
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
     * 通过图书馆id查找图书馆名
     * @param libraryId libraryId
     * @returns string OK
     * @throws ApiError
     */
    public static selectLibraryNameByLibraryIdUsingGet(
        libraryId?: number,
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/library/selectLibraryNameByLibraryId',
            query: {
                'libraryId': libraryId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * selectOne
     * @param id id
     * @returns Library OK
     * @throws ApiError
     */
    public static selectOneUsingGet3(
        id?: number,
    ): CancelablePromise<Library> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/library/selectOne',
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
    public static updateUsingPut1(
        record: Library,
    ): CancelablePromise<number | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/library/update',
            body: record,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
