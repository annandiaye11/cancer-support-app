import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      profile: {
        gender: 'male' | 'female'
        age: number
        mode: 'preventive' | 'curative'
      }
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: string
    profile: {
      gender: 'male' | 'female'
      age: number
      mode: 'preventive' | 'curative'
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: string
    profile: {
      gender: 'male' | 'female'
      age: number
      mode: 'preventive' | 'curative'
    }
  }
}
