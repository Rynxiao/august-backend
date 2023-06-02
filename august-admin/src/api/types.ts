import request from '../utils/request';

export const fetchAllTypes = (page: number) => {
    return request({
        url: '/api/types',
        method: 'get',
        params: { page }
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
        data: { id }
    });
}

export const updateType = (type: any) => {
    return request({
        url: '/api/types/update',
        method: 'post',
        data: type
    });
}
