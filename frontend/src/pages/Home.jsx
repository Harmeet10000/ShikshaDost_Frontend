import CourseList from '@/features/courses/components/CourseList'
import MentorsList from '@/features/mentors/components/MentorsList'
import React from 'react'


const Home = () => {
  return (
    <div >
      <CourseList/>
      <MentorsList/>
    </div>
  )
}

export default Home