import { useAuth, useClerk, useUser } from '@clerk/nextjs'

export function useCurrentAuth() {
  const { isLoaded, userId, sessionId, getToken } = useAuth()
  return { isLoaded, userId, sessionId, getToken }
}
export function useCurrentUser() {
  const { isLoaded, isSignedIn, user } = useUser()
  return { isLoaded, isSignedIn, user }
}

export function useSignOut() {
  const { signOut } = useClerk()

  return signOut
}
