/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Borrowrecords } from '../models/Borrowrecords';
import type { BorrowrecordsVo } from '../models/BorrowrecordsVo';
import type { PageResult_Borrowrecords_ } from '../models/PageResult_Borrowrecords_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BorrowrecordsControllerService {
    /**
     * 删除数据
     * @param id id
     * @returns number OK
     * @throws ApiError
     */
    public static deleteByPrimaryKeyUsingDelete1(
        id?: number,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/borrowrecords/delete',
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
     * @param borrowrecordsVo borrowrecordsVo
     * @returns number OK
     * @returns any Created
     * @throws ApiError
     */
    public static insertUsingPost2(
        borrowrecordsVo: BorrowrecordsVo,
    ): CancelablePromise<number | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/borrowrecords/insert',
            body: borrowrecordsVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 查询所有数据
     * @returns Borrowrecords OK
     * @throws ApiError
     */
    public static selectAllUsingGet2(): CancelablePromise<Array<Borrowrecords>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/borrowrecords/selectAll',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 根据归还日期范围查询
     * @param endDate endDate
     * @param startDate startDate
     * @returns Borrowrecords OK
     * @throws ApiError
     */
    public static selectAllByReturnDateBetweenUsingGet(
        endDate?: string,
        startDate?: string,
    ): CancelablePromise<Array<Borrowrecords>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/borrowrecords/selectAllByReturnDateBetween',
            query: {
                'endDate': endDate,
                'startDate': startDate,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 根据用户ID获取所有数据
     * @param userId userId
     * @returns Borrowrecords OK
     * @throws ApiError
     */
    public static selectAllByUserIdUsingGet(
        userId?: number,
    ): CancelablePromise<Array<Borrowrecords>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/borrowrecords/selectAllByUserId',
            query: {
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 根据图书id查询借阅记录
     * @param bookId bookId
     * @returns Borrowrecords OK
     * @throws ApiError
     */
    public static selectByBookIdUsingGet(
        bookId?: number,
    ): CancelablePromise<Array<Borrowrecords>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/borrowrecords/selectByBookId',
            query: {
                'bookId': bookId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 根据借阅日期范围查询
     * @param endDate endDate
     * @param startDate startDate
     * @returns Borrowrecords OK
     * @throws ApiError
     */
    public static selectByBorrowDateBetweenUsingGet(
        endDate?: string,
        startDate?: string,
    ): CancelablePromise<Array<Borrowrecords>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/borrowrecords/selectByBorrowDateRange',
            query: {
                'endDate': endDate,
                'startDate': startDate,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 根据用户id查询借阅记录
     * @param userId userId
     * @returns Borrowrecords OK
     * @throws ApiError
     */
    public static selectByReaderIdUsingGet(
        userId?: number,
    ): CancelablePromise<Array<Borrowrecords>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/borrowrecords/selectByReaderId',
            query: {
                'userId': userId,
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
     * @returns Borrowrecords OK
     * @throws ApiError
     */
    public static selectOneUsingGet2(
        id?: number,
    ): CancelablePromise<Borrowrecords> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/borrowrecords/selectOne',
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
     * 根据用户ID分页查询借阅记录
     * @param page page
     * @param size size
     * @param userId userId
     * @returns PageResult_Borrowrecords_ OK
     * @throws ApiError
     */
    public static selectPageByUserIdUsingGet(
        page: number,
        size: number,
        userId: number,
    ): CancelablePromise<PageResult_Borrowrecords_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/borrowrecords/selectPageByUserId',
            query: {
                'page': page,
                'size': size,
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 更新数据
     * @param record record
     * @returns number OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateByPrimaryKeyUsingPut1(
        record: Borrowrecords,
    ): CancelablePromise<number | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/borrowrecords/update',
            body: record,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
