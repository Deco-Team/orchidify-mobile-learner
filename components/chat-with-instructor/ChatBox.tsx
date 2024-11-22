import { Ionicons } from '@expo/vector-icons'
import {
  addDoc,
  and,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where
} from '@react-native-firebase/firestore'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Bubble, GiftedChat, IMessage, Send } from 'react-native-gifted-chat'
import 'dayjs/locale/vi'
import { LoaderScreen, Text, View } from 'react-native-ui-lib'

import { myTheme, width } from '@/contracts/constants'
import useUserAuth from '@/hooks/firebase/useUserAuth'
import { firebaseFirestore } from '@/utils/firebase'

interface ChatBoxProps {
  classId: string
  instructorId: string
  learnerId: string
}

const ChatBox = ({ classId, instructorId, learnerId }: ChatBoxProps) => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [chatRoomId, setChatRoomId] = useState('')

  const { user } = useUserAuth()

  dayjs.extend(isToday)

  const checkExistChatRoom = async () => {
    const q = query(
      collection(firebaseFirestore, 'chat-room'),
      and(
        where('classId', '==', classId),
        where('learnerId', '==', learnerId),
        where('instructorId', '==', instructorId)
      )
    )

    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      setChatRoomId(querySnapshot.docs[0].id)
    } else {
      const docRef = await addDoc(collection(firebaseFirestore, 'chat-room'), {
        classId,
        learnerId,
        instructorId,
        createdAt: serverTimestamp()
      })
      setChatRoomId(docRef.id)
    }
  }

  const loadMessages = useCallback(() => {
    if (!chatRoomId) return

    const messageQuery = query(
      collection(firebaseFirestore, 'message'),
      where('chatRoomId', '==', chatRoomId),
      limit(500),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(messageQuery, (QuerySnapshot) => {
      const fetchedMessages: IMessage[] = []
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().message,
          user: {
            _id: doc.data().senderId
          }
        } as IMessage)
      })

      const sortedMessages = fetchedMessages.sort((a, b) => {
        const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : a.createdAt
        const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : b.createdAt
        return dateB - dateA
      })
      setMessages(sortedMessages)
    })

    return unsubscribe
  }, [chatRoomId])

  useLayoutEffect(() => {
    checkExistChatRoom()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (chatRoomId) {
      const unsubscribe = loadMessages()
      return () => {
        if (unsubscribe) {
          unsubscribe()
        }
      }
    }
  }, [chatRoomId, loadMessages])

  const formatMessageDate = (date: Date | number): string => {
    if (dayjs(date).isToday()) {
      return 'Hôm nay'
    } else {
      return dayjs(date).locale('vi').format('DD MMM YYYY')
    }
  }

  const onSend = useCallback(
    (messages: IMessage[] = []) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))

      const { text, user, createdAt } = messages[0]

      const newMessage = {
        chatRoomId,
        message: text,
        createdAt,
        senderId: user._id,
        senderRole: 'LEARNER'
      }
      addDoc(collection(firebaseFirestore, 'message'), newMessage)
    },
    [chatRoomId]
  )

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage
        showUserAvatar
        renderAvatar={() => null}
        onSend={(messages) => onSend(messages)}
        alwaysShowSend
        messagesContainerStyle={{
          backgroundColor: '#fff'
        }}
        placeholder='Aa'
        user={{
          _id: user?.uid || ''
        }}
        renderSend={(props) => (
          <Send
            {...props}
            containerStyle={{
              padding: 10,
              alignSelf: 'center'
            }}
          >
            <Ionicons name='send' size={24} color='gray' />
          </Send>
        )}
        textInputProps={{
          style: {
            borderRadius: 8,
            padding: 20,
            paddingRight: 10,
            marginRight: 10,
            width: width - 60
          }
        }}
        renderLoading={() => <LoaderScreen size='large' color={myTheme.primary} />}
        scrollToBottom
        scrollToBottomComponent={() => <Ionicons name='chevron-down' size={24} color='gray' />}
        scrollToBottomStyle={{ left: '50%', transform: [{ translateX: -12 }] }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: myTheme.primary
                }
              }}
            />
          )
        }}
        renderDay={(props) => {
          const { currentMessage, previousMessage } = props
          const showDate =
            !previousMessage || !dayjs(currentMessage?.createdAt).isSame(previousMessage?.createdAt, 'day')
          const messageDate = currentMessage?.createdAt

          return (
            showDate && (
              <View style={{ alignItems: 'center', marginVertical: 5 }}>
                <Text style={{ color: 'gray', fontSize: 12 }}>{messageDate ? formatMessageDate(messageDate) : ''}</Text>
              </View>
            )
          )
        }}
        locale='vi'
        keyboardShouldPersistTaps='never'
      />
    </View>
  )
}

export default ChatBox
