function change(str) {
  let strArr = str.split('-')
  let newArr = []
  newArr.push(strArr[0])

  for (let i = 1; i < strArr.length; i++) {
    let findChat = strArr[i][0]
    let repChat = findChat.toLocaleUpperCase()

    let newstr = strArr[i].replace(findChat, repChat)
    newArr.push(newstr)
  }
  return newArr.join('')
}

console.log(change('border-bottom-color'))