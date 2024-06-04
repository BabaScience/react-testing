import { render, screen } from '@testing-library/react'

import ProductDetail from '../../src/components/ProductDetail'
import { allProducts } from '../mocks/data'

import { server } from '../mocks/server'
import { http, HttpResponse } from 'msw'

describe('ProductDetail', () => {
    it('should render the list of products', async() => {
        const {id, name, price} = allProducts[0]
        render(<ProductDetail productId={id}/>)
        const productName = await screen.findByText(new RegExp(name, 'i'))
        const productPrice = await screen.findByText(new RegExp(price.toString(), 'i'))
        expect(productName).toBeInTheDocument()
        expect(productPrice).toBeInTheDocument()   
    })

    it('should render message if product is not found', async() => {
        server.use(http.get('/products/1', () => {
            return HttpResponse.json(null)
        }))
        render(<ProductDetail productId={1}/>)
        const message = await screen.findByText(/not found/i)
        expect(message).toBeInTheDocument()
    })

    it('should render error for invalid product id', async() => {
        render(<ProductDetail productId={0}/>)
        const message = await screen.findByText(/invalid/i)
        expect(message).toBeInTheDocument()
    })
})