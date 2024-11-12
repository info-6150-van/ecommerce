import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { sleep } from '@/lib/utils'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Loader2, Github } from 'lucide-react'
import React from 'react'

type LoginSearchParams = {
  redirect: string
}

export const Route = createFileRoute('/(auth)/login')({
  validateSearch: (search: Record<string, unknown>): LoginSearchParams => {
    // validate and parse the search params into a typed state
    return {
      redirect: (search.redirect as string) || '',
    }
  },
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback })
    }
  },
  component: LoginPage,
})

const fallback = '/' as const


interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  password: HTMLInputElement
}
interface LoginFormElementProps extends HTMLFormElement {
  readonly elements: FormElements
}

function LoginPage() {
  const navigate = Route.useNavigate()
  const {redirect} = Route.useSearch()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const {login} = useAuth();

  async function onSubmit(event: React.FormEvent<LoginFormElementProps>) {
    event.preventDefault()

    await login(event.currentTarget.elements.email.value, 
      event.currentTarget.elements.password.value
    )

    setIsLoading(true)

    await sleep(3000);

    // @ts-expect-error redirect is a string, which is broader than the routes options.
    await navigate({ to: redirect || fallback })
    setIsLoading(false)

  }

  return (
    <section className='flex items-center justify-center w-full h-full'>
      <div className="grid gap-6 max-w-lg max-h-56">
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="name@example.com"
                type="password"
                autoCapitalize="none"
                autoComplete="none"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Github className="mr-2 h-4 w-4" />
          )}{" "}
          GitHub
        </Button>
      </div>
    </section>
  )
}