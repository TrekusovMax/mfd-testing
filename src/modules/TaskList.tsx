import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Empty } from 'src/components/Empty'
import { List } from 'src/components/List'
import {
  deleteTask,
  filterStatus,
  getFilterBy,
  tasksSelector,
  toggleTask,
} from 'src/store/taskSlice'
import { completedSelector, uncompletedSelector } from 'src/store/taskSlice'

export const TaskList = () => {
  const allTasks = useSelector(tasksSelector)
  const uncompletedTasks = useSelector(uncompletedSelector)
  const completedTasks = useSelector(completedSelector)
  const filter = useSelector(filterStatus)
  const filterBy = useSelector(getFilterBy)

  const dispatch = useDispatch()

  const [items, setItems] = useState<Task[]>(allTasks)

  const handleDelete = (id: Task['id']) => {
    dispatch(deleteTask(id))
  }

  const handleToggle = (id: Task['id']) => {
    dispatch(toggleTask(id))
  }

  useEffect(() => {
    if (filter) {
      switch (filterBy) {
        case 'completed':
          setItems(completedTasks)
          break
        case 'uncompleted':
          setItems(uncompletedTasks)
          break
      }
    } else {
      setItems(allTasks)
    }
  }, [filter, filterBy, allTasks])

  return items.length > 0 ? (
    <List items={items} onDelete={handleDelete} onToggle={handleToggle} />
  ) : (
    <Empty />
  )
}
