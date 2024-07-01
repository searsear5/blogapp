import {authOption} from '@/app/utils/authOption'
import NextAuth from "next-auth/next"


const handler = NextAuth(authOption) as any

export { handler as GET, handler as POST }