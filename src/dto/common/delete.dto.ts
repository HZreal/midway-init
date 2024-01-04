import { Rule, RuleType } from '@midwayjs/validate';

/**
 * @author sizhong
 * @date 2023-05-28
 */
export class deleteEntityDTO {
    @Rule(RuleType.number().required())
    id: number;
}
