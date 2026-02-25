import type { BaseQueryApi } from "@reduxjs/toolkit/query";
import React from "react";


export type TError = {
    data: {
        message: string;
        stack: string;
        success: boolean;
    };
    status: number;
};
type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
};

export type TResponse<T = unknown> = {
    data?: T;
    error?: TError;
    meta?: TMeta;
    success: boolean;
    message: string;
};

export type TResponseRedux<T = unknown> = TResponse<T> & BaseQueryApi;

export type TQueryParams = {
    name: string;
    value: boolean | React.Key;
};