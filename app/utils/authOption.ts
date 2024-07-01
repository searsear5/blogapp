import NextAuth, { ISODateString, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { JWT } from "next-auth/jwt"
import nextAuth, { NextAuthOptions } from 'next-auth'
import { Adapter, AdapterUser } from "next-auth/adapters"

import { NextApiRequest, NextApiResponse } from 'next';







export interface DefaultSession {
    user?: {
        name?: string | null
        email?: string | null
        image?: string | null
        id?: string | null
    }
    expires: ISODateString
}

interface Session {
    user: {
        /** The user's id */
        id: string;
    } & DefaultSession["user"];
}


interface CustomSession extends Session { // Define custom session type
    customData?: any; // Add custom properties if needed
}


const prisma = new PrismaClient()

export const authOption: NextAuthOptions = {
    providers: [
        CredentialsProvider({

            name: 'credentials',

            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'sear@gmail.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any, req): Promise<any> {
                if (!credentials) { return null }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                })

                if (user && (await bcrypt.compare(credentials.password, user.password))
                ) {
                    console.log("log user", user)
                    return user





                } else {
                    throw new Error('invalid email or password')
                }

            }



        })

    ],
    adapter: PrismaAdapter(prisma) as Adapter,
    session: {
        strategy: 'jwt',
        //jwt: true,
    },
    callbacks: {
        session: async ({ session, token, user }: { session: CustomSession, token: any, user: any }) => {

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin"
    }

} as any