import { cn } from "@/lib/utils"
import { createLink, LinkComponent, Link as TanLink, useRouterState, } from "@tanstack/react-router"
import { cva, VariantProps } from "class-variance-authority"
import React, { useMemo } from "react"

const linkVariants = cva(
    "",
    {
        variants: {
            state: {
                default: "",
                active: "",
                muted: ""
            },
            variant: {
                link: "text-sm transition-all hover:text-primary",
                button: "rounded-sm p-1 transition-colors hover:bg-muted",
                logo: ""
            },
            usage: {
                nav: "uppercase"
            }
        },
        compoundVariants: [
            {
                variant: "link",
                state: "default",
                class: "font-light"
            },
            {
                variant: "link",
                usage: "nav",
                state: "active",
                class: "font-semibold underline"
            },
            {
                variant: "link",
                state: "muted",
                class: "font-thin text-muted-foreground"
            },
            {
                variant: "button",
                state: "default",
                class: "text-black opacity-80"
            },
            {
                variant: "button",
                state: "active",
                class: "text-black"
            },
            {
                variant: "button",
                state: "muted",
                class: "bg-muted text-black opacity-80"
            },
        ],
        defaultVariants: {
            state: "active",
            variant: "link"
        },
    }
)

export interface LinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
    muted?: boolean
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BasicLink = React.forwardRef<HTMLAnchorElement, LinkProps>(({ className, usage, state: _state, variant, children, ...props }, ref) => {
    const router = useRouterState();

    const state = useMemo(() => {
        if (props.muted)
            return "muted";
        else if (router.location.pathname === props.href)
            return "active";
        else
            return "default";

    }, [props.muted, props.href, router.location.pathname]);
    return (
        <TanLink
            className={cn(linkVariants({ usage, variant, state, className }))}
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
