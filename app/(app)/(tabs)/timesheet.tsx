import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isoWeek from 'dayjs/plugin/isoWeek'
import React, { useEffect, useState, useCallback } from 'react'
import { RefreshControl } from 'react-native'
import { AgendaList, CalendarProvider, ExpandableCalendar, LocaleConfig } from 'react-native-calendars'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LoaderScreen, View } from 'react-native-ui-lib'

import MyText from '@/components/common/MyText'
import TimesheetItem from '@/components/timesheet/TimesheetItem'
import { myFontWeight, myTheme } from '@/contracts/constants'
import { ITimesheet } from '@/contracts/interfaces/timesheet.interface'
import useTimesheet from '@/hooks/api/useTimesheet'

// Localization configuration
LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12'
  ],
  monthNamesShort: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
  dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay'
}
LocaleConfig.defaultLocale = 'vi'

dayjs.extend(isoWeek)
dayjs.extend(isToday)

const formatDate = (date: string) => dayjs(date).format('YYYY-MM-DD')
const groupByDate = (items: ITimesheet[]) =>
  items.reduce((groups: { title: string; data: ITimesheet[] }[], item) => {
    const formattedDate = formatDate(item.start)
    const existingGroup = groups.find((group) => group.title === formattedDate)

    if (existingGroup) {
      existingGroup.data.push(item)
    } else {
      groups.push({ title: formattedDate, data: [item] })
    }
    return groups.map((group) => ({ ...group, data: group.data.sort((a, b) => a.slotNumber - b.slotNumber) }))
  }, [])

const TimesheetScreen = () => {
  const { getMyTimesheet } = useTimesheet()
  const [date, setDate] = useState(dayjs().startOf('isoWeek').format('YYYY-MM-DD'))
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<{ title: string; data: ITimesheet[] }[]>([])
  const [markedDates, setMarkedDates] = useState<{ [key: string]: { marked: true } }>({})
  const [refreshing, setRefreshing] = React.useState(false)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const timesheet = await getMyTimesheet(date)

      if (timesheet && typeof timesheet !== 'string') {
        const groupedData = groupByDate(timesheet)
        setData(groupedData)

        const marks = timesheet.reduce((acc: { [key: string]: { marked: true } }, item) => {
          const key = formatDate(item.start)
          acc[key] = { marked: true }
          return acc
        }, {})
        setMarkedDates(marks)
      }
      setIsLoading(false)
    })()
  }, [date, getMyTimesheet])

  const handleDateChange = (selectedDate: string) => {
    const weekInView = dayjs(selectedDate).isoWeek()
    setDate(dayjs().isoWeek(weekInView).startOf('isoWeek').format('YYYY-MM-DD'))
    setSelectedDate(selectedDate)
  }

  const filteredData = data.filter((section) => section.title === selectedDate)

  const renderItem = useCallback(
    ({ item }: { item: ITimesheet | undefined }) => (item ? <TimesheetItem item={item} /> : null),
    []
  )

  const onRefresh = useCallback(() => {
    ;(async () => {
      setRefreshing(true)
      const timesheet = await getMyTimesheet(date)

      if (timesheet && typeof timesheet !== 'string') {
        const groupedData = groupByDate(timesheet)
        setData(groupedData)

        const marks = timesheet.reduce((acc: { [key: string]: { marked: true } }, item) => {
          const key = formatDate(item.start)
          acc[key] = { marked: true }
          return acc
        }, {})
        setMarkedDates(marks)
      }
      setRefreshing(false)
    })()
  }, [date, getMyTimesheet])

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <CalendarProvider
        date={formatDate(dayjs().toString())}
        todayButtonStyle={{ bottom: -45, backgroundColor: myTheme.primary }}
        theme={{ todayButtonTextColor: '#fff', todayButtonPosition: 'top' }}
        onDateChanged={handleDateChange}
      >
        <ExpandableCalendar
          theme={{
            todayTextColor: myTheme.primary,
            arrowColor: myTheme.primary,
            selectedDayBackgroundColor: myTheme.primary,
            dotColor: myTheme.primary,
            textMonthFontFamily: myFontWeight.semiBold,
            textDayFontFamily: myFontWeight.medium,
            textDayHeaderFontFamily: myFontWeight.regular
          }}
          hideKnob
          style={{ elevation: 5 }}
          allowShadow
          disablePan
          minDate={dayjs().subtract(2, 'year').format('YYYY-MM-DD')}
          maxDate={dayjs().add(1, 'year').format('YYYY-MM-DD')}
          firstDay={1}
          markedDates={markedDates}
          disableVirtualization
          // disableWeekScroll={isLoading}
          // disableArrowLeft={isLoading}
          // disableArrowRight={isLoading}
        />
        {isLoading ? (
          <LoaderScreen
            size='large'
            message='Đang tải...'
            color={myTheme.primary}
            messageStyle={{ fontFamily: myFontWeight.regular }}
          />
        ) : (
          <AgendaList
            refreshing={refreshing}
            refreshControl={<RefreshControl colors={[myTheme.primary]} refreshing={refreshing} onRefresh={onRefresh} />}
            dayFormat='ddd, dd MMMM'
            avoidDateUpdates
            sections={
              filteredData.length > 0
                ? filteredData
                : [
                    {
                      title: selectedDate,
                      data: [{}]
                    }
                  ]
            }
            keyExtractor={(item: ITimesheet | undefined, index: number) => item?._id || index.toString()}
            renderSectionHeader={(section: any | undefined) =>
              section ? (
                <View
                  style={{
                    paddingHorizontal: 12,
                    paddingTop: 12,
                    paddingBottom: 8
                  }}
                >
                  <MyText
                    text={
                      (dayjs(section).isToday() ? 'Hôm nay - ' : '') +
                      dayjs(section).locale('vi').format('ddd, D MMM, YYYY')
                    }
                    styleProps={{ fontFamily: myFontWeight.semiBold, fontSize: 16 }}
                  />
                </View>
              ) : null
            }
            renderItem={renderItem}
          />
        )}
      </CalendarProvider>
    </SafeAreaView>
  )
}

export default TimesheetScreen
