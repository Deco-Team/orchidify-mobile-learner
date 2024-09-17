import { useLocalSearchParams } from 'expo-router'
import { Text } from 'react-native'

const CourseDetailScreen = () => {
  const { courseId } = useLocalSearchParams()
  return <Text>{courseId}</Text>
}

export default CourseDetailScreen
