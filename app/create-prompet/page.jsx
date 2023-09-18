'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Form from "@Components/Form"
const CreatePrompet = () => {
    const router = useRouter()
    const{data:session}= useSession()
const [Submitting, setSubmitting] = useState(false)
const [post, setPost] = useState({
    prompt:'',
    tag:'',
});
const createPrompt = async (e)=>{
e.preventDefault();
setSubmitting(true);
console.log(JSON.stringify(post.prompt))
try {
    // create a new prompt
    const res = await fetch('/api/prompt/new ', {
        method: 'POST',
        body: JSON.stringify({
            prompt: post.prompt,
            userId: session?.user.id,
            tag: post.tag
        })
    });
    if(res.ok) {
        router.push('/');
    }

   
     
} catch (error) {
    console.log(error)
    
}finally{
    setSubmitting(false);  

}
}
  return (
    <Form 
    type='create'
    post={post}
    setPost={setPost}
    Submitting={Submitting}
    handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompet