import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';
import { pageSizeEnum } from '../constant/paginate.const';

/**
 * @author sizhong
 * @date 2024-01-04
 */

/**
 * 分页排序
 */
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
    @ApiProperty({ example: 'id:asc' })
    sort?: string;
}

/**
 * 删除实体模型
 */
export class entityIdDTO {
    @Rule(RuleType.number().required())
    id: number;
}
