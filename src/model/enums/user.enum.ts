/**
 * User Enum
 * @author huang
 * @date 2024-03-28
 */

export enum UserGenderEnum {
    Male = 1,
    Female = 2,
    Other = 3,
}

export enum UserRoleEnum {
    USER = 'user',
    ADMIN = 'admin',
    BAN = 'ban',
}

export const UserGenderEnum2 = {
    Male: { value: 'M', text: 'Male' },
    Female: { value: 'F', text: 'Female' },
    Other: { value: 'O', text: 'Other' },
};
