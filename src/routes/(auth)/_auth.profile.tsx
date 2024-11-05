import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_auth/profile')({
  component: () => <div>Hello /_auth/profile!</div>,
})
