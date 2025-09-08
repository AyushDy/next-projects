"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCurrentUser, useUpdateProfileImage } from "@/lib/hooks/useUser";
import { toast } from "sonner";
import { Upload, Camera } from "lucide-react";
import { Spinner } from "../ui/LoadingSpinner";

const UpdateProfileImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateImageMutation = useUpdateProfileImage();
  const { data: user, isPending } = useCurrentUser();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    try {
      const res = await updateImageMutation.mutateAsync(selectedFile);
      if (res && res.success) {
        toast.success("Profile image updated successfully!");

        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast.error("Failed to update profile image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile image"
      );
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const currentImageSrc = previewUrl || user?.image;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col space-y-5 mb-10">
      <h1 className="text-xl font-semibold">Profile Image</h1>

      <div className="flex flex-col items-start space-y-4">
        <div
          className="relative group cursor-pointer"
          onClick={handleImageClick}
        >
          {currentImageSrc ? (
            <Image
              src={currentImageSrc}
              alt="Profile Image"
              className="rounded-full object-cover border-4 border-muted transition-all duration-200 group-hover:border-primary"
              width={120}
              height={120}
            />
          ) : isPending ? (
            <div className="w-[120px] h-[120px] rounded-full bg-muted flex items-center justify-center border-4 border-muted transition-all duration-200 group-hover:border-primary">
              <Spinner size="md" />
            </div>
          ) : (
            <div className="w-[120px] h-[120px] rounded-full bg-muted flex items-center justify-center border-4 border-muted-foreground/20 transition-all duration-200 group-hover:border-primary">
              <Camera className="w-8 h-8 text-muted-foreground" />
            </div>
          )}

          <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="text-white text-center">
              <Upload className="w-6 h-6 mx-auto mb-1" />
              <p className="text-xs font-medium">Change Photo</p>
            </div>
          </div>

          {selectedFile && (
            <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
              <Upload className="w-4 h-4" />
            </div>
          )}
        </div>

        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {selectedFile && (
          <div className="flex space-x-3">
            <Button
              onClick={handleUpload}
              disabled={updateImageMutation.isPending}
              size="sm"
              className="min-w-[100px]"
            >
              {updateImageMutation.isPending ? "Uploading..." : "Save Photo"}
            </Button>

            <Button
              onClick={handleCancel}
              variant="outline"
              size="sm"
              className="min-w-[80px]"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfileImage;
