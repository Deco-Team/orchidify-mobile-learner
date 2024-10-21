import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'

const MyText = ({
  weight = 'Main-Font-Regular',
  text,
  styleProps,
  ...props
}: {
  weight?: string
  text: string
  styleProps?: StyleProp<TextStyle>
  [key: string]: any
}) => {
  return (
    <Text style={[{ fontFamily: weight }, styleProps]} {...props}>
      {text}
    </Text>
  )
}

export default MyText
