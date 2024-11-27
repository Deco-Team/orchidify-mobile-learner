import React from 'react'
import { Carousel } from 'react-native-ui-lib'

import MyCourseCard from './MyCourseCard'

import { myTheme, width } from '@/contracts/constants'
import { ICourseListResponse } from '@/contracts/interfaces/course.interface'

const CourseCarousel: React.FC<{ data: ICourseListResponse[] }> = ({ data }) => {
  return (
    <Carousel
      style={{ flexGrow: 0, marginTop: 15, width }}
      containerPaddingVertical={10}
      pageControlPosition='under'
      pageControlProps={{
        color: myTheme.primary
      }}
      pageWidth={(width * 8) / 12}
    >
      {data.map((value) => (
        <MyCourseCard
          price={value.price}
          key={value._id}
          id={value._id}
          image={value.thumbnail}
          instructor={value.instructor.name}
          discount={value.discount}
          finalPrice={value.finalPrice}
          title={value.title}
        />
      ))}
    </Carousel>
  )
}

export default CourseCarousel
