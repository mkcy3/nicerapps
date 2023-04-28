import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'

export default function HomePage() {
  return (
    <Container>
      <h1 className="text-xl text-blue-500">Hello, A Next.js!</h1>
      <Button variant={'primary'}> test</Button>
    </Container>
  )
}
