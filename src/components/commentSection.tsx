"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Card, CardHeader } from "./ui/card";
import { toast } from "sonner";
import Image from "next/image";
import { url } from "inspector";
import {
  ArrowDown,
  Delete,
  DeleteIcon,
  LucideDelete,
  ThumbsDown,
  ThumbsUp,
  Trash,
  Trash2,
  TrashIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { timeAgo } from "@/utils/date";
import Link from "next/link";

// const fakeComments = [
//   {
//     profilePic:
//       "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     id: 1,
//     author: {
//       username: "@Varun",
//       id: "21",
//     },
//     content: "Hello there this is first comment of my blog webapp",
//     replies: [
//       {
//         profilePic:
//           "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         author: {
//           username: "Shivam",
//           id: "87",
//         },
//         content: "this is 1 nested comment",
//       },
//     ],
//   },
//   {
//     id: 2,
//     profilePic:
//       "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     author: {
//       username: "@Himanshi",
//       id: "54",
//     },
//     content: "Hello there this is second comment of my blog webapp",
//     replies: [
//       {
//         profilePic:
//           "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         author: {
//           username: "@Nurav",
//           id: "45",
//         },
//         content: "this is 2nd nested comment",
//       },
//       {
//         profilePic:
//           "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         author: {
//           name: "@Alex",
//           id: "14",
//         },
//         content: "this is 3rd nested comment",
//       },
//     ],
//   },
//   {
//     id: 3,
//     profilePic:
//       "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     author: {
//       username: "@ravi",
//       id: "78",
//     },
//     content: "Hello there this is third comment of my blog webapp",
//     replies: [
//       {
//         profilePic:
//           "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         author: {
//           username: "@Juiki",
//           id: "68",
//         },
//         content: "this is 2nd nested comment of third comment",
//       },
//       {
//         profilePic:
//           "https://plus.unsplash.com/premium_photo-1673866484792-c5a36a6c025e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         author: {
//           username: "@Naruro",
//           id: "73",
//         },
//         content: "this is 3rd nested comment of 3rd comment",
//       },
//     ],
//   },
// ];
interface Author {
  _id: string;
  username: string;
  profilePicture: string;
}
interface Comment {
  _id: string;
  author: Author;
  content: string;
  replies: Comment[];
  createdAt: string;
}
const CommentSection = ({ postId }: { postId: string }) => {
  const session = useSession();
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const [isPending,startTransition]=useTransition()
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [repliesOpen, setRepliesOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [activeReplyIdsIndex, setActiveReplyIdsIndex] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [commentReply, setCommentReply] = useState("");
  const [reloadComment, setReloadComment] = useState(false);
  useEffect(() => {
    //iife
    try {
      (async () => {
        //logic to get comments.
        const response = await fetch(`/api/posts/${postId}/comment`);

        const res = await response.json();

        if (res.data) {
          setComments(res.data);
          setLoading(false);
        } else if (res.status && res.data.length === 0) {
          setMessage(res.message);
        }
      })();
    } catch (err: any) {
      console.log(err.message);
    }
  }, [postId, reloadComment, refresh]);
  const toggleReply = (id: string) => {
    //if already opened. filter it out. if not then open it

    if (activeReplyIdsIndex.includes(id))
      setActiveReplyIdsIndex(activeReplyIdsIndex.filter((i) => i !== id));
    else setActiveReplyIdsIndex([...activeReplyIdsIndex, id]);
  };
  const deleteComment = async (commentId: string) => {
    try {
      const res = await fetch(
        `/api/posts/${postId}/comment/${commentId}/delete`,
        {
          method: "DELETE",
        }
      );

      const response = await res.json();
      if (response.success) {
        toast.success("Comment Deleted Successfully");
        setReloadComment((prev) => !prev);
      } else toast.error("Problem while deleting the comment");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const createComment = async () => {
    
      startTransition(async()=>{
        try {
      const res = await fetch(`/api/posts/${postId}/comment/create`, {
        method: "POST",
        body: JSON.stringify({
          content: content,
          author: session.data?.user?.id?.toString(),
          id: postId,
        }),
      });
      const response = await res.json();

      if (response.success) {
        toast.success("Comment Posted");
        setReloadComment((prev) => !prev);
        setContent("");
      } else {
        toast.error("Comment not posted");
      }
     } catch (err: any) {
      console.log(err.message);
    }
  })
  };
  const createReply = async (parentCommentId: string) => {
    if (commentReply.length < 1)
      return toast.success("Reply can be of atleast 1 character");
    startTransition(async()=>{

      try {
        const response = await fetch(`/api/posts/${postId}/comment/reply`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: commentReply,
            author: session.data?.user?.id?.toString(),
            parentId: parentCommentId,
          }),
        });
  
        const res = await response.json();
        if (res.reply) {
          setRefresh((prev) => !prev);
        } else {
          console.log(res.message);
        }
      } catch (err: any) {
        console.log(err.message);
      }
    })
  };

  const deleteReply = async (commentId: string) => {
    const response = await fetch(
      `/api/posts/${postId}/comment/${commentId}/replyDelete`,
      {
        method: "DELETE",
      }
    );
    const res = await response.json();

    if (res.success) {
      setReloadComment((prev) => !prev);
      setRefresh(prev=>!prev)
      toast.success(res.message);
    } else toast.error(res.message);
  };

  loading && session.status === "loading" && <h2>Loading</h2>;
  return (
    <>
      <div className="px-10 flex gap-3 flex-col pb-5">
        <Card className="w-fit px-5 py-1">
          <div className="text-xl">Comment Section</div>
        </Card>
        {comments.length === 0 && (
          <h2 className="text-lg ml-1">Be the first to Comment</h2>
        )}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await createComment();
            setContent("");
          }}
          className="flex flex-col gap-1 w-fit"
        >
          <Input
            title="commentInput"
            placeholder="Write Your Comment"
            name="commentInput"
            value={content}
            disabled={session.status === "unauthenticated"}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="text-zinc-700"
          />
          {session.status === "unauthenticated" && (
            <Link href="/login" className="hover:text-blue-400 text-sm">
              You need to Signin for commenting
            </Link>
          )}
          <Button type="submit" disabled={isPending} className="mt-2 w-30">
          {isPending?'Commenting':'Comment'}
          </Button>
        </form>
        {comments.length !== 0 && (
          <div className="flex flex-col gap-5 py-3 rounded-md border-zinc-300 border px-5">
            {comments.map((c) => {
              return (
                <div key={c._id} className="flex flex-row gap-2">
                  <div>
                    {/* user image */}
                    <Image
                      src={c.author.profilePicture}
                      width={100}
                      height={100}
                      alt="profilePic"
                      className="w-8 h-8 rounded-full object-cover mt-1"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-zinc-500 flex gap-2 items-center">
                      <h2>{c.author?.username}</h2>
                      <h2>{timeAgo(c.createdAt)}</h2>
                      {session.data?.user?.id === c.author._id && (
                        <TrashIcon
                          size={15}
                          className="hover:fill-red-500 dark:text-white mt-1 text-zinc-800"
                          onClick={() => deleteComment(c._id)}
                          aria-disabled={true}
                        />
                      )}
                    </div>
                    <h2 className="dark:text-white text-md ml-2">
                      {c.content}
                    </h2>

                    <div className="flex gap-2 items-center ml-2">
                      <motion.span
                        whileTap={{
                          x: -10,
                          y: -10,
                          rotate: -60,
                          transition: { ease: "linear" },
                        }}
                      >
                        <ThumbsUp size={16} className="hover:fill-blue-400" />
                      </motion.span>

                      <motion.span
                        whileTap={{
                          x: 10,
                          y: 10,
                          rotate: -60,
                          transition: { ease: "linear" },
                        }}
                      >
                        <ThumbsDown size={16} className="hover:fill-red-400" />
                      </motion.span>
                    </div>

                    <div
                      className="flex items-center gap-1 hover:text-blue-600 cursor-pointer rounded-md w-fit mt-2"
                      onClick={() => toggleReply(c._id)}
                    >
                      <ArrowDown
                        size={14}
                        className={`${
                          repliesOpen ? "" : "-rotate-90"
                        } transition-all duration-300 `}
                      />
                      <span>{c.replies.length}</span>
                      <h2>Replies</h2>
                    </div>
                    {activeReplyIdsIndex.includes(c._id) && (
                      <div className="flex flex-col gap-3 border rounded-md pr-6 pl-2 py-2 border-zinc-500">
                        {c.replies.map((r, index) => {
                          return (
                            <div
                              key={index}
                              className="flex flex-row gap-2 ml-1"
                            >
                              <div>
                                {/* user image */}
                                <Image
                                  src={r.author.profilePicture}
                                  width={100}
                                  height={100}
                                  alt="profilePic"
                                  className="w-8 h-8 rounded-full object-cover mt-1"
                                />
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-sm text-zinc-500 flex gap-2 items-center">
                                  <h2>{r.author?.username}</h2>
                                  <h2>{timeAgo(r.createdAt)}</h2>
                                  {session.data?.user?.id === r.author._id && (
                                    <TrashIcon
                                      size={15}
                                      className="hover:fill-red-500 dark:text-white mt-1 text-zinc-800"
                                      onClick={() => deleteReply(r._id)}
                                      aria-disabled={true}
                                    />
                                  )}
                                </div>
                                <h2 className="dark:text-white text-md ml-2">
                                  {r.content}
                                </h2>

                                <div className="flex gap-2 items-center ml-2 mt-1">
                                  <motion.span
                                    whileTap={{
                                      x: -10,
                                      y: -10,
                                      rotate: -60,
                                      transition: { ease: "linear" },
                                    }}
                                  >
                                    <ThumbsUp
                                      size={16}
                                      className="hover:fill-blue-400"
                                    />
                                  </motion.span>

                                  <motion.span
                                    whileTap={{
                                      x: 10,
                                      y: 10,
                                      rotate: -60,
                                      transition: { ease: "linear" },
                                    }}
                                  >
                                    <ThumbsDown
                                      size={16}
                                      className="hover:fill-red-400"
                                    />
                                  </motion.span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div className="mx-auto mt-1">
                          <form
                            onSubmit={async (e) => {
                              e.preventDefault();
                              await createReply(c._id);
                              setCommentReply("");
                            }}
                          >
                            <Input
                              name="replyInput"
                              title="replyInput"
                              placeholder="Reply Here"
                              className="mt-1 mb-2"
                              disabled={session.status === "unauthenticated"}
                              value={commentReply}
                              onChange={(e) => setCommentReply(e.target.value)}
                            />
                            <Button type="submit" disabled={isPending}>
                              {isPending?'Replying':'Reply'}
                              </Button>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default CommentSection;
