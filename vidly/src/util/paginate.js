import _ from 'lodash'

const paginate = (items, currentPage, pageSize) => {
  const startIndex = currentPage * pageSize
  return _(items).slice(startIndex).take(pageSize).value()
}

export { paginate }
