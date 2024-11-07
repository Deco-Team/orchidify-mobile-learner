import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, KeyboardAvoidingView, Platform, ScrollView, useWindowDimensions, View } from 'react-native'
import { TabView, SceneRendererProps, TabBar } from 'react-native-tab-view'
import { Avatar, LoaderScreen } from 'react-native-ui-lib'

import MyText from '@/components/common/MyText'
import MyCertificateCard from '@/components/course-detail/MyCertificateCard'
import { myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'
import { IInstructorDetail } from '@/contracts/interfaces/instructor.interface'
import useInstructor from '@/hooks/api/useInstructor'

const defaultInstructorDetail: IInstructorDetail = {
  email: '',
  _id: '',
  name: '',
  phone: '',
  dateOfBirth: '',
  certificates: [],
  bio: '',
  idCardPhoto: '',
  avatar: '',
  status: '',
  createdAt: '',
  updatedAt: ''
}

const routes = [
  { key: 'bio', title: 'Thông tin' },
  { key: 'certificate', title: 'Chứng chỉ' }
]

const InstructorDetailScreen = () => {
  const { instructorId } = useLocalSearchParams()

  const [data, setData] = useState<IInstructorDetail>(defaultInstructorDetail)
  const [isLoading, setIsLoading] = useState(false)
  const { getInstructorDetail } = useInstructor()
  const layout = useWindowDimensions()
  const [tabIndex, setTabIndex] = useState(0)

  const renderScene = (
    props: SceneRendererProps & {
      route: {
        key: string
        title: string
      }
    }
  ) => {
    switch (props.route.key) {
      case 'bio':
        return (
          <ScrollView style={{ paddingTop: 15 }}>
            <MyText text={data.bio} styleProps={{ lineHeight: 24, textAlign: 'justify', color: myTextColor.caption }} />
          </ScrollView>
        )
      case 'certificate':
        return (
          <FlatList
            data={data.certificates}
            contentContainerStyle={{ alignItems: 'center', paddingVertical: 15 }}
            renderItem={(value) => (
              <MyCertificateCard name={value.item.name} key={value.index} certificateUrl={value.item.url} />
            )}
          />
        )
      default:
        return null
    }
  }

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const instructorDetail = await getInstructorDetail(instructorId as string)
      if (instructorDetail && typeof instructorDetail !== 'string') {
        setData(instructorDetail)
      }
      setIsLoading(false)
    })()
  }, [instructorId, getInstructorDetail])
  return (
    <>
      {isLoading ? (
        <LoaderScreen
          size='large'
          message='Đang tải...'
          color={myTheme.primary}
          messageStyle={{ fontFamily: myFontWeight.regular }}
        />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, backgroundColor: '#FFF', alignItems: 'center', gap: 15 }}
          keyboardVerticalOffset={100}
        >
          <View
            style={{
              marginTop: 45,
              backgroundColor: '#edf8f7',
              width: (width * 10) / 12,
              alignItems: 'center',
              paddingBottom: 20,
              borderRadius: 16
            }}
          >
            <Avatar size={75} containerStyle={{ marginTop: -35 }} source={{ uri: data.avatar }} />
            <MyText text={data.name} styleProps={{ marginTop: 15, fontSize: 20, fontFamily: myFontWeight.bold }} />
          </View>
          <TabView
            renderTabBar={(props) => {
              return (
                <TabBar
                  style={{ width: (width * 11) / 12 }}
                  activeColor={myTextColor.primary}
                  indicatorStyle={{ backgroundColor: myTheme.primary, height: 3 }}
                  indicatorContainerStyle={{ backgroundColor: '#FFF' }}
                  labelStyle={{
                    fontFamily: myFontWeight.semiBold,
                    color: '#000'
                  }}
                  {...props}
                />
              )
            }}
            navigationState={{ index: tabIndex, routes }}
            renderScene={renderScene}
            onIndexChange={setTabIndex}
            initialLayout={{ width: layout.width }}
          />
        </KeyboardAvoidingView>
      )}
    </>
  )
}

export default InstructorDetailScreen
