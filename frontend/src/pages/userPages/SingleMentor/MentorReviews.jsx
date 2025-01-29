import Marquee from "@/components/ui/marquee";
import { reviews } from "@/data/reviewData";
import React from "react";
import { MdStar } from "react-icons/md";

const ReviewCard = ({ review }) => {
  return (
    <div className="max-w-sm border rounded-lg shadow-md p-8 flex flex-col gap-y-3">
      <div className="flex gap-x-2 items-center font-bold">
        <span>
          <MdStar />
        </span>{" "}
        {review.rating}/5
      </div>
      <div >
        <p className="text-lg ">{review.feedback}</p>
      </div>
      <div>
        <h1 className=" text-lg font-bold">{review.user}</h1>
        <span>{review.date}</span>
      </div>
    </div>
  );
};

const MentorReviews = () => {
  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <section className="">
      <h1 className="text-2xl font-bold  mb-6">Reviews</h1>
      <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden rounded-lg  ">
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.key} review={review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.key} review={review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-background"></div>
      </div>
    </section>
  );
};

export default MentorReviews;
