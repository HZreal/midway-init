import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

/**
 * @author sizhong
 * @date 2023-06-16
 */
export class userFormDTO {
    // 用户名
    @ApiProperty()
    @Rule(RuleType.string().required().alphanum().max(16).min(5))
    username: string;

    // 密码
    @ApiProperty()
    @Rule(RuleType.string().required().max(16).min(6))
    password: string;
}

// todo
export class userCreateDTO {
    // 用户名
    @ApiProperty()
    @Rule(RuleType.string().required().alphanum().max(16).min(5))
    username: string;

    // 密码
    @ApiProperty()
    @Rule(RuleType.string().required().max(16).min(6))
    password: string;
}

// todo
export class userUpdateDTO {
    // 用户名
    @ApiProperty()
    @Rule(RuleType.string().required().alphanum().max(16).min(5))
    username: string;

    // 密码
    @ApiProperty()
    @Rule(RuleType.string().required().max(16).min(6))
    password: string;
}
