import { http, HttpResponse } from 'msw';

import { allProducts } from './data';



export const handlers = [
    http.get('/categories', () => {
        return HttpResponse.json([
            { id: 1, name: 'Electronics' },
            { id: 2, name: 'Clothing' },
            { id: 3, name: 'Books' },
            { id: 4, name: 'Toys' },
        ])
    }),
    http.get('/products', () => {
        return HttpResponse.json(allProducts)
    }),
    http.get('/products/:id', ({params}) => {
        const id = parseInt(params.id as string)
        const product  = allProducts.find(p => p.id === id)
        if (!product) {
            return HttpResponse.notFound(null, { status: 404 })
        }
        return HttpResponse.json(product)
    })
];

export default handlers;