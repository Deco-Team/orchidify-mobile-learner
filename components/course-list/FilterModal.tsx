import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useEffect, useMemo, useRef } from 'react'
import { ScrollView } from 'react-native'
import { Button, View } from 'react-native-ui-lib'

import MyText from '@/components/common/MyText'
import { courseTypeItems, myTextColor, myFontWeight, myTheme, width, LEVEL } from '@/contracts/constants'

interface IFilterModalProps {
  filterModal: number
  setFilterModal: (index: number) => void
  filterCourseType: string[]
  setFilterCourseType: (value: string[]) => void
  sortTitle: 'title.asc' | 'title.desc' | ''
  setSortTitle: (value: 'title.asc' | 'title.desc' | '') => void
  sortPrice: 'price.asc' | 'price.desc' | ''
  setSortPrice: (value: 'price.asc' | 'price.desc' | '') => void
  filterLevel: string[]
  setFilterLevel: (value: string[]) => void
  handleApplyFilter: () => void
  handleClearFilter: () => void
  isLoading: boolean
}

const FilterModal: React.FC<IFilterModalProps> = ({
  filterModal,
  setFilterModal,
  filterCourseType,
  setFilterCourseType,
  sortPrice,
  sortTitle,
  setSortPrice,
  setSortTitle,
  handleApplyFilter,
  isLoading,
  filterLevel,
  setFilterLevel,
  handleClearFilter
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['60%', '60%'], [])

  useEffect(() => {
    return filterModal === -1 ? bottomSheetModalRef.current?.close() : bottomSheetModalRef.current?.present()
  }, [filterModal])

  const handleCourseType = (label: string) => {
    if (filterCourseType.includes(label)) {
      setFilterCourseType([...filterCourseType.filter((value) => value !== label)])
    } else {
      setFilterCourseType([...filterCourseType, label])
    }
  }

  const handleLevel = (label: string) => {
    if (filterLevel.includes(label)) {
      setFilterLevel([...filterLevel.filter((value) => value !== label)])
    } else {
      setFilterLevel([...filterLevel, label])
    }
  }

  const handleTitleSort = (value: 'title.asc' | 'title.desc' | '') => {
    if (sortTitle === value) {
      setSortTitle('')
    } else {
      setSortTitle(value)
    }
  }

  const handlePriceSort = (value: 'price.asc' | 'price.desc' | '') => {
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
        <BottomSheetView style={{ flex: 1, alignItems: 'center', paddingHorizontal: 1 }}>
          <ScrollView
            contentContainerStyle={{
              alignItems: 'flex-start',
              width: '100%',
              justifyContent: 'space-between',
              paddingBottom: 12,
              paddingHorizontal: 5
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
            <MyText text='Cấp độ' weight={myFontWeight.bold} styleProps={{ fontSize: 16 }} />
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
                label='Cơ bản'
                outline
                size='xSmall'
                color={filterLevel.includes(LEVEL.BASIC.toString()) ? myTextColor.primary : myTextColor.caption}
                onPress={() => handleLevel(LEVEL.BASIC.toString())}
                style={{
                  borderWidth: 1,
                  borderColor: filterLevel.includes(LEVEL.BASIC.toString()) ? myTheme.primary : '#697B7A',
                  backgroundColor: filterLevel.includes(LEVEL.BASIC.toString()) ? myTheme.lightGrey : '#FFF'
                }}
                labelStyle={{ fontFamily: myFontWeight.semiBold }}
              />
              <Button
                label='Trung bình'
                outline
                size='xSmall'
                color={filterLevel.includes(LEVEL.INTERMEDIATE.toString()) ? myTextColor.primary : myTextColor.caption}
                onPress={() => handleLevel(LEVEL.INTERMEDIATE.toString())}
                style={{
                  borderWidth: 1,
                  borderColor: filterLevel.includes(LEVEL.INTERMEDIATE.toString()) ? myTheme.primary : '#697B7A',
                  backgroundColor: filterLevel.includes(LEVEL.INTERMEDIATE.toString()) ? myTheme.lightGrey : '#FFF'
                }}
                labelStyle={{ fontFamily: myFontWeight.semiBold }}
              />
              <Button
                label='Nâng cao'
                outline
                size='xSmall'
                color={filterLevel.includes(LEVEL.ADVANCED.toString()) ? myTextColor.primary : myTextColor.caption}
                onPress={() => handleLevel(LEVEL.ADVANCED.toString())}
                style={{
                  borderWidth: 1,
                  borderColor: filterLevel.includes(LEVEL.ADVANCED.toString()) ? myTheme.primary : '#697B7A',
                  backgroundColor: filterLevel.includes(LEVEL.ADVANCED.toString()) ? myTheme.lightGrey : '#FFF'
                }}
                labelStyle={{ fontFamily: myFontWeight.semiBold }}
              />
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
                label='$ Thấp đến cao'
                outline
                size='xSmall'
                color={sortPrice === 'price.asc' ? myTextColor.primary : myTextColor.caption}
                onPress={() => handlePriceSort('price.asc')}
                style={{
                  borderWidth: 1,
                  borderColor: sortPrice === 'price.asc' ? myTheme.primary : '#697B7A',
                  backgroundColor: sortPrice === 'price.asc' ? myTheme.lightGrey : '#FFF'
                }}
                labelStyle={{ fontFamily: myFontWeight.semiBold }}
              />
              <Button
                label='$ Cao đến thấp'
                outline
                size='xSmall'
                color={sortPrice === 'price.desc' ? myTextColor.primary : myTextColor.caption}
                onPress={() => handlePriceSort('price.desc')}
                style={{
                  borderWidth: 1,
                  borderColor: sortPrice === 'price.desc' ? myTheme.primary : '#697B7A',
                  backgroundColor: sortPrice === 'price.desc' ? myTheme.lightGrey : '#FFF'
                }}
                labelStyle={{ fontFamily: myFontWeight.semiBold }}
              />
              <Button
                label='Tên từ A - Z'
                outline
                size='xSmall'
                color={sortTitle === 'title.asc' ? myTextColor.primary : myTextColor.caption}
                onPress={() => handleTitleSort('title.asc')}
                style={{
                  borderWidth: 1,
                  borderColor: sortTitle === 'title.asc' ? myTheme.primary : '#697B7A',
                  backgroundColor: sortTitle === 'title.asc' ? myTheme.lightGrey : '#FFF'
                }}
                labelStyle={{ fontFamily: myFontWeight.semiBold }}
              />
              <Button
                label='Tên từ Z - A'
                outline
                size='xSmall'
                color={sortTitle === 'title.desc' ? myTextColor.primary : myTextColor.caption}
                onPress={() => handleTitleSort('title.desc')}
                style={{
                  borderWidth: 1,
                  borderColor: sortTitle === 'title.desc' ? myTheme.primary : '#697B7A',
                  backgroundColor: sortTitle === 'title.desc' ? myTheme.lightGrey : '#FFF'
                }}
                labelStyle={{ fontFamily: myFontWeight.semiBold }}
              />
            </View>
            <View
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: (width * 11) / 12
              }}
            >
              <Button
                label='Áp dụng'
                onPress={handleApplyFilter}
                color='#FFF'
                size='medium'
                backgroundColor={myTheme.primary}
                disabled={isLoading}
                style={{
                  alignSelf: 'center',
                  width: (width * 5.25) / 12
                }}
                labelStyle={{ fontFamily: myFontWeight.semiBold }}
              />
              <Button
                label='Xóa bộ lọc'
                onPress={handleClearFilter}
                color='#FFF'
                size='medium'
                outline
                outlineColor={myTheme.red}
                disabled={isLoading}
                style={{
                  alignSelf: 'center',
                  width: (width * 5.25) / 12
                }}
                labelStyle={{ fontFamily: myFontWeight.semiBold, color: myTheme.red }}
              />
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

export default FilterModal
