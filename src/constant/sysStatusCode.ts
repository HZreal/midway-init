/**
 * 自定义状态码
 * @author huang
 * @date 2023-06-16
 */

export const responseStatusCode = {
    OK: { code: 0, msg: 'success' },

    BadRequest: { code: 9400, msg: 'Bad Request Error' }, // 请求错误
    UnAuthorized: { code: 9401, msg: 'Unauthorized Error' }, // 未认证
    NoPermission: { code: 9402, msg: 'No Permission Error' }, // 无权限
    Forbidden: { code: 9403, msg: 'Forbidden Error' }, // 请求禁止
    NotFound: { code: 9404, msg: 'Not Found Error' }, // 无资源(路由错误)
    Method_Not_Allowed: { code: 9405, msg: 'Method Not Allowed Error' }, // 请求方法不允许
    Request_Timeout: { code: 9408, msg: 'Request Timeout Error' }, // 超时

    PayloadTooLargeError: { code: 9413, msg: 'Payload Too Large Error' }, // 如文件过大

    DbQueryError: { code: 9420, msg: 'Db Query Error' },
    DbInsertError: { code: 9421, msg: 'Db Insert Error' },
    DbDeleteError: { code: 9421, msg: 'Db Delete Error' },
    DbSQLOperateError: { code: 9422, msg: 'Db SQL Operate Error' },
    DbUnknownError: { code: 9429, msg: 'Db Unknown Error' },

    ValidParamsError: { code: 9430, msg: 'Parameter Validate Error' }, // 参数有误

    AllowedFileCountError: { code: 9440, msg: 'File allowed count error' }, // 文件数量过多
    FileNameNotSameError: { code: 9441, msg: 'File Name Not Same Error' }, // 文件名不一致
    FileNameSuffixAndFileTypeNotSameError: {
        code: 9442,
        msg: 'The Suffix of Filename Not the Same as Filetype Error',
    }, // 文件类型与文件后缀不一致
    FileExistedError: {
        code: 9443,
        msg: 'File Existed Error',
    }, // 文件已存在
    NoSuchFileError: {
        code: 9444,
        msg: 'No Such File Error',
    }, // 无此文件
    FileStatusError: { code: 9445, msg: 'File Status Error' }, // 文件状态错误

    PermissionError: { code: 9501, msg: 'Permission Error' },
    PermissionStillExistsError: { code: 9502, msg: 'Permission still exists' }, // 权限存在关系, 不能删除
    PermissionCodeRepeatError: { code: 9503, msg: 'Duplicate permission code' },

    RoleStillExistsError: { code: 9504, msg: 'Role still exists' }, // 角色存在
    RoleCodeRepeatError: { code: 9505, msg: 'Duplicate role code' }, // 角色 code 重复

    UserStillExistsError: { code: 9506, msg: 'User still exists' }, // 用户存在
    UserNameIsOccupiedError: { code: 9507, msg: 'UserName is occupied' }, // 用户名被占用
    UserNotExistsError: { code: 9508, msg: 'User Not Exists' }, // 用户不存在
    UserPasswordDifferentError: { code: 9509, msg: 'User Password Different' }, // 密码不一致
    UserPasswordNotChangeError: { code: 9510, msg: 'User Password Not Change' }, // 密码没有变化
    UsernameOrPasswordError: { code: 9511, msg: 'Username Or Password Error' }, // 用户名或密码错误

    RoleJurisdictionHasRelationshipError: {
        code: 9511,
        msg: 'Role Jurisdiction Has Relationship',
    }, // 存在关系, 不能删除

    MenuNameRepeatError: { code: 9512, msg: 'Duplicate menu name' }, // 菜单 name 重复
    MenuUrlRepeatError: { code: 9513, msg: 'Duplicate menu url' }, // 菜单 url 重复

    UserNotSuperAndNotMatchedServiceAreaError: {
        code: 9888,
        msg: 'User Not Super And Not Matched ServiceArea Error',
    }, // 非超管且未分配区域的账户标记特殊区域

    UnKnownError: { code: 9999, msg: 'Unknown Error' }, // 未知错误
};
