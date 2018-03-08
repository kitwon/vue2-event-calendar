const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
export default [
  {
    date: `${year}-${month}-8`,
    title: 'buy something'
  },
  {
    date: `${year}-${month + 1}-2`,
    title: 'remember homework'
  },
  {
    date: `${year}-${month + 1}-15`,
    title: 'music festival'
  },
  {
    date: `${year}-${month + 2}-6`,
    title: 'a course of lectures'
  }
]
