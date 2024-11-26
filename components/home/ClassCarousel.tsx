import React from 'react'
import { Carousel } from 'react-native-ui-lib'

import MyClassCard from './MyClassCard'

import { myTheme, width } from '@/contracts/constants'
import { IClass } from '@/contracts/interfaces/class.interface'

const ClassCarousel: React.FC<{ data: IClass[] }> = ({ data }) => {
  return (
    <Carousel
      style={{ flexGrow: 0, marginTop: 15, width }}
      containerPaddingVertical={10}
      pageControlPosition='under'
      pageControlProps={{
        color: myTheme.primary
      }}
      pageWidth={(width * 11) / 12}
    >
      {data.map((value) => (
        <MyClassCard
          key={value._id}
          id={value._id}
          classCode={value.code}
          instructorName={value.instructor.name}
          progress={value.progress}
          status={value.status}
          title={value.title}
        />
      ))}
    </Carousel>
  )
}

export default ClassCarousel
