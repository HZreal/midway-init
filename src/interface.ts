import { ApiProperty } from '@midwayjs/swagger';

/**
 * @description User-Service parameters
 */
export class CommonResponse {
    @ApiProperty({ description: '返回码' })
    code: number;
    @ApiProperty({ description: '返回描述' })
    msg: string;
    @ApiProperty({ description: '返回数据' })
    data: any;
}
