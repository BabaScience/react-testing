import { render, screen } from '@testing-library/react'

import UserList from '../../src/components/UserList'
import { User } from '../../src/entities'

describe('UserList', () => {
    it('should display no user if userslist is empty', () => {
        const users: User[] = []
        render(<UserList users={users}  />)
        expect(screen.getByText(/no users/i)).toBeInTheDocument()
    })
    it('should display a list of users', () => {
        const users: User[] = [
            { id: 1, name: 'John', isAdmin: true },
            { id: 2, name: 'Doe', isAdmin: false }
        ]
        render(<UserList users={users}  />)
        users.forEach(user => {
            const link = screen.getByRole('link', { name: user.name })
            expect(link).toBeInTheDocument()
            expect(link).toHaveAttribute('href', `/users/${user.id}`)
        })
    })
})