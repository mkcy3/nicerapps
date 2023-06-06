import { auth, currentUser } from '@clerk/nextjs'

export async function getCurrentUser() {
  const user = await currentUser()
  return user
}
export async function getAuth() {
  const { userId } = auth()
  return { userId }
}
