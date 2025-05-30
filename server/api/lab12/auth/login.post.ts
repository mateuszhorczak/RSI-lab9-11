// File: ~/server/api/auth/login.post.ts
import jwt from 'jsonwebtoken'
import { compare, hash } from 'bcrypt'

export default defineEventHandler(async (event) => {
  // Get Authorization header
  const authHeader = getRequestHeader(event, 'Authorization')

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing or invalid Authorization header',
      // @ts-expect-error .........
      headers: {
        'WWW-Authenticate': 'Basic realm="User Visible Realm"'
      }
    })
  }

  // Extract and decode credentials
  const base64Credentials = authHeader.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8')
  const [username, password] = credentials.split(':')

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid credentials format'
    })
  }

  // Hardcoded credentials
  const validCredentials = [
    { username: 'mateusz', password: 'zaq1@WSX' }
  ]

  // Find user
  const user = validCredentials.find(u => u.username === username)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
      // @ts-expect-error .........
      headers: {
        'WWW-Authenticate': 'Basic realm="User Visible Realm"'
      }
    })
  }

  // Verify password
  const passwordValid = await compare(password, await hash(user.password, 10))

  if (!passwordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
      // @ts-expect-error .........
      headers: {
        'WWW-Authenticate': 'Basic realm="User Visible Realm"'
      }
    })
  }

  // Generate JWT token
  const secret = process.env.JWT_SECRET || 'your-strong-secret-key'
  const token = jwt.sign(
    { sub: user.username, iat: Math.floor(Date.now() / 1000) },
    secret,
    { expiresIn: '1h' }
  )

  // Return token in response (not as cookie)
  return {
    status: 'success',
    message: 'Login successful',
    token: token,
    expires_in: 3600,
    user: {
      username: user.username
    }
  }
})
