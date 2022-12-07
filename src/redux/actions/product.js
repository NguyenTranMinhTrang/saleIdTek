import store from '../stores';
import types from '../types';
import { getItem } from '../../localStorage';
import _ from 'lodash';

const { dispatch } = store;

export const getData = (data) => ({
    type: types.GET_PRODUCT,
    payload: { ...data },
});

export const updateProductList = (data) => ({
    type: types.EDIT_PRODUCT,
    payload: { ...data },
});

export const filter = (data) => ({
    type: types.FILTER,
    payload: { ...data },
});

export const deleteProductList = (data) => ({
    type: types.DELETE_PRODUCT,
    payload: { ...data },
});

export const filterProduct = (products, inputDetail) => {
    console.log('begin filter');
    const filterArray = _.map(products, (product) => {
        const inputObject = _.find(inputDetail, (input) => {
            if (input.idProduct === product.id && input.amount > 0) {
                return true;
            }
            return false;
        });
        if (inputObject) {
            return {
                ...product,
                price: inputObject.priceInput * product.profit,
            };
        }
        return false;
    });

    return _.compact(filterArray);
};

export const filterRefresh = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const products = store.getState().product.products;
            const inputDetail = store.getState().product.inputDetail;
            const newFilter = filterProduct(products, inputDetail);
            dispatch(filter({ filter: newFilter }));
            resolve(true);
        }, 500);
    });
};

export const getDataFromLocalStorage = async () => {
    const data = await getItem('listData');
    const filterList = filterProduct(data.products, data.inputDetail);
    dispatch(getData({ ...data, filter: filterList }));
};

export const updateProduct = (item) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const products = store.getState().product.products;
            const newProductList = _.map(products, (product) => {
                if (product.id === item.id) {
                    return {
                        ...product,
                        image: item.image,
                        name: item.name,
                        description: item.description,
                        profit: item.profit,
                    };
                }
                return product;
            });
            dispatch(updateProductList({
                products: newProductList,
            }));
            resolve({ code: 1, message: 'Success !' });
        }, 500);
    });
};

export const deleteProduct = (id) => {
    console.log(id);
    const products = store.getState().product.products;
    const listAfterDetele = _.filter(products, (product) => {
        if (product.id === id) {
            return false;
        }
        return true;
    });
    dispatch(deleteProductList({ products: listAfterDetele }));
};

