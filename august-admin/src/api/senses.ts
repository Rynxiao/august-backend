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
        params: { id }
    });
}

export const updateSense = (id: string, sense: any) => {
    return request({
        url: '/api/senses/update',
        method: 'post',
        data: sense,
        params: { id }
    });
}
