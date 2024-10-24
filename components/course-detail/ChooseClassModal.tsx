import { Feather } from '@expo/vector-icons'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import dayjs from 'dayjs'
import React, { useEffect, useMemo, useRef } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Chip, View } from 'react-native-ui-lib'

import MyText from '@/components/MyText'
import { height, myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'
import { IClass } from '@/contracts/interfaces/course.interface'
import { extractWeekday, extractSlot } from '@/utils'

interface ChooseClassModalProps {
  chooseClassModal: number
  setChooseClassModal: (index: number) => void
  chooseClass: string
  handleChooseClass: (classId: string) => void
  classList: IClass[]
}

const ChooseClassModal: React.FC<ChooseClassModalProps> = ({
  chooseClassModal,
  chooseClass,
  setChooseClassModal,
  handleChooseClass,
  classList
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['60%', '60%'], [])

  useEffect(() => {
    return chooseClassModal === -1 ? bottomSheetModalRef.current?.close() : bottomSheetModalRef.current?.present()
  }, [chooseClassModal])

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} opacity={0.7} disappearsOnIndex={-1} appearsOnIndex={1} />
        )}
        onChange={(index) => setChooseClassModal(index)}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
      >
        <BottomSheetView style={{ alignItems: 'flex-start', rowGap: 10 }}>
          <MyText
            text='Chọn lớp học'
            weight={myFontWeight.bold}
            styleProps={{ fontSize: 16, marginBottom: 10, marginLeft: 15 }}
          />
          {classList.map((value, i) => (
            <TouchableOpacity
              onPress={() => handleChooseClass(value._id)}
              key={i}
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 0.5,
                borderBottomColor: '#e8ebf0',
                width: (width * 11) / 12,
                flexDirection: 'row',
                height: height / 6,
                marginLeft: 15
              }}
            >
              <View style={{ rowGap: 7.5 }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <MyText
                    text={value.code}
                    styleProps={{
                      fontFamily: myFontWeight.bold,
                      fontSize: 16,
                      alignSelf: 'flex-start'
                    }}
                  />
                  <Chip
                    label='Sắp bắt đầu'
                    backgroundColor={myTheme.yellow}
                    containerStyle={{ borderWidth: 0 }}
                    labelStyle={{ color: '#FFF', fontFamily: myFontWeight.bold, fontSize: 10 }}
                  />
                </View>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <Feather name='calendar' size={20} color={myTheme.grey} />
                  <MyText
                    text={`Ngày bắt đầu: ${dayjs(value.startDate).format('DD/MM/YYYY')}`}
                    styleProps={{ color: myTextColor.caption }}
                  />
                </View>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                  <Feather name='clock' size={20} color={myTheme.grey} />
                  <MyText
                    text={`Thời gian học: ${value.weekdays.map((value) => extractWeekday(value)).join(', ')} • Tiết ${value.slotNumbers}: ${extractSlot(value.slotNumbers[0]).slotStart} - ${extractSlot(value.slotNumbers[0]).slotEnd}`}
                    styleProps={{ color: myTextColor.caption }}
                  />
                </View>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <Feather name='map-pin' size={20} color={myTheme.grey} />
                  <MyText text={value.garden.name} styleProps={{ color: myTextColor.caption }} />
                </View>
              </View>
              {chooseClass === value._id ? <Feather name='check' color={myTheme.primary} size={24} /> : null}
            </TouchableOpacity>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

export default ChooseClassModal
