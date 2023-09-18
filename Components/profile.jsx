
import PromptCard from './prompetCard'
const Profile = ({ name, desc, data, handleEdit, handleDelete, edit, setEdit}) => {

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {name} Profile
        </span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post,index) => {
         
          return <PromptCard
            key={post._id}
            post={post}
            index={index}
            handleEdit= {handleEdit}
            handleDelete={handleDelete}
            edit={edit}
            setEdit={setEdit}
        
          />
        })}
      </div>
    </section>
  )
}

export default Profile