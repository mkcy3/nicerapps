import { SignIn } from '@clerk/nextjs'

type SignInPageProps = {
  params: { slug: string[] }
  searchParams: object
}
export default function Page({ params, searchParams }: SignInPageProps) {
  console.log(params)
  console.log(searchParams)
  return <SignIn />
}
