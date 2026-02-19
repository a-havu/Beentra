import { NextRequest } from "next/server"

/**
 * first the provider response with code.
 * then we send this by POST to the provider with the clientid and the secret.
 * if it is correct the provider will send back data, has tokens.
 * 
 */


export async function GET(request: NextRequest){
    
    const {searchParams} = new URL(request.url)
    const code = searchParams.get('code')

    if(!code)
    {
        return Response.redirect(`${process.env.NEXT_PUBLIC_URL}/login?error=no_code`)
    }
     console.log("code:", code);   
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: process.env.AUTH_GITHUB_ID!,
            client_secret: process.env.AUTH_GITHUB_SECRET!,
            code
        })
    
    })

    const data = await tokenResponse.json()
    const access_token = data.access_token

    if(!access_token){
       return Response.redirect(`${process.env.NEXT_PUBLIC_URL}/login?error=no_token`)
    }

    const userRes = await fetch('https://api.github.com/user',{
        headers:{
            'Authorization' : `token ${access_token}`,
            'Accept':'application/json'
        }
    })

    const gitHubUser = await userRes.json()

    console.log("gitHubUser:", gitHubUser);

    return Response.redirect(`${process.env.NEXT_PUBLIC_URL}/`)
}





/*

  // 3. get primary email
  const emailRes = await fetch('https://api.github.com/user/emails', {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Accept': 'application/json'
    }
  })

  const emails = await emailRes.json() as GitHubEmail[]
  const primaryEmail = emails.find((e) => e.primary)?.email

  if (!primaryEmail) {
    return Response.redirect(`${process.env.NEXT_PUBLIC_URL}/login?error=no_email`)
  }

  // 4. find or create user
  let user = await db.query(
    'SELECT * FROM users WHERE github_id = $1',
    [String(githubUser.id)]
  ).then((r) => r.rows[0] ?? null)

  if (!user) {
    // check if email exists (credentials user)
    user = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [primaryEmail]
    ).then((r) => r.rows[0] ?? null)

    if (user) {
      // link github to existing account
      await db.query(
        'UPDATE users SET github_id = $1, avatar_url = $2 WHERE id = $3',
        [String(githubUser.id), githubUser.avatar_url, user.id]
      )
    } else {
      // create new user
      user = await db.query(
        `INSERT INTO users (email, github_id, avatar_url, username)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [primaryEmail, String(githubUser.id), githubUser.avatar_url, githubUser.login]
      ).then((r) => r.rows[0])
    }
  }

  // 5. create JWT
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
  const token = await new SignJWT({ userId: user.id, email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)

  // 6. set cookie
  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7
  })

  return Response.redirect(`${process.env.NEXT_PUBLIC_URL}/dashboard`)
}
*/