import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

/**
 * @author huang
 * @date 2023-06-16
 */
export class UserFormDTO {
    // 用户名
    @ApiProperty()
    @Rule(RuleType.string().required().alphanum().max(16).min(5))
    username: string;

    // 密码
    @ApiProperty()
    @Rule(RuleType.string().required().max(16).min(6))
    password: string;
}

export class UserCreateDTO {
    // 用户名
    @ApiProperty()
    @Rule(RuleType.string().required().alphanum().max(16).min(5))
    username: string;

    // 密码
    @ApiProperty()
    @Rule(RuleType.string().required().max(16).min(6))
    password: string;
}

export class UserUpdateBasicInfoDTO {
    // 用户名
    @ApiProperty()
    @Rule(RuleType.string().optional())
    username: string;

    // 邮箱
    @ApiProperty()
    @Rule(
        RuleType.string()
            .optional()
            .pattern(/.*@.*\.com/)
    )
    email: string;
}

export class userUpdatePasswordDTO {
    @Rule(RuleType.number().required())
    id: number;

    // 密码
    @ApiProperty()
    @Rule(RuleType.string().required().max(16).min(6))
    password: string;

    // 新密码
    @ApiProperty()
    @Rule(RuleType.string().required().max(16).min(6))
    newPassword: string;
}
