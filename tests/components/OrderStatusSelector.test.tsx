import { render, screen } from '@testing-library/react'

import OrderStatusSelector from '../../src/components/OrderStatusSelector'
import { Theme } from '@radix-ui/themes'
import userEvent from '@testing-library/user-event'


describe('OrderStatusSelector', () => {
  const renderComponent = () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    )
    return {
      button: screen.getByRole('combobox'),
      getOptions: async() => await screen.findAllByRole('option'),
      user,
      onChange,
    }
  }

  

  it('Should render with correct initial states', () => {
        const { button } = renderComponent()

        expect(button).toHaveTextContent(/new/i)
  })

  it('Should render correct statuses', async() => {
    const { button, user, getOptions } = renderComponent()
    
    await user.click(button)

    const options  = await getOptions()
    const labels = options.map(option => option.textContent)
    expect(labels).toEqual(['New', 'Processed', 'Fulfilled'])
  })

  it.each([
    { label: /processed/i, value: 'processed' },
    { label: /fulfilled/i, value: 'fulfilled' },
  ])('Should call onChange with $value when $label is clicked', async({label, value}) => {
    const { user, button, onChange } = renderComponent()

    await user.click(button)
    const option = await screen.findByRole('option', { name: label })
    await user.click(option)

    expect(onChange).toHaveBeenCalledWith(value)
  })

  it('Should call onChange with new value when new value is selected', async() => {
    const { user, button, onChange } = renderComponent()

    await user.click(button)
    const option = await screen.findByRole('option', { name: /processed/i })
    await user.click(option)

    expect(onChange).toHaveBeenCalledWith('processed')

    await user.click(button)
    const newOption = await screen.findByRole('option', { name: /new/i })
    await user.click(newOption)

    expect(onChange).toHaveBeenCalledWith('new')
  })

})
