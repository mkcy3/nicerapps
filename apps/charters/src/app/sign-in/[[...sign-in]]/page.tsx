import { SignIn } from '@clerk/nextjs'

type SignInPageProps = {
  searchParams: { redirect_url: string }
}
export default function Page({ searchParams }: SignInPageProps) {
  return <SignIn routing="path" redirectUrl={searchParams.redirect_url} />
}
