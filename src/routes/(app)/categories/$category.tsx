/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchProducts } from '@/lib/api'
import { createFileRoute } from '@tanstack/react-router'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import React, { useCallback } from 'react'

import { z } from 'zod'

const pageSearchParams = z.object({
  addCat: z.string().min(3).max(100).optional()
})

export const Route = createFileRoute('/(app)/categories/$category')({
  validateSearch: (search) => pageSearchParams.parse(search),
  component: Category,
  loader: fetchProducts
})


function Category() {
  const { category } = Route.useParams()
  const navigate = Route.useNavigate()
  const data: any = Route.useLoaderData()
  const {addCat} = Route.useSearch()

  const productsWithinCategory = React.useMemo(() =>
    data.filter((it: any) => it.category.toLowerCase().startsWith(category) || it.category === addCat)
    , [data, category, addCat])

  const productsCategories = React.useMemo(() => (
    Array.from(new Set(data.map((it: any) => it.category)))
  ), [data])


  const handleCategoryChange = useCallback((value: string) => {
    navigate({
      to: Route.fullPath,
      params: {
        category
      },
      search: {
        addCat: value
      }
    })
  }, [category, navigate])

  return (
    <>
      <div className='flex px-8 py-4'>
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[180px] rounded-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {productsCategories.map((it: any) => (
              <SelectItem value={it}>{it}</SelectItem>
            ))}
          </SelectContent>
        </Select>

      </div>
      <div className='grid grid-cols-4 gap-4 px-8 py-4'>
        {productsWithinCategory.map((it: any) => (
          <div className='border border-slate-100 rounded-md px-4 py-2 flex flex-col gap-2' key={it.id}>
            <img src={it.image} alt={it.title} className='object-contain h-52 w-48 rounded-md mx-auto mb-4' />
            <hr />
            <p className='text-sm truncate text-md font-semibold'>{it.title}</p>
            <span className='line-clamp-4 text-sm text-muted-foreground'>{it.description}</span>
          </div>
        ))}
      </div>
    </>
  )
}
