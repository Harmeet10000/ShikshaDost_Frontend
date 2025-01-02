import React from "react";
import mentor1 from "../../assets/mentor1.jpg";
import mentor2 from "../../assets/mentor2.jpg";
import mentor3 from "../../assets/mentor3.jpg";

const Mentors = () => {
  const mentors = [
    {
      name: "Dr. Anuj Mehta",
      description: "2nd year student, IIT Delhi",
      image: mentor1,
    },
    {
      name: "Dr. Anuj Mehta",
      description: "2nd year student, IIT Delhi",
      image: mentor2,
    },
    {
      name: "Dr. Anuj Mehta",
      description: "2nd year student, IIT Delhi",
      image: mentor3,
    },
    {
      name: "Dr. Anuj Mehta",
      description: "2nd year student, IIT Delhi",
      image: mentor1,
    },
    {
      name: "Dr. Anuj Mehta",
      description: "2nd year student, IIT Delhi",
      image: mentor2,
    },
    {
      name: "Dr. Anuj Mehta",
      description: "2nd year student, IIT Delhi",
      image: mentor3,
    },
    {
      name: "Dr. Anuj Mehta",
      description: "2nd year student, IIT Delhi",
      image: mentor1,
    },
    {
      name: "Dr. Anuj Mehta",
      description: "2nd year student, IIT Delhi",
      image: mentor2,
    },
  ];

  return (
    <section className="mentor-section">
      <div className="container mx-auto py-10">
        <h1 className="text-5xl font-bold text-center mb-2">Our Mentors</h1>
        <p className="text-xl font-bold text-center mb-5">
          Browse our network of mentors to find the right fit.
        </p>
        <div className="mentorslist-section border px-auto flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
            {mentors.map((mentor, index) => (
              <div key={index} className="mentor">
                <img
                  src={mentor.image}
                  className="w-64 h-64"
                  alt={mentor.name}
                />
                <div className="py-2">
                  <h1 className="font-bold">{mentor.name}</h1>
                  <p>{mentor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mentors;
