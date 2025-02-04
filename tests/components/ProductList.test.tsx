import { render, screen } from '@testing-library/react'
import { server } from '../mocks/server'
import { http, HttpResponse } from 'msw'
import ProductList from '../../src/components/ProductList'

describe('ProductList', () => {
    it('should render the list of products', async() => {
        render(<ProductList />)
        const items = await screen.findAllByRole('listitem')
        expect(items.length).toBeGreaterThan(0)
    })
    it('should render no product available if no product is found', async() => {
        server.use(http.get('/products', () => {
            return HttpResponse.json([])
        }))
        render(<ProductList />)
        
        const message = await screen.findByText(/No products/i)
        expect(message).toBeInTheDocument()
    })
})