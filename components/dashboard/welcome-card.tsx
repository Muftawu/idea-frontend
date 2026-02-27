"use client"

import { useAuthContext } from "@/context/authContext"
import { Spinner } from "@heroui/react"

export function WelcomeCard() {
    const authInfo = useAuthContext()
    if (!authInfo || !authInfo.userInfo) return (
        <div className="flex flex-row justify-end mb-2">
            <Spinner color="warning" size="sm" />
        </div>
    )

    return (
        <section className="relative overflow-hidden rounded-3xl bg-sidebar-gradient p-6 text-white">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                {/* Left Side (Text) */}
                <div className="max-w-xl md:w-3/5">
                    <h1 className="text-balance text-3xl font-semibold">Welcome back, {authInfo.userInfo.first_name}</h1>
                    <p className="mt-2 text-sm leading-6 text-white/90">
                        What would you like to do today?
                    </p>
                    <div className="mt-4 flex items-center gap-4 rounded-2xl bg-white/10 px-4 py-3 text-sm">
                        <span suppressHydrationWarning className="text-2xl">{new Date().toLocaleString().split(',')[0]}</span> |
                        <span suppressHydrationWarning className="text-2xl">{new Date().toLocaleString().split(',')[1]}</span>
                        {/* <div> */}
                        {/*     <div className="font-medium">{new Date().getUTCMonth()}</div> */}
                        {/*     <div className="text-white/80">{new Date().toLocaleString()}</div> */}
                        {/* </div> */}
                    </div>
                </div>

                {/* Right Side (Image fills 50%) */}
                {/* <div className="relative lg:w-2/5"> */}
                {/*     <div className="relative w-full h-64 md:h-full min-h-[250px]"> */}
                {/*         <Image */}
                {/*             src="./images/idea.jpg" */}
                {/*             alt="Idea img" */}
                {/*             fill */}
                {/*             className="rounded-2xl object-fill opacity-90" */}
                {/*             sizes="50vw" */}
                {/*         /> */}
                {/*     </div> */}
                {/* </div> */}
            </div>

            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl" />
        </section>
    )
}
