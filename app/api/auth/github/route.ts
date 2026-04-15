
import 'dotenv/config'

export async function GET(){
   const params = new URLSearchParams({
    client_id: process.env.AUTH_GITHUB_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_URL}/api/auth/github/callback`,
    scope: 'read:user user:email',
  })

return Response.redirect(
    `https://github.com/login/oauth/authorize?${params}`
)
}