import { authOption } from "@/app/utils/authOption";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
const prisma = new PrismaClient()

export async function POST(request:Request) {
    //const {title,content,cate} = await request.json()
    const {comment,postId} = await request.json()
    const data = await getServerSession(authOption)
    const email = String(data?.user?.email)
    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    const post = await prisma.category.findUnique({
        where:{
            id:postId
        }
    })
    try {
        if (user) {
            const userID = user.userId
            if (post) {
                const newcomment = await prisma.comment.create({
                    data:{
                        comment,
                        userID:userID,
                        postID:post.id
    
                    }
                })
                return Response.json(newcomment)
            }
    
        }
        
    } catch (error) {
        return Response.json(error)
    }
    
    
}