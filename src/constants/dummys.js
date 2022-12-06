import images from './images';
import { eachDayOfInterval } from 'date-fns';
import _ from 'lodash';

const genarateData = () => {
    console.log(images.productImage);
    const products = [];
    const inputs = [];

    for (var i = 1; i <= 1000; i++) {

        const price = Math.random() * 100 + 20;

        const input = {
            id: i,
            idProduct: i,
            priceInput: price,
            status: 'good',
            date: new Date(),
        };

        const product = {
            id: i,
            idInput: i,
            name: `product ${i}`,
            price: price + (Math.random() * 20),
            image: images.productImage,
            discription: 'bla bla bla',
            rate: Math.floor(Math.random() * 5 + 1),
        };

        products.push(product);
        inputs.push(input);
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
    };
};

export default genarateData;

