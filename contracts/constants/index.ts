import { Dimensions } from 'react-native'

export const myFontWeight = {
  bold: 'Main-Font-Bold',
  boldItalic: 'Main-Font-BoldItalic',
  extraBold: 'Main-Font-ExtraBold',
  extraBoldItalic: 'Main-Font-ExtraBoldItalic',
  italic: 'Main-Font-Italic',
  medium: 'Main-Font-Medium',
  mediumItalic: 'Main-Font-MediumItalic',
  regular: 'Main-Font-Regular',
  semiBold: 'Main-Font-SemiBold',
  semiBoldItalic: 'Main-Font-SemiBoldItalic'
}

export const courseType = [
  {
    groupName: 'Lan rừng',
    groupItems: ['Lan phi điệp', 'Lan hải yến']
  },
  {
    groupName: 'Lan công nghiệp',
    groupItems: ['Dendrobium', 'Cattleya', 'Lan hồ điệp']
  },
  {
    groupName: 'Quá trình',
    groupItems: ['Cây con', 'Cây trưởng thành', 'Ra hoa', 'Hoa tàn']
  },
  {
    groupName: 'Phương pháp',
    groupItems: ['Tạo hình', 'Tách chiết', 'Chiết ghép', 'Cấy mô']
  }
]

export const courseTypeItems = [
  'Lan phi điệp',
  'Lan hải yến',
  'Dendrobium',
  'Cattleya',
  'Lan hồ điệp',
  'Cây con',
  'Cây trưởng thành',
  'Ra hoa',
  'Hoa tàn',
  'Tạo hình',
  'Tách chiết',
  'Chiết ghép',
  'Cấy mô'
]

export enum LEVEL {
  INTERMEDIATE = 'INTERMEDIATE',
  BASIC = 'BASIC',
  ADVANCED = 'ADVANCED'
}

export const myTextColor = {
  primary: '#2ec5b6',
  caption: '#697B7A'
}

export const myTheme = {
  primary: '#2ec5b6',
  lighter: '#D5F3F0',
  lightGrey: '#f6faf9',
  lightPrimary: '#e5f7f7',
  grey: '#697B7A',
  yellow: '#ff9f25',
  green: '#22c022',
  red: '#f76868'
}

export const myDeviceHeight = {
  sm: 667.5,
  md: 914.5
}

export const myDeviceWidth = {
  sm: 375.5,
  md: 411.5
}

export enum WEEKDAY {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday'
}

export enum SLOT_NUMBER {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4
}

export enum COURSE_STATUS {
  DRAFT = 'DRAFT',
  REQUESTING = 'REQUESTING',
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED'
}

export enum CLASS_STATUS {
  PUBLISHED = 'PUBLISHED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export enum LEARNER_STATUS {
  UNVERIFIED = 'UNVERIFIED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export const height = Dimensions.get('screen').height
export const width = Dimensions.get('screen').width
