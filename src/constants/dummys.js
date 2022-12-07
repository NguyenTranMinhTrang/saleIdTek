import images from './images';
import { eachDayOfInterval } from 'date-fns';
import _ from 'lodash';

const genarateData = () => {
    console.log(images.productImage);
    const products = [];
    const inputs = [];
    let j = 0;
    let id = 1;
    const inputDetail = [];

    for (var i = 1; i <= 1000; i++) {

        const price = Math.random() * 100 + 20;

        const detail = {
            id: id,
            idProduct: i,
            amount: 100,
            priceInput: Math.floor(price),
            status: 'good',
        };

        const product = {
            id: i,
            name: `Product ${i}`,
            profit: (Math.random() + 0.1).toFixed(1),
            image: images.productImage,
            description: 'bla bla bla',
            rate: Math.floor(Math.random() * 5 + 1),
        };

        j = j + 1;

        if (j === 5) {
            const input = {
                id: id,
                date: new Date(),
            };
            inputs.push(input);
            j = 0;
            id = id + 1;
        }

        products.push(product);
        inputDetail.push(detail);
    }


    const users = [
        {
            id: 1,
            email: 'john@mail.com',
            password: 'changeme',
            name: 'Jhon',
            role: 'customer',
            avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=9136',
        },
        {
            id: 2,
            email: 'maria@mail.com',
            password: '12345',
            name: 'Maria',
            role: 'customer',
            avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=4294',
        },
        {
            id: 3,
            email: 'Anna@mail.com',
            password: 'Anna123',
            name: 'Anna',
            role: 'customer',
            avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=9182',
        },
    ];

    const result = eachDayOfInterval({
        start: new Date(2022, 10, 28),
        end: new Date(2022, 11, 4),
    });

    const outputs = _.map(result, (dateSale, index) => {
        return {
            id: index + 1,
            idUser: Math.random() * 2 + 1,
            buy: [
                {
                    idProduct: Math.random() * 1000 + 1,
                    amount: Math.random() * 10 + 5,
                },
                {
                    idProduct: Math.random() * 1000 + 1,
                    amount: Math.random() * 10 + 5,
                },
            ],
            date: dateSale,
        };
    });

    return {
        products,
        inputs,
        users,
        outputs,
        inputDetail,
    };
};

export default genarateData;

