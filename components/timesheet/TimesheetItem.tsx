import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { isEmpty } from 'lodash'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Chip } from 'react-native-ui-lib'

import MyText from '@/components/common/MyText'
import { myFontWeight, myTextColor, myTheme } from '@/contracts/constants'
import { ITimesheet } from '@/contracts/interfaces/timesheet.interface'
import { extractAttendanceStatus, extractSlot } from '@/utils'

interface TimesheetItemProps {
  item: ITimesheet
}

const TimesheetItem = ({ item }: TimesheetItemProps) => {
  if (isEmpty(item)) {
    return (
      <View
        style={{
          flex: 1,
          height: 200,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <MyText styleProps={{ fontFamily: myFontWeight.regular, fontSize: 16 }} text='Không có tiết học' />
      </View>
    )
  }
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 12,
        elevation: 3,
        marginHorizontal: 12,
        marginBottom: 16,
        gap: 8
      }}
      onPress={() =>
        router.push({
          pathname: '/(app)/(class)/class-detail/[classId]',
          params: { classId: item.classId, title: item.metadata.code }
        })
      }
    >
      <View style={{ flexDirection: 'column' }}>
        <MyText
          styleProps={{ fontFamily: myFontWeight.semiBold, fontSize: 16 }}
          text={`${item.metadata.code} - ${item.metadata.title}`}
        />
        <MyText styleProps={{ fontSize: 14, color: myTheme.grey }} text={item.instructor.name} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <View style={{ flexDirection: 'column', gap: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Feather name='map-pin' size={16} color={myTheme.grey} />
            <MyText
              text={item.garden.name}
              styleProps={{ color: myTextColor.caption, textDecorationLine: 'underline' }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Feather name='clock' size={16} color={myTheme.grey} />
            <MyText
              text={`Tiết ${item.slotNumber}: ${extractSlot(item.slotNumber).slotStart} - ${extractSlot(item.slotNumber).slotEnd}`}
              styleProps={{ color: myTextColor.caption }}
            />
          </View>
        </View>
        {item.hasTakenAttendance ? (
          <Chip
            label={extractAttendanceStatus(item.attendance.status).title}
            backgroundColor={extractAttendanceStatus(item.attendance.status).color}
            containerStyle={{ borderWidth: 0 }}
            labelStyle={{ color: '#FFF', fontFamily: myFontWeight.semiBold }}
          />
        ) : (
          <MyText
            styleProps={{
              fontFamily: myFontWeight.bold,
              color: myTextColor.caption
            }}
            text='Chưa điểm danh'
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

export default TimesheetItem
