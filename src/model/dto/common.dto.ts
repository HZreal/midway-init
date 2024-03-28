/**
 * Common DTO
 * @author huang
 * @date 2024-01-04
 */

import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';
import { pageSizeEnum } from '../../constant/paginate.const';

/**
 * 分页排序
 */
export class PageSortDTO {
    /**
     * 当前页号
     */
    @Rule(RuleType.number().optional().min(1).max(1000000).default(1))
    @ApiProperty({ example: 1 })
    page?: number;

    /**
     * 页大小
     */
    @Rule(
        RuleType.number()
            .optional()
            .default(10)
            .valid(...pageSizeEnum)
    )
    @ApiProperty({ example: 10 })
    pageSize?: number;

    /**
     * 排序字段
     */
    @Rule(RuleType.string().optional())
    @ApiProperty({ example: 'id' })
    sortField?: string;

    /**
     * 排序顺序（默认升序）
     */
    @Rule(RuleType.string().optional().default('ASC'))
    @ApiProperty({ example: 'ASC' })
    sortOrder?: string;

    // TODO 需删除，同时要修复 parseSortParams 函数（排序问题）
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
 * 实体 id 模型
 */
export class entityIdDTO {
    @Rule(RuleType.number().required())
    id: number;
}
