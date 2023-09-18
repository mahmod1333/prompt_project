import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export const GET = async (req,{params}) => {
 
    try {
      await connectToDB();
   const prompt = await Prompt.findById(params.id).populate('creator');
   if(!prompt)return new Response("prompt not found",{status: 404}) 
   return new Response(JSON.stringify(prompts),{status: 200});
   
    } catch (error) {
      return new Response("failed to fetch all prmpts",{status: 500});
    }
}
//PATCH Update

export const PATCH = async (req,{params}) => {
    const {prompt,tag} = await req.json();
    try {
      await connectToDB();
   const exsistingPrompt = await Prompt.findById(params.id);
   if(!exsistingPrompt)return new Response("prompt not found",{status: 404})
   exsistingPrompt.prompt= prompt
   exsistingPrompt.tag= tag
 await exsistingPrompt.save();
   return new Response(JSON.stringify(exsistingPrompt),{status: 200});
   
    } catch (error) {
      return new Response("failed to update prompt",{status: 500});
    }
}

//DELETE Delete

export const DELETE = async (req,{params}) => {
 
    try {
      await connectToDB();
   const exsistingPrompt = await Prompt.findById(params.id);
   if(!exsistingPrompt)return new Response("prompt not found",{status: 404}) 
   await Prompt.findByIdAndRemove(params.id);

   return new Response(JSON.stringify(exsistingPrompt  ),{status: 200});
   
    } catch (error) {
      return new Response("failed to delete prompt",{status: 500});
    }
}