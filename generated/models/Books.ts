/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * books
 */
export type Books = {
    author?: string;
    bookId?: number;
    /**
     * 图书分类编号，外键
     */
    classificationId?: number;
    /**
     * 图书馆外键
     */
    libraryId?: number;
    publisher?: string;
    status?: any;
    title?: string;
    yearPublished?: number;
};

