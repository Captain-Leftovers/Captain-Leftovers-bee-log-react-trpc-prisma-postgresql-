import { Hive } from "../types"


export const nextHiveNumber = (hives:null | Hive[]) => {
    if (hives === null || hives.length === 0) {return 1}
  const hiveNumbers = hives.map((hive) => hive.number)
  const maxHiveNumber = Math.max(...hiveNumbers)
  return maxHiveNumber + 1
} 

export const formatDateForInput = (date: Date) => {
  if( typeof date == 'string') return
  const formattedDate = date.toLocaleDateString().split('/').reverse().join('-')
  
  

  
  return formattedDate
}