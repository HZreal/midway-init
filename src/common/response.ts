/*
响应通用返回函数
 */

export const commonResponse = (code: number, msg: string, data: any) => {
    return {
        code: code,
        msg: msg,
        data: data,
    };
};

// 成功但不返回数据
export const successWithoutData = () => {
    return commonResponse(0, 'success', null);
};

// 成功且返回描述
export const successWithMsg = (msg: string) => {
    return commonResponse(0, msg, null);
};

// 成功且返回数据
export const successWithData = (data: any) => {
    return commonResponse(0, 'success', data);
};

// 成功且返回描述和数据
export const successWithMsgAndData = (msg: string, data: any) => {
    return commonResponse(0, msg, data);
};

// 失败不返回数据
export const failed = (code: number, msg: string) => {
    return commonResponse(code, msg, null);
};
