import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Switch } from '@/components/ui/switch';
import { Trash2, Users } from 'lucide-react';

const MentorCard = ({ mentor }) => {
  // Sample revenue data - replace with actual data
  const revenueData = [
    { month: 'Jan', revenue: 2400 },
    { month: 'Feb', revenue: 1398 },
    { month: 'Mar', revenue: 3800 },
    { month: 'Apr', revenue: 3908 },
    { month: 'May', revenue: 4800 },
    { month: 'Jun', revenue: 3800 },
  ];

  // Sample mentor data - replace with actual data
  const sampleMentor = {
    name: "Dr. Sarah Johnson",
    email: "sarah.j@example.com",
    imageUrl: "/api/placeholder/100/100",
    totalMentees: 24,
    available: false,
    revenue: "$12,400"
  };

  const handleAvailabilityToggle = (checked) => {
    console.log('Availability toggled:', checked);
    // Add your availability toggle logic here
  };

  const handleDelete = () => {
    console.log('Delete clicked');
    // Add your delete logic here
  };

  return (
    <Card className="w-full  mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          {/* Profile Section */}
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={sampleMentor.imageUrl} alt={sampleMentor.name} />
              <AvatarFallback>{sampleMentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{sampleMentor.name}</h3>
              <p className="text-sm text-gray-500">{sampleMentor.email}</p>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center space-x-1">
                  <Users size={16} className="text-gray-500" />
                  <span className="text-sm">{sampleMentor.totalMentees} mentees</span>
                </div>
                <Badge variant={sampleMentor.available ? "success" : "secondary"}>
                  {sampleMentor.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Available</span>
              <Switch 
                checked={sampleMentor.available}
                onCheckedChange={handleAvailabilityToggle}
              />
            </div>
            <Button 
              variant="destructive" 
              size="icon"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Revenue Section */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold">Revenue Overview</h4>
            <span className="text-2xl font-bold text-green-600">{sampleMentor.revenue}</span>
          </div>
          
          {/* Revenue Chart */}
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MentorsList = () => {
  return (
    <div className=" space-y-6 ">
      
      <MentorCard />
      <MentorCard />
     
    </div>
  );
};

export default MentorsList;