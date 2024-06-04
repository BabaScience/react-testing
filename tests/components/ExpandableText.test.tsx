import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ExpandableText from '../../src/components/ExpandableText'



describe('ExpandableText', () => {
    it('Should render the full text if less than 255', () => {
        const text = 'a'.repeat(254)
        render(<ExpandableText text={text} />)
        const article = screen.getByRole('article')
        expect(article).toBeInTheDocument()
        expect(article).toHaveTextContent('a'.repeat(254))
    })
    it('Should render initial value and states', () => {
        const text = 'a'.repeat(500)
        render(<ExpandableText text={text} />)
        const article = screen.getByRole('article')
        expect(article).toBeInTheDocument()
        expect(article).toHaveTextContent('a'.repeat(255) + '...')

        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent(/more/i)
    })

    it('Should render text on button click', async() => {
        const text = 'a'.repeat(500)
        render(<ExpandableText text={text} />)
        const button = screen.getByRole('button')
        const user = userEvent.setup()

        await user.click(button)
        const article = screen.getByRole('article')
        expect(article).toBeInTheDocument()
        expect(article).toHaveTextContent('a'.repeat(500))
        expect(button).toHaveTextContent(/less/i)

        await user.click(button)
        expect(article).toHaveTextContent('a'.repeat(255) + '...')
        expect(button).toHaveTextContent(/more/i)
    })
})