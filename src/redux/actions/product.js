import store from '../stores';
import types from '../types';
import { getItem } from '../../localStorage';

const { dispatch } = store;

export const getData = (data) => ({
    type: types.GET_PRODUCT,
    payload: { ...data },
});

export const getDataFromLocalStorage = async () => {
    const data = await getItem('listData');
    dispatch(getData(data));
};

