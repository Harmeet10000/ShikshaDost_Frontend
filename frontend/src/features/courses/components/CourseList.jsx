import React, { useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import course_thumbnail from "../../../assets/course_thumbnail.avif";
import { IoIosTimer } from "react-icons/io";
const CourseList = () => {
  const [category, setCategory] = useState("jee");
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  // Mock course data (replace with your actual course data)
  const courseData = {
    jee: [
      { id: 1, name: "JEE Advanced Preparation" },
      { id: 2, name: "JEE Mains Intensive Course" },
      { id: 3, name: "Mathematics for JEE" },
      { id: 4, name: "Physics Mastery" },
      { id: 5, name: "Chemistry Fundamentals" },
      { id: 6, name: "Comprehensive JEE Strategy" },
      { id: 7, name: "Mock Test Series" },
    ],
    neet: [
      { id: 1, name: "NEET Biology Prep" },
      { id: 2, name: "NEET Chemistry Course" },
      { id: 3, name: "NEET Physics Fundamentals" },
    ],
    cuet: [
      { id: 1, name: "CUET English Preparation" },
      { id: 2, name: "CUET Domain Knowledge" },
      { id: 3, name: "CUET General Test" },
    ],
  };

  // Determine number of items based on screen size
  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return 4; // xl screens
      if (window.innerWidth >= 1024) return 3; // lg screens
      if (window.innerWidth >= 768) return 2; // md screens
      return 1; // sm and smaller screens
    }
    return 2; // default fallback
  };

  return (
    <div className="all-courses-list flex flex-col gap-y-5 mb-5">
      {/* Category Selection */}
      <div className="flex justify-center items-center">
        <div className="course-category flex justify-center items-center gap-x-5 border rounded-full px-2 py-2 border-black">
          {["jee", "neet", "cuet"].map((cat) => (
            <div
              key={cat}
              className={`border px-3 py-2 min-w-[50px] md:min-w-[100px] text-center rounded-3xl cursor-pointer ${
                category === cat
                  ? "bg-[#0B545D] text-white border-white"
                  : "border-black bg-[#EFF1E4]"
              }`}
              onClick={() => setCategory(cat)}
            >
              <span className="uppercase text-sm md:text-lg">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Courses Carousel */}
      <div className="courses-list px-4 md:px-16 ">
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
          <CarouselContent className="-ml-1 ">
            {courseData[category].map((course) => (
              <CarouselItem
                key={course.id}
                className={`pl-1 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4`}
              >
                <div className="p-1">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className=" aspect-square  p-2">
                      <img
                        className="mb-2"
                        src={course_thumbnail}
                        alt={course.name}
                      />
                      <div className="course-details flex flex-col gap-y-2">
                        <h3 className="text-[#0B545D] font-bold">Physics</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit.{" "}
                        </p>
                        <h2 className="font-bold"> Vedika vishwakarma</h2>
                        <div className="flex items-center gap-x-1">
                            <span><IoIosTimer/></span><h2>Duration: 5hrs </h2>
                        </div>
                        <button className="border bg-[#0B545D] text-white px-3 py-2 font-bold hover:rounded-lg transition-all duration-300 ease-in">Go To Course</button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </div>
    </div>
  );
};

export default CourseList;
