import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { connectToDB } from "@utils/database";
import User from "@models/user";
const handel = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET  
})
    ]
    ,
   callbacks:{ async session({ session}){
   
    const sessionUser = await User.findOne({ email: session.user.email });
session.user.id = sessionUser._id.toString();
return session
}, async signIn({ profile}){
    console.log(profile);
   
try {
await connectToDB();
// if user already exist in database

const userExists = await User.findOne({email:profile.email});
if(userExists){
    return userExists;
}

// if user not added to database
if (!userExists) {
    await User.create({
      email: profile.email,
      username: profile.name.replace(" ", "").toLowerCase(),
      image: profile.picture,
    });
  }

} catch (error) {
console.log(error); 
}
}}
   

}
);
export {handel as GET,handel as POST}