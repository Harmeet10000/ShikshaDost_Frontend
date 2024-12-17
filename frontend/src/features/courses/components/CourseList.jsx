import React, { useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import course_thumbnail from "../../../assets/course_thumbnail.avif";
import { IoIosTimer } from "react-icons/io";
import { motion } from "framer-motion";

import { courseData } from "@/data/courseData";

const CourseList = ({category}) => {
  
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  

  return (
    <>
     <motion.div
              key={category} // Key ensures re-render on category change
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Carousel
                plugins={[plugin.current]}
                className="w-full"
                opts={{
                  align: "start",
                  slidesToScroll: 1,
                }}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent className="-ml-1">
                  {courseData[category].map((course) => (
                    <CarouselItem
                      key={course.id}
                      className="pl-1 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4"
                    >
                      <div className="p-1">
                        <Card className="hover:shadow-lg transition-shadow duration-300">
                          <CardContent className="aspect-square p-2">
                            <img
                              className="mb-2"
                              src={course_thumbnail}
                              alt={course.name}
                              loading="lazy"
                            />
                            <div className="course-details flex flex-col gap-y-2">
                              <h3 className="text-[#0B545D] font-bold">
                                {course.name}
                              </h3>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit.
                              </p>
                              <h2 className="font-bold">Vedika Vishwakarma</h2>
                              <div className="flex items-center gap-x-1">
                                <span>
                                  <IoIosTimer />
                                </span>
                                <h2>Duration: 5hrs </h2>
                              </div>
                              <button className="border bg-[#0B545D] text-white px-3 py-2 font-bold hover:rounded-lg transition-all duration-300 ease-in">
                                Go To Course
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </motion.div>
      {/* <div className="all-courses-list flex flex-col gap-y-5 mb-10">
       
        <div className="flex justify-center items-center">
          <CourseCategory setCategory={setCategory} category={category} />
        </div>

        
        <div className="courses-list px-4 md:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={category} // Key ensures re-render on category change
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Carousel
                plugins={[plugin.current]}
                className="w-full"
                opts={{
                  align: "start",
                  slidesToScroll: 1,
                }}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent className="-ml-1">
                  {courseData[category].map((course) => (
                    <CarouselItem
                      key={course.id}
                      className="pl-1 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4"
                    >
                      <div className="p-1">
                        <Card className="hover:shadow-lg transition-shadow duration-300">
                          <CardContent className="aspect-square p-2">
                            <img
                              className="mb-2"
                              src={course_thumbnail}
                              alt={course.name}
                            />
                            <div className="course-details flex flex-col gap-y-2">
                              <h3 className="text-[#0B545D] font-bold">
                                {course.name}
                              </h3>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit.
                              </p>
                              <h2 className="font-bold">Vedika Vishwakarma</h2>
                              <div className="flex items-center gap-x-1">
                                <span>
                                  <IoIosTimer />
                                </span>
                                <h2>Duration: 5hrs </h2>
                              </div>
                              <button className="border bg-[#0B545D] text-white px-3 py-2 font-bold hover:rounded-lg transition-all duration-300 ease-in">
                                Go To Course
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </motion.div>
          </AnimatePresence>
        </div>
      </div> */}
    </>
  );
};

export default CourseList;
