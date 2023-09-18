'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@Components/profile'

const MyProfile = () => {
  const [edit, setEdit] = useState()
  const { data: session } = useSession();
  const [posts, setPosts] = useState();
  const router = useRouter();
  useEffect(() => {
    console.log(session)
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
      console.log(data)
    }
    if (session?.user.id) { fetchPosts(); }


  }, [])

  const handleEdit = async (repost) => {
    console.log(repost)

    try {
     
      // create a new prompt
      const res = await fetch(`/api/prompt/${repost._id}` , {
          method: 'PATCH',
          body: JSON.stringify({
              prompt: repost.prompt,
              tag: repost.tag
          })
      });
    if(res.ok) {
       
      }  
      const update = posts.map(items => 
        repost._id === items._id 
        ?  {...items,prompt:repost.prompt,tag:repost.tag}:
        items

        );
        setPosts(update)
     
       
  } catch (error) {
      alert('Error: ' + error.message)
      
  }

  }
  const handleDelete = async (post) => {
    console.log('Delete')
const hasconfirmed = confirm("are you sure you want to delete this");
if(hasconfirmed) {
  try{
    await fetch(`/api/prompt/${post._id.toString()}`, {method:'DELETE'})
    const felterdPosts = posts.filter((p)=> p._id !== post._id);
    setPosts(felterdPosts);
  } catch (err) {
    console.log(err);
  }
  }
}
  return (
    <>
      {posts ?

        <Profile
          name='My'
          desc="welcometo your profile page"
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          edit={edit}
          setEdit={setEdit}
        /> : console.log(session)
      }
    </>
  )
}

export default MyProfile