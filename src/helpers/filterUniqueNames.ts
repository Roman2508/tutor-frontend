interface ItemsType {
  value: string
  label: string
}

export const filterUniqueNames = (arr: ItemsType[]): ItemsType[] => {
  const uniqueNames = new Set()

  const filteredArr = arr.filter((obj) => {
    if (!uniqueNames.has(obj.label)) {
      uniqueNames.add(obj.label)
      return true
    }
    return false
  })

  return filteredArr
}
