import { render, screen } from '@testing-library/react'


import Greet from '../../src/components/Greet'



describe('main', () => {
    it('should render hello with the name when name is provided', () => {
        const name = 'John'
        render(<Greet name={name} />)
        const heading = screen.getByRole('heading')
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent(`Hello ${name}`)
    })
    it('should render login button when name is not provided', () => {
        render(<Greet />)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent(/login/i)
    })
})