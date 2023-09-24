export function sortData(data, sort) {
  // TODO: Implement the sorting logic

  // While sort state isn't changed, return data in a-z format
  if (!sort) return data.sort((a, b) => a.name.localeCompare(b.name));
  // else return data in z-a format
  return data.sort((a, b) => b.name.localeCompare(a.name));
}

export function filterData(data, filter) {
  // TODO: Implement the filtering logic
  return data;
}
