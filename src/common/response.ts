/**
 * @author huang
 * date 2023-09-16
 * 通用响应返回 封装
 */

import { BaseResponse, CommonResponse } from '../interface';

/**
 * 一般返回
 * @param code
 * @param msg
 * @param data
 */
export const commonResponse = (code: number, msg: string, data: any) => {
    // return {
    //     code: code,
    //     msg: msg,
    //     data: data,
    // };
    return new CommonResponse(code, msg, data);
};

/**
 * 成功 但不返回数据
 */
export const successWithoutData = () => {
    return commonResponse(0, 'success', null);
};

/**
 * 成功 仅返回描述信息
 * @param msg
 */
export const successWithMsg = (msg: string) => {
    return commonResponse(0, msg, null);
};

/**
 * 成功 且返回数据
 * @param data
 */
export const successWithData = (data: any) => {
    return commonResponse(0, 'success', data);
};

/**
 * 成功 返回数据和描述信息
 * @param msg
 * @param data
 */
export const successWithMsgAndData = (msg: string, data: any) => {
    return commonResponse(0, msg, data);
};

/**
 * 失败 返回状态码和错误描述信息
 * @param code
 * @param msg
 */
export const failed = (code: number, msg: string) => {
    return commonResponse(code, msg, null);
};

// TODO //////////////////////////////////////// 以下是泛型版 ////////////////////////////////////////////////////

export class ResponseResult {
    /**
     * 一般返回
     * @param code
     * @param msg
     * @param data
     */
    static async baseResponse<T>(code: number, msg: string, data: T) {
        return new BaseResponse<T>(code, msg, data);
    }

    /**
     * 成功 且返回数据
     * @param data
     */
    static async success<T>(data: T): Promise<BaseResponse<T>> {
        return new BaseResponse<T>(0, 'success', data);
    }

    /**
     * 失败 返回状态码和错误描述信息
     * @param error
     */
    static async failed(error: {
        code: number;
        msg: string;
    }): Promise<BaseResponse<any>> {
        return new BaseResponse(error.code, error.msg, null);
    }
}
