import request from '../utils/request';

export const fetchAllTypes = (page: number, pageSize: number) => {
    return request({
        url: '/api/types',
        method: 'get',
        params: { page, pageSize }
    });
};

export const addType = (type: any) => {
    return request({
        url: '/api/types/add',
        method: 'post',
        data: type
    });
}

export const deleteType = (id: string) => {
    return request({
        url: '/api/types/delete',
        method: 'post',
        params: { id }
    });
}

export const updateType = (id: string, title: any) => {
    return request({
        url: '/api/types/update',
        method: 'post',
        data: { title },
        params: { id }
    });
}
