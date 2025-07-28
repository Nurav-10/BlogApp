"use client";
import CommentSection from "@/components/commentSection";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { date } from "@/utils/date";
import { ArrowBigUpDash, Navigation2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface Data {
  title: string;
  description: string;
  content: string;
  author: { username: string; email: string };
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

const Page = () => {
  const router = useRouter();
  const session = useSession();
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<Data | null>(null);
  const [modal, setModal] = useState(false);
  const [owner, setOwner] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [edit, setEdit] = useState(false);
  const [vote, setVotes] = useState(0);
  const [voted, setVoted] = useState(false);
  const [voteId,setVoteId]=useState('')
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);

        const res = await response.json();
        if (res.success && res.data) {
          router.push(`/blogs/${res.data._id}`);
          setData(res.data);
          setNewTitle(res.data.title);
          setNewDescription(res.data.description);
          setNewContent(res.data.content);

          if (session?.data?.user?.email === res.data.author.email)
            setOwner(true);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("Error while fetching the details");
      }
    };
    fetchDetails();

    (async () => {
      try {
        const response = await fetch(`/api/posts/${id}/upvotes/countUpvote`, {
          method: "GET",
        });
        const res = await response.json();
           setVotes(res.data.length);
           
       if(res.data.filter((i:any)=>(i.userId))[0]){
        setVoteId(res.data.filter((i:any)=>(i.userId))[0]._id)
         setVoted(true)
        }
      else
      setVoted(false)
      
        
      } catch (err) {
        toast.message("Error while getting votes");
      }
    })();
   
 
    
  }, [id, refresh,session.data?.user?.email]);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newContent, setNewContent] = useState("");


   const increaseUpvote = () => 
    {
      const createUpvote=async()=>{
        try{
        await fetch(`/api/posts/${id}/upvotes/createUpvote`,
          {
            method:"POST",
            body:JSON.stringify({postId:id,userId:session.data?.user?.id})
          }
        )
        setVotes(prev=>prev+1)
        setVoted(true)
        setRefresh(prev=>!prev)
      }
      catch(err){
        toast.error("Problem while upvoting")
      }
      }
      createUpvote()
    }
  
  

  const decreaseUpvote=()=>{
      const deleteUpvote=async()=>{
        try{
        const response=await fetch(`/api/posts/${id}/upvotes/delUpvote`,
          {
            method:"DELETE",
            body:JSON.stringify({id:voteId,postId:id,userId:session.data?.user?.id})
          }
        )
        const res=await response.json()
        if(res.success){
        setVotes(prev=>prev-1)
        setVoted(false)
        setRefresh(prev=>!prev)
        }
      }
      catch(err){
        console.log("Problem while removing upvote")
      }
      }
      deleteUpvote()
    }


  const handleEditForm = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const res = await fetch(`/api/posts/edit/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newTitle,
            description: newDescription,
            content: newContent,
          }),
        });
        const response = await res.json();

        if (response.success) {
          toast.success("Post Updated Successfully");
          setRefresh((prev) => !prev);
          setEdit(false);
        } else {
          toast.error("Post Cannot Updated Successfully");
        }
      } catch (error) {
        toast.error("post can't updated");
      }
    });
  };
  const deletePost = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/del/${id}`);
      const res = await response.json();

      if (res.success) {
        toast.success("Post Deleted Successfully");
        router.push("/blogs");
      } else {
        toast.error("Post deletion failed");
      }
    } catch (error) {
      toast.error("Problem while deleting the post");
    }
  };

  
  if (!data)
    return <h2 className="text-zinc-500 text-xl p-3 ">Loading Post...</h2>;
  return (
    <>
      <Header />
      <div
        className={`p-5 flex flex-col gap-5 z-0 ${
          modal && "bg-black/30 blur-[3px]"
        } ${edit && "blur-[2px]"}
        `}
      >
        <button
          className="-rotate-90 absolute top-11"
          onClick={() => router.back()}
        >
          <Navigation2 fill="pink" />
        </button>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl underline underline-offset-3">{data.title}</h2>
          <h2 className="text-sm text-zinc-500 flex gap-3 items-center">
            {" "}
            <span className="text-md dark:text-zinc-50">
              Created By {data.author.username}
            </span>
            <span>{date(data.createdAt)}</span>
          </h2>
          {data.updatedAt > data.createdAt && (
            <span className="text-sm text-zinc-500">
              Updated At {date(data.updatedAt)}
            </span>
          )}
        </div>
        <p>{data.description}</p>
        <p>{data.content}</p>
        <button
        disabled={!session.data?.user?.email}
          className={`flex flex-row w-fit gap-2 items-center px-3 py-1 rounded-md border hover:border-blue-400 hover:text-blue-400 ${
            voted && "border-blue-400 text-blue-400 transition  duration-200"
          }`}
          onClick={() => {
            voted?decreaseUpvote():increaseUpvote() 
          }}
        >
          <ArrowBigUpDash className="hover:fill-blue-500" size={20} />
          <span>{vote} Upvote</span>
        </button>
        {!session.data?.user?.email && <h2 className="w-fit px-2 bg-zinc-900/20 hover:text-blue-500 border rounded-md cursor-pointer" onClick={()=>router.push('/login')}>SignIn to Upvote</h2>}
        {session.data?.user?.email === data.author.email && (
          <div className="flex flex-row gap-2">
            <button
              className={` bg-red-500 w-30 hover:bg-red-700 rounded-md px-3 py-1 border-1 mr-3 text-white border-white`}
              onClick={() => setModal((pre) => !pre)}
            >
              Delete Post
            </button>
            <button
              className="dark:bg-white bg-zinc-900 w-30 text-white dark:text-black hover:bg-orange-200 hover:text-black rounded-md px-3 py-1"
              onClick={() => setEdit((prev) => !prev)}
            >
              Edit Post
            </button>
          </div>
        )}
      </div>
      <div>
        {modal && (
          <div className="dialog font-semibold bg-zinc-900 px-5 py-3 z-90 flex flex-col gap-3 rounded-md border-1 border-white  top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 fixed text-white">
            <h2>Please confirm that you want to delete this blog post?</h2>
            <div className="flex gap-3">
              <button
                className="bg-red-500 px-3 py-1 text-white rounded-md"
                onClick={() => deletePost(data._id)}
              >
                Confirm
              </button>
              <button
                className="bg-white px-3 py-1 text-black rounded-md"
                onClick={() => setModal((pre) => !pre)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Edit Page.. */}
        {edit && (
          <div className="absolute top-[50%]  left-[50%] -translate-x-[50%] -translate-y-[50%] w-[50vh] sm:w-[80vh] h-[80vh] bg-zinc-900/95 rounded-md p-5 overflow-y-scroll text-white">
            <form onSubmit={handleEditForm} className=" flex flex-col gap-5">
              <CardTitle className="text-lg flex justify-between">
                <h2>Post Edit Preview</h2>
                <X
                  className="hover:text-red-500 scale-105 transition-all duration-300"
                  onClick={() => setEdit(false)}
                />
              </CardTitle>
              <div className=" flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <Textarea
                  id="title"
                  name="title"
                  value={newTitle}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                  }}
                  className="text-wrap block"
                />
                <div className=" flex flex-col gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="px-3 py-1 bg-white text-black rounded-md hover:bg-zinc-400"
                >
                  {isPending ? "Updating Post..." : "Update Post"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {session.status === "loading" ? (
          <h2>Loading Comments</h2>
        ) : (
          <CommentSection postId={data._id} />
        )}
      </div>
    </>
  );
};

export default Page;
