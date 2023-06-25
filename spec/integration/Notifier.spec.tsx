import { prettyDOM, render, screen } from '@testing-library/react'
import { App } from 'src/App'
import { Notifier } from 'src/components/Notifier'
import ue from '@testing-library/user-event'
const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
})
describe('Оповещение при вополнении задачи', () => {
  it('появляется и содержит заголовок задачи', () => {
    const fn = jest.fn()
    const taskTitle = 'Любая задача'
    const { container } = render(
      <Notifier open={true} task={taskTitle} onClose={fn} />,
    )

    jest.runAllTimers()
    const wrapper = container.getElementsByClassName('notifier-wrapper')[0]
    expect(wrapper).toBeInTheDocument()
    expect(wrapper.innerHTML).toEqual(taskTitle)
  })
  it('одновременно может отображаться только одно', async () => {
    render(<App />)

    const inputEl = screen.getByRole('textbox')
    const addBtnEl = screen.getByAltText(/Добавить/i)

    await userEvent.clear(inputEl)
    await userEvent.type(inputEl, 'Новое задание 1')
    await userEvent.click(addBtnEl)

    await userEvent.clear(inputEl)
    await userEvent.type(inputEl, 'Новое задание 2')
    await userEvent.click(addBtnEl)

    const listitem1 = screen.getAllByRole('listitem')[0]
    const listitem2 = screen.getAllByRole('listitem')[1]
    const checkbox1 = listitem1.querySelector('input')
    const checkbox2 = listitem2.querySelector('input')
    if (checkbox1 && checkbox2) {
      await userEvent.click(checkbox1)
      await userEvent.click(checkbox2)
    }

    const wrapper = screen.getAllByText(/завершена/i)
    expect(wrapper).toHaveLength(1)
  })
})
