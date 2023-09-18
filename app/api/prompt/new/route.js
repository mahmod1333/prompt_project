// create route for adding a new prompt in next js 
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export const POST = async (req) => {

    const {userId, prompt,tag } = await req.json();
    try {
      console.log("h0");
      await connectToDB();
      const newPrompt = new Prompt({
        creator:userId,
        prompt,
        tag
      });
      await newPrompt.save();
      console.log("h1");
      return new Response(JSON.stringify(newPrompt),{status: 201});
    } catch (error) {
        return new Response("failed to create a new prompt",{status: 500});
        
    }
  };
 
