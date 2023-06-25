import FilterIcon from '../icons/filter.png'

type Props = {
  onClick: () => void
}
const FilterButton = ({ onClick }: Props) => {
  return (
    <button
      className="button button-with-icon"
      onClick={onClick}
      data-alt="Фильтр"
    >
      <img src={FilterIcon} alt="Фильтр" />
    </button>
  )
}

export default FilterButton
