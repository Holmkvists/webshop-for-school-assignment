export function toLocalstorage(thing, name) {
  localStorage.setItem(name, JSON.stringify(thing));
}

export function fromLocalStorage(item) {
  const itemJSON = localStorage.getItem(item);

  if (itemJSON) {
    return JSON.parse(itemJSON);
  }
}
