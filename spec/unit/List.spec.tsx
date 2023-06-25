import { render, screen } from '@testing-library/react'
import { App } from 'src/App'
import { List } from 'src/components/List'
import ue from '@testing-library/user-event'

it('отображение списка задач', () => {
  const onDelete = jest.fn()
  const onToggle = jest.fn()

  const items: Task[] = [
    {
      id: '1',
      header: 'купить хлеб',
      done: false,
    },
    {
      id: '2',
      header: 'купить молоко',
      done: false,
    },
    {
      id: '3',
      header: 'выгулять собаку',
      done: true,
    },
  ]

  const { rerender, asFragment } = render(
    <List items={items} onDelete={onDelete} onToggle={onToggle} />,
  )
  const firstRender = asFragment()

  items.pop()

  rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />)
  const secondRender = asFragment()

  expect(firstRender).toMatchDiffSnapshot(secondRender)
})

it('Список содержит не больше 10 невыполненных задач', async () => {
  const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
  })

  render(<App />)

  for (let i = 0; i < 10; i++) {
    const inputEl = screen.getByRole('textbox')
    const addBtnEl = screen.getByAltText(/Добавить/i)

    await userEvent.clear(inputEl)
    await userEvent.type(inputEl, `Задача номер ${i + 1}`)
    await userEvent.click(addBtnEl)
  }
  const list = screen.getByRole('list')
  const items = list.querySelectorAll('li')

  expect(items).toHaveLength(10)
})

