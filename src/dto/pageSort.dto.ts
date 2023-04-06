import { Rule, RuleType } from '@midwayjs/validate';
import { pageSizeEnum } from '../constant/paginate.const';
import { ApiProperty } from '@midwayjs/swagger';

export class pageSortDTO {
    // 页号
    @Rule(RuleType.number().optional().min(1).max(1000000).default(1))
    @ApiProperty({ example: 1 })
    page?: number;

    // 页大小
    @Rule(
        RuleType.number()
            .optional()
            .default(10)
            .valid(...pageSizeEnum)
    )
    @ApiProperty({ example: 10 })
    pageSize?: number;

    // TODO 排序
    @Rule(
        RuleType.string()
            .optional()
            .default('id:asc')
            .pattern(/[a-zA-Z0-9]+:(a|de)sc/)
            .max(64)
    )
    @ApiProperty({ example: 'field:asc' })
    sort?: string;
}
