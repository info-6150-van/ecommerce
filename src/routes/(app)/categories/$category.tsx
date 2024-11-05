import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/categories/$category')({
  component: Category,
})

function Category() {
  const { category } = Route.useParams()
  return <div>Hello /categories/{category}!</div>
}
