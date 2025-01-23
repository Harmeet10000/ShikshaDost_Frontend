import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { updateMentorSkills } from "@/services/api";

const MentorSkills = () => {
  const { user, updateUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [skills, setSkills] = useState(user?.skills || []);
  console.log('skills',skills);
  const [newSkills, setNewSkills] = useState(skills.join(", ")); // Comma-separated skills string

  useEffect(() => {
    // Update skills and newSkills when user changes or dialog closes
    setSkills(user?.skills || []);
    setNewSkills((user?.skills || []).join(", "));
  }, [user, isOpen]);

  // Mutation for updating skills
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    updateMentorSkills,
    {
      onSuccess: (data) => {
        console.log("Skills updated:", data);
        updateUser({ skills: data.data.skills });
        // Update local skills state with the response
        setIsOpen(false); // Close the dialog
      },
      onError: (error) => {
        console.error("Error updating skills:", error);
      },
    }
  );

  // Handle form submission
  const handleEditSkills = () => {
    const skillsArray = newSkills.split(",").map((skill) => skill.trim());
    mutate({ mentorId: user?._id, skills: skillsArray });
  };
  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Skills</h2>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit Skills
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-black">
                <DialogHeader>
                  <DialogTitle>Edit Skills</DialogTitle>
                </DialogHeader>

                <textarea
                  className="w-full p-2 border rounded"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  placeholder="Enter skills separated by commas"
                  rows={5}
                ></textarea>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditSkills} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                </div>
                {isError && (
                  <p className="mt-2 text-sm text-red-500">
                    Error updating skills. Please try again.
                  </p>
                )}
                {isSuccess && (
                  <p className="mt-2 text-sm text-green-500">
                    Skills updated successfully.
                  </p>
                )}
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills?.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MentorSkills;
