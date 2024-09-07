import { Dimensions } from "react-native"

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

export const myTextColor = {
  primary: '#2ec5b6',
  caption: '#697B7A'
}

export const myTheme = {
  primary: '#2ec5b6'
}

export const myDeviceHeight = {
  sm: 667.5,
  md: 914.5
}

export const myDeviceWidth = {
  sm: 375.5,
  md: 411.5
}

export const height = Dimensions.get('screen').height
export const width = Dimensions.get('screen').width
