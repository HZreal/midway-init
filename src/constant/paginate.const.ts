export const pageSizeEnum = [10, 20, 30, 50, 100];

export enum SortOrderEnum {
    ASC = 'ASC',
    DESC = 'DESC',
}

// Object.keys(SortOrderEnum)
// Object.values(SortOrderEnum)

export const getKeyByValueInSortOrderEnum = (value: string): string => {
    return Object.keys(SortOrderEnum).find(
        // keyof typeof SortOrderEnum 返回枚举类的键的集合类型，即 "ASC" | "DESC"，因此，key as 是断言 key 是 "ASC" | "DESC"
        key => SortOrderEnum[key as keyof typeof SortOrderEnum] === value
    );
};

// 分页 Swagger 描述
export const paginateSwaggerDesc = {
    page: {
        type: 'number',
        description: '页号',
    },
    pageSize: {
        type: 'number',
        description: '页面大小',
    },
    totalPage: {
        type: 'number',
        description: '总页数',
    },
    total: {
        type: 'number',
        description: '总数据量数',
    },
    data: {
        type: 'array',
        items: {
            description: '单个 item 信息',
            type: 'object',
        },
    },
};
