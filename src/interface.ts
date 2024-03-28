import { ApiProperty } from '@midwayjs/swagger';
import { paginateSwaggerDesc } from './constant/paginate.const';

/**
 * CommonResponse
 */
export class CommonResponse {
    @ApiProperty({ description: '返回码' })
    code: number;
    @ApiProperty({ description: '返回描述' })
    msg: string;
    @ApiProperty({ description: '返回数据' })
    data: any;

    constructor(code: number, msg: string, data: any) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}

/**
 * 通用分页返回类型
 */
export class PageCommonResponse extends CommonResponse {
    @ApiProperty({
        description: '分页列表数据',
        type: 'object',
        properties: paginateSwaggerDesc,
    })
    data: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
        records: any[];
    };
}

// TODO //////////////////////////////////////// 以下是泛型版 ////////////////////////////////////////////////////

/**
 * BaseResponse
 */
export class BaseResponse<T> {
    /**
     * code
     */
    code: number;

    /**
     * msg
     */
    msg: string;

    /**
     * data
     */
    data: T;

    constructor(code: number, msg: string, data: any) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}

/**
 * 通用对象数组返回
 */
export class ListBaseResponse<T> extends BaseResponse<any> {
    data: T[];
}

/**
 * 分页定义
 * 其实 PageBaseResponse<T> = BaseResponse<Page<T>>
 */
export class Page<T> {
    page: number;
    size: number;
    pages: number;
    total: number;
    records: T[];
}

/**
 * 通用分页返回
 */
export class PageBaseResponse<T> extends BaseResponse<any> {
    data: {
        page: number;
        size: number;
        pages: number;
        total: number;
        records: T[];
    };
}
