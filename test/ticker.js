export default function() {
  let times = 0
  return Object.defineProperty(() => times++, 'times', {
    get: () => times
  })
}

