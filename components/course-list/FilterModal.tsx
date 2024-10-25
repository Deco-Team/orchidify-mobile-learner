import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useEffect, useMemo, useRef } from 'react'
import { ScrollView } from 'react-native'
import { Button, View } from 'react-native-ui-lib'

import MyText from '@/components/MyText'
import { courseTypeItems, myTextColor, myFontWeight, myTheme, width } from '@/contracts/constants'

interface IFilterModalProps {
  filterModal: number
  setFilterModal: (index: number) => void
  filterCourseType: string[]
  setfilterCourseType: (value: string[]) => void
  sortPrice: 'price.asc' | 'price.desc' | ''
  setSortPrice: (value: 'price.asc' | 'price.desc' | '') => void
  handleApplyFilter: () => void
}

const FilterModal: React.FC<IFilterModalProps> = ({
  filterModal,
  setFilterModal,
  filterCourseType,
  setfilterCourseType,
  sortPrice,
  setSortPrice,
  handleApplyFilter
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['60%', '60%'], [])

  useEffect(() => {
    return filterModal === -1 ? bottomSheetModalRef.current?.close() : bottomSheetModalRef.current?.present()
  }, [filterModal])

  const handleCourseType = (label: string) => {
    if (filterCourseType.includes(label)) {
      setfilterCourseType([...filterCourseType.filter((value) => value !== label)])
    } else {
      setfilterCourseType([...filterCourseType, label])
    }
  }

  const handleSortPrice = (value: 'price.asc' | 'price.desc' | '') => {
    if (sortPrice === value) {
      setSortPrice('')
    } else {
      setSortPrice(value)
    }
  }

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        enableContentPanningGesture={false}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} opacity={0.7} disappearsOnIndex={-1} appearsOnIndex={1} />
        )}
        onChange={(index) => setFilterModal(index)}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
      >
        <BottomSheetView style={{ flex: 1, alignItems: 'center' }}>
          <ScrollView
            contentContainerStyle={{
              alignItems: 'flex-start',
              width: '100%',
              justifyContent: 'space-between',
              paddingBottom: 12
            }}
          >
            <MyText text='Thể loại' weight={myFontWeight.bold} styleProps={{ fontSize: 16 }} />
            <View
              style={{
                flexDirection: 'row',
                columnGap: 15,
                rowGap: 7.5,
                width: '100%',
                padding: 10,
                flexWrap: 'wrap',
                marginVertical: 10
              }}
            >
              {courseTypeItems.map((value, i) => (
                <Button
                  key={i}
                  label={value}
                  outline
                  size='xSmall'
                  onPress={() => handleCourseType(value)}
                  color={filterCourseType.includes(value) ? myTextColor.primary : myTextColor.caption}
                  style={{
                    borderWidth: 1,
                    borderColor: filterCourseType.includes(value) ? myTheme.primary : '#697B7A',
                    backgroundColor: filterCourseType.includes(value) ? myTheme.lightGrey : '#FFF'
                  }}
                  labelStyle={{ fontFamily: myFontWeight.semiBold }}
                />
              ))}
            </View>
            <MyText text='Sắp xếp theo' weight={myFontWeight.bold} styleProps={{ fontSize: 16 }} />
            <View
              style={{
                flexDirection: 'row',
                columnGap: 15,
                rowGap: 7.5,
                width: '100%',
                padding: 10,
                flexWrap: 'wrap',
                marginVertical: 10
              }}
            >
              <Button
                label='$ Cao đến thấp'
                outline
                size='xSmall'
                color={sortPrice === 'price.desc' ? myTextColor.primary : myTextColor.caption}
                onPress={() => handleSortPrice('price.desc')}
                style={{
                  borderWidth: 1,
                  borderColor: sortPrice === 'price.desc' ? myTheme.primary : '#697B7A',
                  backgroundColor: sortPrice === 'price.desc' ? myTheme.lightGrey : '#FFF'
                }}
                labelStyle={{ fontFamily: myFontWeight.semiBold }}
              />
              <Button
                label='$ Thấp đến cao'
                outline
                size='xSmall'
                color={sortPrice === 'price.asc' ? myTextColor.primary : myTextColor.caption}
                onPress={() => handleSortPrice('price.asc')}
                style={{
                  borderWidth: 1,
                  borderColor: sortPrice === 'price.asc' ? myTheme.primary : '#697B7A',
                  backgroundColor: sortPrice === 'price.asc' ? myTheme.lightGrey : '#FFF'
                }}
                labelStyle={{ fontFamily: myFontWeight.semiBold }}
              />
            </View>
            <Button
              label='Áp dụng'
              onPress={handleApplyFilter}
              color='#FFF'
              style={{
                alignSelf: 'center',
                backgroundColor: myTheme.primary,
                width: (width * 10) / 12
              }}
              labelStyle={{ fontFamily: myFontWeight.semiBold }}
            />
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

export default FilterModal
