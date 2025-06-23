"use client";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { UploadImage } from "@/actions/profile-update";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfileUpload() {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [isPending, startTransition] = useTransition();
  const { data, update } = useSession();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    startTransition(async () => {
      const res = await fetch("/api/upload/profile", {
        method: "POST",
        body: formData,
      });

      const response = await res.json();
      const { url } = response;
       const email: any = data?.user?.email;
      const reso = await UploadImage(email, url);
      if (reso.success) {
       // Forces jwt to run again
       await update({image:url})
        router.push('/');
      } else {
        console.log(response.message);
      }
    });
  };

  return (
    <div className="border px-2 py-1 border-zinc-700 rounded-md flex flex-col items-center gap-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <Image src={preview} alt="Preview" width={100} height={100} className="w-20 h-20 object-cover rounded-full" />
      )}
      <Button disabled={isPending} onClick={uploadImage}>
        {isPending ? "Uploading" : "Upload"}
      </Button>
    </div>
  );
}
