import { useDispatch } from 'react-redux'
import { setFilterBy } from 'src/store/taskSlice'

type Props = {
  show: boolean
}

export const RadioBar = ({ show }: Props) => {
  const dispatch = useDispatch()
  const handleSelectFilter = (e: HTMLInputElement) => {
    dispatch(setFilterBy(e.value))
  }
  if (!show) return <></>
  return (
    <div className="radio-bar">
      <div>
        <input
          onChange={(e) => handleSelectFilter(e.target)}
          type="radio"
          id="completed"
          value="completed"
          name="filterTask"
        />
        <label htmlFor="completed">Завершённые</label>
      </div>
      <div>
        <input
          onChange={(e) => handleSelectFilter(e.target)}
          type="radio"
          id="uncompleted"
          value="uncompleted"
          name="filterTask"
        />
        <label htmlFor="uncompleted">Незавершённые</label>
      </div>
    </div>
  )
}
