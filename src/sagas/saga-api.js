export async function fetchData() {
  let result = await fetch('http://localhost:7001/api/posts')
  let data = result.json()
  return data
}
