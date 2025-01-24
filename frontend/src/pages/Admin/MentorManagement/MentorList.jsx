import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Switch } from "@/components/ui/switch";
import { BlocksIcon, Trash2, Users } from "lucide-react";
import { getAllMentorsListInAdmin } from "@/services/api";
import { MdBlock } from "react-icons/md";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";

const MentorCard = ({ mentor, onBlock }) => {
  const token = Cookies.get("authToken");
  const revenueData = [
    { month: "Jan", revenue: 2400 },
    { month: "Feb", revenue: 1398 },
    { month: "Mar", revenue: 3800 },
    { month: "Apr", revenue: 3908 },
    { month: "May", revenue: 4800 },
    { month: "Jun", revenue: 3800 },
  ];

  const handleBlock = async (mentorId) => {
    try {
      console.log(mentorId);
      console.log(token);
      const response = await axios.patch(
        `http://localhost:8000/api/v1/users/blockMentor/${mentorId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      // console.log(response);
      toast("Mentor blocked successfully", { type: "success" });
      onBlock(mentorId);
    } catch (error) {
      console.error(error.message);
      toast("Error blocking mentor", { type: "error" });
    }
  };

  const handleDelete = () => {
    console.log("Delete clicked");
    // Add your delete logic here
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          {/* Profile Section */}
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={mentor.profile_imageURL} alt={mentor.name} />
              <AvatarFallback>
                {mentor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{mentor.name}</h3>
              <p className="text-sm text-gray-500">{mentor.email}</p>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center space-x-1">
                  <Users size={16} className="text-gray-500" />
                  <span className="text-sm">{mentor.totalMentees} mentees</span>
                </div>
                <Badge variant={mentor.available ? "success" : "secondary"}>
                  {mentor.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleBlock(mentor._id)}
            >
              <MdBlock className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="icon" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* <CardContent>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold">Revenue Overview</h4>
            <span className="text-2xl font-bold text-green-600">{mentor.revenue}</span>
          </div>

          
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent> */}
    </Card>
  );
};

const MentorsList = () => {
  const {
    data: initialMentors,
    isLoading,
    isError,
  } = useQuery(["mentors"], getAllMentorsListInAdmin);

  const [mentors, setMentors] = useState([]);

  React.useEffect(() => {
    
    if (initialMentors) {
      // console.log('ini',initialMentors);
      setMentors(initialMentors); 
    }
  }, [initialMentors]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading mentors.</p>;
  // console.log(mentors);

  const handleBlock = (mentorId) => {
    setMentors((prev) => prev.filter((mentor) => mentor._id !== mentorId));
  };

  return (
    <div className="space-y-6">
      {Array.isArray(mentors) && mentors.length > 0 ? (
        mentors.map((mentor) => (
          <MentorCard key={mentor._id} mentor={mentor} onBlock={handleBlock} />
        ))
      ) : (
        <p>No mentors available.</p>
      )}
    </div>
  );
};

export default MentorsList;
