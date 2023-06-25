import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './configureStore'

export interface taskListState {
  list: Task[]
  notification: string
  filter: boolean
  filterBy: string
}

const initialState: taskListState = {
  list: [],
  notification: '',
  filter: false,
  filterBy: '',
}

export const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task['header']>) => {
      state.list.push({
        id: crypto.randomUUID(),
        header: action.payload,
        done: false,
      })
    },
    completeTask: (state, action: PayloadAction<Task['id']>) => {
      const task = state.list.find((x) => x.id === action.payload)

      if (task) {
        task.done = true
      }
    },
    toggleTask: (state, action: PayloadAction<Task['id']>) => {
      const task = state.list.find((x) => x.id === action.payload)

      if (task) {
        task.done = !task.done

        if (task.done) {
          state.notification = `Задача "${task.header}" завершена`
        }
      }
    },

    deleteTask: (state, action: PayloadAction<Task['id']>) => {
      state.list = state.list.filter((x) => x.id !== action.payload)
    },
    setNotification: (state, action: PayloadAction<Task['header']>) => {
      state.notification = `Задача "${action.payload}" завершена`
    },
    clearNotification: (state) => {
      state.notification = ''
    },
    toggleFilter: (state) => {
      state.filter = !state.filter
    },
    setFilterBy: (state, action: PayloadAction<string>) => {
      state.filterBy = action.payload
    },
    clearFilter: (state) => {
      state.filterBy = ''
    },
  },
})

export const {
  addTask,
  completeTask,
  deleteTask,
  toggleTask,
  clearNotification,
  toggleFilter,
  setFilterBy,
  clearFilter,
} = taskListSlice.actions

export default taskListSlice.reducer

export const tasksSelector = (state: RootState) => state.taskList.list

export const completedSelector = (state: RootState) =>
  state.taskList.list.filter((x) => x.done)

export const uncompletedSelector = (state: RootState) =>
  state.taskList.list.filter((x) => !x.done)

export const fullCount = (state: RootState) => state.taskList.list.length

export const completeCount = (state: RootState) =>
  state.taskList.list.filter((x) => x.done).length

export const uncompleteCount = (state: RootState) =>
  state.taskList.list.filter((x) => !x.done).length

export const getNotification = (state: RootState) => state.taskList.notification

export const filterStatus = (state: RootState) => state.taskList.filter

export const getFilterBy = (state: RootState) => state.taskList.filterBy
