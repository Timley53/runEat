import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
        clientId: "1013214539550-p9plva8jsaiik91bskgq9oauc8dsr6ub.apps.googleusercontent.com",
        clientSecret: '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'
    
    })
  ]
})

export { handler as GET, handler as POST }