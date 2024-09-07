/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Books } from '../models/Books';
import type { PageResult_Books_ } from '../models/PageResult_Books_';
import type { StatusVo } from '../models/StatusVo';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BooksControllerService {
    /**
     * 删除书籍数据
     * @param bookId bookId
     * @returns number OK
     * @throws ApiError
     */
    public static deleteByPrimaryKeyUsingDelete(
        bookId?: number,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/books/delete',
            query: {
                'bookId': bookId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * 添加书籍数据
     * @param record record
     * @returns number OK
     * @returns any Created
     * @throws ApiError
     */
    public static insertUsingPost1(
        record: Books,
    ): CancelablePromise<number | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/books/insert',
            body: record,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 查询书籍数据
     * @returns Books OK
     * @throws ApiError
     */
    public static selectAllUsingGet1(): CancelablePromise<Array<Books>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/books/selectAll',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 通过出版社查询书籍
     * @param publisher publisher
     * @returns Books OK
     * @throws ApiError
     */
    public static selectAllByPublisherUsingGet(
        publisher?: string,
    ): CancelablePromise<Array<Books>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/books/selectAllByPublisher',
            query: {
                'publisher': publisher,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 通过出版年份查询书籍
     * @param yearPublished yearPublished
     * @returns Books OK
     * @throws ApiError
     */
    public static selectAllByYearPublishedUsingGet(
        yearPublished?: any,
    ): CancelablePromise<Array<Books>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/books/selectAllByYearPublished',
            query: {
                'yearPublished': yearPublished,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 通过书名或者作者查询书籍
     * @param keywords keywords
     * @returns Books OK
     * @throws ApiError
     */
    public static selectByAuthorOrTitleUsingGet(
        keywords?: string,
    ): CancelablePromise<Array<Books>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/books/selectByAuthorOrTitle',
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
     * @returns PageResult_Books_ OK
     * @throws ApiError
     */
    public static selectByPageUsingGet1(
        page: number,
        size: number,
    ): CancelablePromise<PageResult_Books_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/books/selectByPage',
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
     * 根据状态查询书籍
     * @param status status
     * @returns Books OK
     * @throws ApiError
     */
    public static selectByStatusUsingGet(
        status?: any,
    ): CancelablePromise<Array<Books>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/books/selectByStatus',
            query: {
                'status': status,
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
     * @returns Books OK
     * @throws ApiError
     */
    public static selectOneUsingGet1(
        id?: number,
    ): CancelablePromise<Books> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/books/selectOne',
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
     * 更新书籍数据
     * @param books books
     * @returns number OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateByPrimaryKeyUsingPut(
        books: Books,
    ): CancelablePromise<number | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/books/update',
            body: books,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 根据主键更新书籍状态
     * @param statusVo statusVo
     * @returns number OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateStatusByBookIdUsingPut(
        statusVo: StatusVo,
    ): CancelablePromise<number | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/books/updateStatusByBookId',
            body: statusVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
