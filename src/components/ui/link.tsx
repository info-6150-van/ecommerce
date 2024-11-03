import { cn } from "@/lib/utils"
import { createLink, LinkComponent, Link as TanLink,  } from "@tanstack/react-router"
import { cva, VariantProps } from "class-variance-authority"
import React from "react"

const linkVariants = cva(
    "text-sm font-medium transition-colors hover:text-primary",
    {
        variants: {
            variant: {
                nav: "",
                muted: "text-muted-foreground"
            },
        },
        defaultVariants: {
            variant: "nav",
        },
    }
)

export interface LinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
        muted?: boolean
}


const BasicLink = React.forwardRef<HTMLAnchorElement, LinkProps>(({ className, variant, children, ...props }, ref) => {

    const linkVariant = !!props.muted ? "muted" : variant;
    return (
        <TanLink
            className={cn(linkVariants({ variant: linkVariant, className }))}
            ref={ref}
            {...props}
        >
            {children}
        </TanLink>
    )
})

const CreatedLinkComponent = createLink(BasicLink)

export const Link: LinkComponent<typeof BasicLink> = (props) => {
  return <CreatedLinkComponent preload={'intent'} {...props} />
}
