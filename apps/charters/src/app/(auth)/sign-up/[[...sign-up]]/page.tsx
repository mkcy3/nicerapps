import { SignUp } from '@clerk/nextjs'

type SignUpPageProps = {
  searchParams: { redirect_url: string }
}
export default function Page({ searchParams }: SignUpPageProps) {
  return <SignUp redirectUrl={searchParams.redirect_url} routing="path" />
}
