import React from 'react'

const ListGroup = (props) => {
  const {
    items,
    selectedItem,
    onItemSelect,
    textProperty,
    valueProperty,
  } = props
  return (
    <div>
      <ul className='list-group'>
        {items.map((item, i) => (
          <li
            key={item[valueProperty]}
            onClick={() => {
              onItemSelect(item)
            }}
            className={
              selectedItem === item
                ? 'list-group-item active'
                : 'list-group-item'
            }
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  )
}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
}

export default ListGroup
