import { getByPlaceholderText, render, screen } from '@testing-library/react'

import SearchBox from '../../src/components/SearchBox'
import userEvent from '@testing-library/user-event'



describe('SearchBox', () => {
    const renderComponent = () => {
        const onChange = vi.fn()
        const user = userEvent.setup()
        render(<SearchBox onChange={onChange} />)
        return {
            input: screen.getByPlaceholderText(/search/i),
            onChange,
            user
        }
    }

    it('Should render with correct initial states', () => {
        const { input } = renderComponent()
        expect(input).toBeInTheDocument()
        expect(input).toHaveValue('')
    })

    it('Should call onChange when enter is pressed', async () => {
        const { onChange, input, user } = renderComponent()

        const searchTerm = "SearchTerm"
        await user.type(input, searchTerm + '{enter}')

        expect(onChange).toHaveBeenCalledWith(searchTerm)
    })

    it('Should not call onChange when enter is pressed with empty input', async () => {
        const { onChange, input, user } = renderComponent()

        await user.type(input, '{enter}')

        expect(onChange).not.toHaveBeenCalled()
    })

    
})