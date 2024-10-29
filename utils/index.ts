import * as ImagePicker from 'expo-image-picker'

import { LEVEL, SLOT_NUMBER, WEEKDAY } from '@/contracts/constants'

export const extractMessage = (message: string, replace: string[]) => {
  let temp = message
  for (let i = 0; i < replace.length; i++) {
    temp = temp.replace('<>', replace[i])
  }
  return temp
}

export const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    base64: true,
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1
  })
  if (!result.canceled) {
    return result.assets
  }

  return null
}

export const extractLevel = (value: LEVEL) => {
  switch (value) {
    case LEVEL.BASIC:
      return {
        color: '#21bc2b',
        title: 'Cơ bản'
      }
    case LEVEL.ADVANCED:
      return {
        color: '#f66868',
        title: 'Nâng cao'
      }
    case LEVEL.INTERMEDIATE:
      return {
        color: '#ff9242',
        title: 'Trung bình'
      }
  }
}

export const extractWeekday = (value: WEEKDAY) => {
  switch (value) {
    case WEEKDAY.MONDAY:
      return 'T2'
    case WEEKDAY.TUESDAY:
      return 'T3'
    case WEEKDAY.WEDNESDAY:
      return 'T4'
    case WEEKDAY.THURSDAY:
      return 'T5'
    case WEEKDAY.FRIDAY:
      return 'T6'
    case WEEKDAY.SATURDAY:
      return 'T7'
    case WEEKDAY.SUNDAY:
      return 'CN'
    default:
      return 'N/A'
  }
}

export const extractSlot = (slotNumber: SLOT_NUMBER) => {
  switch (slotNumber) {
    case SLOT_NUMBER.ONE:
      return { slotStart: '07:00', slotEnd: '09:00' }
    case SLOT_NUMBER.TWO:
      return { slotStart: '09:30', slotEnd: '11:30' }
    case SLOT_NUMBER.THREE:
      return { slotStart: '12:30', slotEnd: '14:30' }
    case SLOT_NUMBER.FOUR:
      return { slotStart: '15:00', slotEnd: '17:00' }
    default:
      return { slotStart: 'N/A', slotEnd: 'N/A' }
  }
}

export const resolveError = (error: unknown) => {
  resolveError(error)
}
