import { render, screen } from '@testing-library/react'
import { Item } from 'src/components/Item'
import ue from '@testing-library/user-event'
import { App } from 'src/App'
const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
})
describe('Элемент списка задач', () => {
  it('название не должно быть больше 32 символов', () => {
    const onDelete = jest.fn()
    const onToggle = jest.fn()
    const item: Task = {
      id: '1',
      header: 'купить хлеб',
      done: false,
    }

    render(<Item {...item} onDelete={onDelete} onToggle={onToggle} />)

    const label = screen.getByRole('listitem')
    const text = label.querySelector('label')
    if (text) {
      expect(text.innerHTML.length).toBeLessThanOrEqual(32)
    }
  })
  it('название не должно быть пустым', () => {
    const onDelete = jest.fn()
    const onToggle = jest.fn()
    const item: Task = {
      id: '1',
      header: 'купить молоко',
      done: false,
    }

    render(<Item {...item} onDelete={onDelete} onToggle={onToggle} />)

    const label = screen.getByRole('listitem')
    const text = label.querySelector('label')
    if (text) {
      expect(text.innerHTML).not.toEqual('')
    }
  })

  it('нельзя удалять невыполненные задачи', () => {
    const onDelete = jest.fn()
    const onToggle = jest.fn()
    const item: Task = {
      id: '1',
      header: 'купить молоко',
      done: false,
    }

    render(<Item {...item} onDelete={onDelete} onToggle={onToggle} />)

    const button = screen.getByRole('button')
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).not.toBeChecked()
    expect(button).toBeDisabled()
  })

  it('После выполнения задачи кнопка должна стать активной ', async () => {
    render(<App />)

    const inputEl = screen.getByRole('textbox')
    const addBtnEl = screen.getByAltText(/Добавить/i)

    await userEvent.clear(inputEl)
    await userEvent.type(inputEl, 'Новая задача 1')
    await userEvent.click(addBtnEl)

    const deleteButton = screen.getByAltText(/удалить/i)
    const checkbox = screen.getByRole('checkbox')

    await userEvent.click(checkbox)

    expect(checkbox).toBeChecked()
    expect(deleteButton).not.toBeDisabled()
  })
  it('Зачеркнутый текст после выполения задачи', async () => {
    render(<App />)

    const inputEl = screen.getByRole('textbox')
    const addBtnEl = screen.getByAltText(/Добавить/i)

    await userEvent.clear(inputEl)
    await userEvent.type(inputEl, 'Новое задание')
    await userEvent.click(addBtnEl)

    const listitem = screen.getAllByRole('listitem')[1]
    const checkbox = listitem.querySelector('input')
    if (checkbox) {
      await userEvent.click(checkbox)
    }

    expect(listitem.querySelector('s')).toBeInTheDocument()
  })
})
