import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchUserMentorships,
  updateStudentProfileImage,
} from "@/services/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getSignedUrl } from "@/utils/GetSignedUrl";
import axios from "axios";
import { toast } from "sonner";
import compressImage from "@/utils/compressor";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { format } from "date-fns";
const StudentProfile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [filter, setFilter] = useState("upcoming");
  const BUCKET_NAME = "shikshadost-studymaterial";
  const REGION = "ap-south-1";
  // console.log(user);

  const {
    data: userMentorships = [],
    isLoading,
    isError,
    refetch,
    // setData: setArticles, // Allows updating the data directly
  } = useQuery(["userMentorships"], fetchUserMentorships);

  console.log(userMentorships);
  const filteredData = userMentorships
    .filter((item) =>
      filter === "completed" ? item.isCompleted : !item.isCompleted
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  useEffect(() => {
    if (!user) {
      navigate("/register");
      return;
    }
  }, [user, navigate]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const replaceSpacesInPath = (path) => {
    return path.replace(/\s+/g, "+");
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    // console.log(selectedFile.name, selectedFile.type);
    try {
      setIsUploading(true);
      const compressedImage = await compressImage(selectedFile);
      console.log("Original File Size:", selectedFile.size / 1024, "KB");
      console.log("Compressed File Size:", compressedImage.size / 1024, "KB");

      const { signedUrl, path } = await getSignedUrl(
        compressedImage.name,
        compressedImage.type,
        "users"
      );
      console.log("Signed URL:", signedUrl);
      const sanitizedPath = replaceSpacesInPath(path);
      // console.log(signedUrl);
      await axios.put(signedUrl, compressedImage, {
        headers: {
          "Content-Type": compressedImage.type,
        },
      });
      const s3Url = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${sanitizedPath}`;
      console.log(s3Url);
      mutation.mutate({ userId: user?.id, profile_image: s3Url });
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      setIsOpen(false);
    }
  };

  const mutation = useMutation(updateStudentProfileImage, {
    onSuccess: (data) => {
      // console.log('data',data);
      updateUser({ profile_imageURL: data.data.profile_imageURL });
      toast("image updated successfully");
    },
    onError: (error) => {
      console.error(error);
      alert("Failed to update image. Please try again.");
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-1 sm:p-4 space-y-6">
      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle>Student Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture Section */}
          <div className="relative group">
            <div className="flex flex-col items-center">
              <label className="text-sm text-gray-500 mb-2">
                Profile Picture
              </label>
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={user?.profile_imageURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full p-2"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white text-black">
                    <DialogHeader>
                      <DialogTitle>Upload Profile Picture</DialogTitle>
                    </DialogHeader>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mt-4"
                    />
                    <div className="flex justify-end mt-4">
                      <Button
                        onClick={handleUpload}
                        disabled={!selectedFile || isUploading}
                      >
                        {isUploading ? "Uploading..." : "Upload"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Name Section */}
          <div className=" group">
            <label className="text-sm text-gray-500">Name</label>
            <div className="flex items-center justify-between mt-1 p-3 border rounded-lg">
              <span className="text-lg">{user?.name}</span>
            </div>
          </div>

          {/* Email Section */}
          <div className=" group">
            <label className="text-sm text-gray-500">Email</label>
            <div className="flex items-center justify-between mt-1 p-3 border rounded-lg">
              <span className="text-lg">{user?.email}</span>
              {/* <Pencil className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" /> */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Saved Articles Section */}
      <section className=" saved-blog-section border rounded-lg shadow-lg p-4">
        <h1 className="text-xl font-bold">Saved Articles</h1>
        {!user?.savedBlogs?.length ? (
          <h2> No saved articles found</h2>
        ) : (
          <div className="flex justify-center ">
            <Carousel className="p-4 w-full max-w-2xl">
              <CarouselContent>
                {user?.savedBlogs.map((article, index) => (
                  <CarouselItem
                    key={article.blogId.id}
                    className="  rounded-lg hover:bg-gray-50 transition-colors space-y-3"
                  >
                    <div className="">
                      <Link to={`/articles/${article.blogId.slug}`}>
                        <img
                          className="rounded-lg"
                          src={article.blogId.cover_image}
                          alt={article.blogId.title}
                        />
                      </Link>
                    </div>
                    <div className="">
                      <div className="mb-2">
                        <h1 className="text-xl font-bold">
                          {article.blogId.title}
                        </h1>
                        <p>{article.blogId.desc}</p>
                      </div>

                      <div className="flex items-center gap-x-2">
                        <Avatar>
                          <AvatarImage
                            src={article.blogId.author.profile_imageURL}
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>{article.blogId.author.name}</span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </section>

      <section className="max-w-4xl mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Your Booked Mentorships</h2>

      {/* Filter Toggle */}
      <ToggleGroup
        type="single"
        className="flex justify-right gap-2 mb-6"
        value={filter}
        onValueChange={(value) => value && setFilter(value)}
      >
        <ToggleGroupItem value="upcoming" className="px-4 py-2" variant="outline">
          Upcoming
        </ToggleGroupItem>
        <ToggleGroupItem value="completed" className="px-4 py-2" variant="outline">
          Completed
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        {filteredData.length > 0 ? (
          filteredData.map((mentorship) => (
            <Card key={mentorship?._id} className="p-4 flex items-center gap-4">
              <img
                src={mentorship?.mentor.profile_imageURL}
                alt={mentorship?.mentor.name}
                className="w-12 h-12 rounded-full"
              />
              <CardContent className="flex flex-col gap-1">
                <h3 className="font-semibold text-lg">{mentorship?.mentor.name}</h3>
                <p className="text-gray-600">
                  {format(new Date(mentorship?.schedule.on), "MMMM dd, yyyy")}
                </p>
                <p className="text-sm text-gray-500">{mentorship?.schedule.start}-{mentorship?.schedule.end}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No {filter} mentorships found.</p>
        )}
      </div>
    </section>
    </div>
  );
};

export default StudentProfile;
