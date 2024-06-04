import { render, screen, waitFor } from '@testing-library/react'


import TagList from '../../src/components/TagList'


describe('TagList', () => { 
    it('Should render tags', async() => {
        render(<TagList />)
        await waitFor(() => {
            const tags  = screen.getAllByRole('listitem')
            expect(tags.length).toBeGreaterThan(0)
            tags.forEach((tag, index) => {
                expect(tag).toHaveTextContent('tag' + (index + 1))
            })
        })
    })
})