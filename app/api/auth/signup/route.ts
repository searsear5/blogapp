import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request:Request) {
    try {
        const {name,email,password} = await request.json()
        const hashPassword = bcrypt.hashSync(String(password),10)
        const newUser = await prisma.user.create({
            data:{
                name,
                email,
                password: hashPassword
            }
        })
        return Response.json({
            message: 'create user success',
            data:{
                newUser
            }
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            error:error
        },{status: 500})
    }
}