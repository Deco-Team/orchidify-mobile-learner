import Entypo from '@expo/vector-icons/Entypo'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { Avatar, Button, TouchableOpacity, View } from 'react-native-ui-lib'

import MyLink from '@/components/MyLink'
import MyText from '@/components/MyText'
import ClassList from '@/components/course-detail/ClassList'
import LessonList from '@/components/course-detail/LessonList'
import Overview from '@/components/course-detail/Overview'
import RatingList from '@/components/course-detail/RatingList'
import { height, width, myFontWeight, myTextColor, myTheme } from '@/contracts/constants'

const CourseDetailScreen = () => {
  const { courseId } = useLocalSearchParams()

  const [readmoreDescription, setReadmoreDescription] = useState<number | undefined>(4)
  const [readmoreInstructor, setReadmoreInstructor] = useState<number | undefined>(4)
  const [collapseClass, setCollapseClass] = useState(true)
  const [collapseLesson, setCollapseLesson] = useState(true)
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#FFF' }}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}
          style={{ paddingHorizontal: 15, flex: 1 }}
        >
          <Overview />
          <MyText
            text='Về khóa học'
            styleProps={{
              fontFamily: myFontWeight.bold,
              fontSize: 16,
              marginTop: 20,
              marginBottom: 10,
              alignSelf: 'flex-start'
            }}
          />
          <MyText
            ellipsizeMode='tail'
            numberOfLines={readmoreDescription}
            styleProps={{
              textAlign: 'justify',
              color: myTextColor.caption,
              width: (width * 11) / 12,
              alignSelf: 'flex-start'
            }}
            text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum est vitae accusantium sit reiciendis veniam doloremque magni! Est sed voluptatum similique? Fugit cumque consectetur animi exercitationem eos blanditiis veniam labore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum est vitae accusantium sit reiciendis veniam doloremque magni! Est sed voluptatum similique? Fugit cumque consectetur animi exercitationem eos blanditiis veniam labore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum est vitae accusantium sit reiciendis veniam doloremque magni! Est sed voluptatum similique? Fugit cumque consectetur animi exercitationem eos'
          />
          <TouchableOpacity
            onPress={() => setReadmoreDescription(readmoreDescription ? undefined : 4)}
            style={{ alignSelf: 'flex-start' }}
          >
            <MyText styleProps={{ color: myTextColor.primary }} text={!readmoreDescription ? 'Rút gọn' : 'Xem thêm'} />
          </TouchableOpacity>
          <MyText
            text='Về giảng viên'
            styleProps={{
              fontFamily: myFontWeight.bold,
              fontSize: 16,
              marginTop: 20,
              marginBottom: 10,
              alignSelf: 'flex-start'
            }}
          />
          <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginBottom: 10, gap: 10 }}>
            <Avatar
              source={{
                uri: 'https://picsum.photos/200'
              }}
            />
            <View
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 5
              }}
            >
              <MyText styleProps={{ fontFamily: myFontWeight.bold }} text='PhongNH' />
              <MyText text='Trồng hoa' />
            </View>
          </View>
          <MyText
            ellipsizeMode='tail'
            numberOfLines={readmoreInstructor}
            styleProps={{
              textAlign: 'justify',
              color: myTextColor.caption,
              width: (width * 11) / 12,
              alignSelf: 'flex-start'
            }}
            text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum est vitae accusantium sit reiciendis veniam doloremque magni! Est sed voluptatum similique? Fugit cumque consectetur animi exercitationem eos blanditiis veniam labore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum est vitae accusantium sit reiciendis veniam doloremque magni! Est sed voluptatum similique? Fugit cumque consectetur animi exercitationem eos blanditiis veniam labore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum est vitae accusantium sit reiciendis veniam doloremque magni! Est sed voluptatum similique? Fugit cumque consectetur animi exercitationem eos'
          />

          <TouchableOpacity
            onPress={() => setReadmoreInstructor(readmoreInstructor ? undefined : 4)}
            style={{ alignSelf: 'flex-start' }}
          >
            <MyText styleProps={{ color: myTextColor.primary }} text={!readmoreInstructor ? 'Rút gọn' : 'Xem thêm'} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCollapseClass(!collapseClass)}
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              width: (width * 11) / 12,
              justifyContent: 'space-between',
              marginTop: 20,
              marginBottom: 10
            }}
          >
            <MyText
              text='Lớp học'
              styleProps={{
                fontFamily: myFontWeight.bold,
                fontSize: 16,
                alignSelf: 'flex-start'
              }}
            />
            <Entypo name={collapseClass ? 'chevron-small-up' : 'chevron-small-down'} size={26} color='black' />
          </TouchableOpacity>
          <Collapsible collapsed={collapseClass}>
            <ClassList />
          </Collapsible>
          <TouchableOpacity
            onPress={() => setCollapseLesson(!collapseLesson)}
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              width: (width * 11) / 12,
              justifyContent: 'space-between',
              marginTop: 20,
              marginBottom: 10
            }}
          >
            <MyText
              text='Nội dung buổi học'
              styleProps={{
                fontFamily: myFontWeight.bold,
                fontSize: 16,
                alignSelf: 'flex-start'
              }}
            />
            <Entypo name={collapseLesson ? 'chevron-small-up' : 'chevron-small-down'} size={26} color='black' />
          </TouchableOpacity>
          <Collapsible collapsed={collapseLesson}>
            <LessonList />
          </Collapsible>
          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              width: (width * 11) / 12,
              justifyContent: 'space-between',
              marginTop: 20,
              marginBottom: 10
            }}
          >
            <MyText
              text='Đánh giá'
              styleProps={{
                fontFamily: myFontWeight.bold,
                fontSize: 16,
                alignSelf: 'flex-start'
              }}
            />
            <MyLink
              href='/ratinglist'
              text='Xem thêm'
              styleProps={{ color: myTextColor.primary, fontFamily: myFontWeight.semiBold }}
            />
          </View>
          <RatingList />
        </ScrollView>
      </TouchableWithoutFeedback>
      <View
        style={{
          height: height / 10,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          justifyContent: 'space-between',
          paddingVertical: 5
        }}
      >
        <View>
          <MyText text='Tổng cộng' />
          <MyText
            text='145.000đ'
            styleProps={{
              fontFamily: myFontWeight.bold,
              color: myTextColor.primary,
              fontSize: 18
            }}
          />
        </View>
        <Button size='large' label='Tham gia' style={{ backgroundColor: myTheme.primary, paddingHorizontal: 50 }} />
      </View>
    </KeyboardAvoidingView>
  )
}
export default CourseDetailScreen
