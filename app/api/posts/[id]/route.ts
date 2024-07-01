import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function GET(request:Request,
    {params}:{params:{id:string}}
){
    const postId = Number(params.id)
    const post = await prisma.post.findUnique({
        where:{
            id:postId
        },
        include:{
            comment:true
        }
    })
    return Response.json(post)

}

export async function PUT(request:Request,
    {params}:{params:{id:string}}
){
    const {title,content} = await request.json()
    const postId = Number(params.id)
    const updatePost = await prisma.post.update({
        where:{
            id:postId
        },
        data:{
            title,
            content
        }
    })
    return Response.json(updatePost)

}

export async function DELETE(request:Request,
    {params}:{params:{id:string}}
){
    
    const postId = Number(params.id)
    const deletePost = await prisma.post.delete({
        where:{
            id:postId
        }
    })
    return Response.json({
        message:'delete post'
    })

}