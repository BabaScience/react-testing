import { render, screen } from '@testing-library/react'


import UserAccount from '../../src/components/UserAccount'
import { User } from '../../src/entities'


describe('UserAccount', () => {
    it('Should display name if the user name is provide ', () => {
        const user: User = { id: 1, name: 'John', isAdmin: true }
        render(<UserAccount user={user} />)
        expect(screen.getByText(user.name)).toBeInTheDocument()
    })
    it('Should enable edit if user is admin', () => {
        const user: User = { id: 1, name: 'John', isAdmin: true }
        render(<UserAccount user={user} />)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent(/edit/i)
    })
    it('Should not enable edit if user is not admin', () => {
        const user: User = { id: 1, name: 'John', isAdmin: false }
        render(<UserAccount user={user} />)
        const button = screen.queryByRole('button')
        expect(button).not.toBeInTheDocument()
    })
})