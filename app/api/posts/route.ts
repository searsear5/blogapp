import { authOption } from "@/app/utils/authOption";
import { PrismaClient } from "@prisma/client";
import { Session } from "inspector";
import { getServerSession } from "next-auth";
const prisma = new PrismaClient()

export async function GET(){
    const allpost = await prisma.post.findMany({
        include:{
            comment: true
        }
    })
    return Response.json(
        allpost
    )
}

export async function POST(req:Request){
    const {title,content,cate} = await req.json()
    const data = await getServerSession(authOption)
    const email = String(data?.user?.email)
    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    const category = await prisma.category.findUnique({
        where:{
            name:cate
        }
    })
    try {
        if (user) {
            const userID = user.userId
            if (category) {
                const newPost = await prisma.post.create({
                    data:{
                        title,
                        content,
                        catagoryname:cate,
                        userID
    
                    }
                })
                return Response.json(newPost)
            }
    
        }
        
    } catch (error) {
        return Response.json(error)
    }
    
    
    
}