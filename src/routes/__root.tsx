import { Link } from '@/components/ui/link'
import { AuthContext } from '@/hooks/useAuth'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { User, ShoppingBasket, Origami } from "lucide-react"


interface RouterContext {
  auth: AuthContext
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <nav className='flex items-center border-b border-muted py-2 px-6 gap-6'>
        <section className='flex items-center justify-start'>
          <Link to="/">
            <span className='flex items-center justify-start gap-1'>
              <Origami className='w-6 h-6' />
              <span className='font-medium text-xl' >
                ORIGAMI
              </span>
            </span>
          </Link>
        </section>
        <section className="inline-flex items-center justify-start gap-4 p-2 flex-grow">
          <Link to="/categories/$category" params={{category: "men"}} usage="nav">
            Men
          </Link>
          <Link to="/categories/$category" params={{category: "woman"}} usage="nav">
            woman
          </Link>
        </section>
        <section className='flex items-center justify-end gap-4'>
          <Link to="/profile" variant="button">
            <User className='text-lg' />
          </Link>
          <Link to="/about" variant="button">
            <ShoppingBasket className='text-lg' />
          </Link>
        </section>
      </nav>
      <main className='flex-grow'>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
})