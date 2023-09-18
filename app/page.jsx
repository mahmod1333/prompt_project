import Feed from "@Components/Feed"
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
<h1 className="head_text text-center">
    Descoverd and share
    <br className="max-md:hidden"/>
    <span className="orange_gradient text-center">
        AI powerd prompets 
    </span>
</h1>
<p className="desc text-center">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
</p>


<Feed/>
    </section>
  )
}

export default Home