import FilterButton from 'src/components/FilterButton'
import { useDispatch, useSelector } from 'react-redux'
import { clearFilter, filterStatus, toggleFilter } from 'src/store/taskSlice'
import { RadioBar } from 'src/components/radioBar'

import './styles.css'

export const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(filterStatus)
  const handleFilterClick = () => {
    dispatch(toggleFilter())
    if (!filter) {
      dispatch(clearFilter())
    }
  }

  return (
    <>
      <div className="filter-bar">
        <FilterButton onClick={handleFilterClick} />
        <span onClick={handleFilterClick}>
          {filter ? 'Убрать' : 'Показать'} фильтр
        </span>
      </div>
      <RadioBar show={filter} />
    </>
  )
}
