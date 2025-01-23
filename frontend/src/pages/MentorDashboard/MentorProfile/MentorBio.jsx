import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const MentorBio = () => {
  const { user, updateUser } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const mentorId = user?._id;

  const mutation = useMutation(updateProfile, {
    onSuccess: (data) => {
        
      updateUser({name:data.data.name,bio:data.data.bio}); // Update user in context
      setIsDialogOpen(false);
      console.log("Profile updated successfully");
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });

  // Handle Submit
  const handleSubmit = () => {
    mutation.mutate({ name, bio, mentorId }); // Send name and bio to API
  };
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">{user?.name}</h1>
        <Dialog
          
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        >
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Pencil className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your name and bio below:
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setIsDialogOpen(false)}
                disabled={mutation.isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <p className="text-gray-600">{user?.bio}</p>
    </>
  );
};

export default MentorBio;
