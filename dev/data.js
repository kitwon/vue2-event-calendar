const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()

const ArrayData = [
  {
    date: `${year}-${month}-${day}`,
    title: 'buy something'
  },
  {
    date: `${year}-${month}-${day}`,
    title: 'shopping'
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
let ObjectData = {}

ArrayData.forEach(item => {
  ObjectData[item.date] = { title: item.title }
})

export default {
  Array: ArrayData,
  Object: ObjectData
}
