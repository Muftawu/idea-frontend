"use client"

import type React from "react"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Laptop, Thermometer, Lightbulb, Refrigerator } from "lucide-react"

type SettingsInfoProp = {
    id: number
    title: string
    description: string
    value: string
    icon: React.ComponentType<{ className?: string }>
}

const settingsInfo: SettingsInfoProp[] = [
    { id: 1, title: "Current Term", description: "Current academic term", value: "1st", icon: Lightbulb },
    { id: 2, title: "Term Duration", description: "Number of days in terms", value: "55", icon: Lightbulb },
    { id: 3, title: "Term Start", description: "When did term begin", value: new Date().toLocaleDateString(), icon: Lightbulb },
    { id: 3, title: "Term End", description: "When is the next vacation", value: new Date().toLocaleDateString(), icon: Lightbulb },
]

export default function Settings() {

    return (
        <div className="h-dvh">
            <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
                <h1 className="text-balance text-2xl font-semibold text-foreground">School Settings</h1>
                <p className="mt-2 text-muted-foreground">Changes made here affect the entire application.</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {settingsInfo.map((item, index) => (
                        <div key={index} className="rounded-xl bg-background p-4 ring-1 ring-border">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <item.icon className={`size-5 text-primary`} />
                                    <div>
                                        <p className="font-medium text-foreground">{item.title}</p>
                                        <p className="text-xs text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                                <h1 className="text-lg font-bold">{item.value}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
