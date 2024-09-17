import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text } from 'react-native'

const ComboCourseDetailScreen = () => {
  const { combocourseId } = useLocalSearchParams()
  return <Text>{combocourseId}</Text>
}

export default ComboCourseDetailScreen
