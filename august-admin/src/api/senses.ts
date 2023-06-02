import request from '../utils/request';

export const fetchAllSenses = (page: number) => {
    return request({
        url: '/api/senses',
        method: 'get',
        params: { page }
    });
};

export const addSense = (sense: any) => {
    return request({
        url: '/api/senses/add',
        method: 'post',
        data: sense
    });
}

export const deleteSense = (id: string) => {
    return request({
        url: '/api/senses/delete',
        method: 'post',
        data: { id }
    });
}

export const updateSense = (sense: any) => {
    return request({
        url: '/api/senses/update',
        method: 'post',
        data: sense
    });
}
