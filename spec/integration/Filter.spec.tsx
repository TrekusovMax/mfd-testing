import { render, screen } from '@testing-library/react'
import { Filter } from 'src/modules/Filter'
import ue from '@testing-library/user-event'
import { JestStoreProvider } from '../utils/JestStoreProvider'

import { App } from 'src/App'

describe('Список задач ', () => {
  const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
  })
  // не содержит выполненные задачи
  // после нажатия на кнопку фильтрации
  it('с включенным фильтром', async () => {
    const { container } = render(<App />)
    //добавляем задачи
    for (let i = 0; i < 5; i++) {
      const inputEl = screen.getByRole('textbox')
      const addBtnEl = screen.getByAltText(/Добавить/i)

      await userEvent.clear(inputEl)
      await userEvent.type(inputEl, `Задача номер ${i + 1}`)
      await userEvent.click(addBtnEl)
    }
    //включаем фильтр
    const filterBtn = screen.getByAltText('Фильтр')
    await userEvent.click(filterBtn)
    //выбираем фильтр по завершённым задачам
    const filterBy = container.querySelector('#completed')
    if (filterBy) {
      await userEvent.click(filterBy)
    }
    //их там не должно быть
    const empty = container.getElementsByClassName('empty-wrapper')[0]

    expect(empty).toBeInTheDocument()
    await userEvent.click(filterBtn)
  })

  // показывает как выполненные, так и не выполненные задачи
  // после повторного нажатия на кнопку фильтрации
  it('с выключенным фильтром', async () => {
    const { container } = render(<App />)
    //добавляем задачи
    for (let i = 0; i < 5; i++) {
      const inputEl = screen.getByRole('textbox')
      const addBtnEl = screen.getByAltText(/Добавить/i)

      await userEvent.clear(inputEl)
      await userEvent.type(inputEl, `Задача номер ${i + 1}`)
      await userEvent.click(addBtnEl)
    }
    //включаем фильтр
    const filterBtn = screen.getByAltText('Фильтр')
    await userEvent.click(filterBtn)
    const checkbox = screen.getAllByRole('checkbox')
    await userEvent.click(checkbox[0])
    const deleteButton = container.querySelectorAll('.task-list button')
    //выключаем фильтр
    await userEvent.click(filterBtn)

    expect(deleteButton[0]).not.toHaveAttribute('disabled')
    expect(deleteButton[1]).toHaveAttribute('disabled')
  })

  //показывает варианты фильтрации
  it('показываются варианты фильтрации', async () => {
    const { container } = render(<Filter />, {
      wrapper: JestStoreProvider,
    })
    const filterBtn = screen.getByRole('button')!

    await userEvent.click(filterBtn)

    const filterBy = container.getElementsByClassName('radio-bar')

    expect(filterBy[0]).toBeInTheDocument()
  })
})
