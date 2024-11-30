import { collection, limit, onSnapshot, orderBy, query, where } from '@react-native-firebase/firestore'
import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { LoaderScreen } from 'react-native-ui-lib'

import MyText from '@/components/common/MyText'
import MyNotificationCard from '@/components/notification/MyNotificationCard'
import { useSession } from '@/contexts/AuthContext'
import { myFontWeight, myTheme } from '@/contracts/constants'
import { IUser } from '@/contracts/interfaces/auth.interface'
import { INotification } from '@/contracts/interfaces/notification.interface'
import { firebaseFirestore } from '@/utils/firebase'

const NotificationListScreen = () => {
  const [notifications, setNotifications] = useState<INotification[]>([])
  const { accessToken } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const loadNotification = useCallback(() => {
    const user = jwtDecode(accessToken || '') as IUser
    const notificationQuery = query(
      collection(firebaseFirestore, 'notification'),
      where('receiverIds', 'array-contains', user.sub),
      orderBy('createdAt', 'desc'),
      limit(100)
    )
    const unsubscribe = onSnapshot(notificationQuery, (querySnapshot) => {
      const fetchedNotifications: INotification[] = []
      querySnapshot.forEach((doc) => {
        fetchedNotifications.push({ id: doc.id, ...doc.data() } as INotification)
      })
      setNotifications(fetchedNotifications)
    })

    return unsubscribe
  }, [accessToken])

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = loadNotification()
    setIsLoading(false)
    return () => unsubscribe?.()
  }, [accessToken, loadNotification])

  const onRefresh = () => {
    setRefreshing(true)
    const unsubscribe = loadNotification()
    setRefreshing(false)
    return () => unsubscribe?.()
  }

  const groupedNotifications = notifications.reduce(
    (acc, notification) => {
      const isToday = dayjs().isSame(notification.createdAt.toDate(), 'day')
      if (isToday) {
        acc.today.push(notification)
      } else {
        acc.earlier.push(notification)
      }
      return acc
    },
    { today: [] as INotification[], earlier: [] as INotification[] }
  )

  const formatRelativeTime = (date: Date) => {
    const diffMins = dayjs().diff(date, 'minute')
    const diffHours = dayjs().diff(date, 'hour')
    const diffDays = dayjs().diff(date, 'day')
    const diffWeeks = dayjs().diff(date, 'week')
    const diffMonths = dayjs().diff(date, 'month')
    const diffYears = dayjs().diff(date, 'year')

    if (diffMins < 1) return 'vừa xong'
    if (diffMins < 60) return `${diffMins} phút trước`
    if (diffHours < 24) return `${diffHours} giờ trước`
    if (diffDays < 7) return `${diffDays} ngày trước`
    if (diffWeeks < 4) return `${diffWeeks} tuần trước`
    if (diffMonths < 12) return `${diffMonths} tháng trước`
    return `${diffYears} năm trước`
  }

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
        <ScrollView
          refreshControl={<RefreshControl colors={[myTheme.primary]} refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ alignItems: 'center' }}
          style={{ backgroundColor: 'white' }}
        >
          {groupedNotifications.today.length > 0 ? (
            <MyText
              styleProps={{ fontSize: 16, marginVertical: 10, alignSelf: 'flex-start', marginLeft: 15 }}
              text='Hôm nay'
            />
          ) : undefined}
          {groupedNotifications.today.map((value) => (
            <MyNotificationCard
              key={value.id}
              link={value.data}
              body={value.body}
              title={value.title}
              date={formatRelativeTime(value.createdAt.toDate())}
            />
          ))}
          {groupedNotifications.earlier.length > 0 ? (
            <MyText
              styleProps={{ fontSize: 16, marginVertical: 10, alignSelf: 'flex-start', marginLeft: 15 }}
              text='Cũ hơn'
            />
          ) : undefined}
          {groupedNotifications.earlier.map((value) => (
            <MyNotificationCard
              key={value.id}
              body={value.body}
              title={value.title}
              link={value.data}
              date={formatRelativeTime(value.createdAt.toDate())}
            />
          ))}
        </ScrollView>
      )}
    </>
  )
}

export default NotificationListScreen
