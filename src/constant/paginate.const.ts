export const pageSizeEnum = [10, 20, 30, 50, 100];

// 分页 swagger描述
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
            description: '单个item信息',
            type: 'object',
        },
    },
};
