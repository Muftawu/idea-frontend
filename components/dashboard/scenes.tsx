import { Sunrise, Moon, Database } from "lucide-react"

type dataProps = {
    icon: any
    title: string,
    data: string,
}

function Scene({ icon: Icon, title, data }: dataProps) {
    return (
        <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border">
            <span aria-hidden className="grid size-8 place-items-center rounded-xl bg-brand text-white">
                <Icon className="size-4" />
            </span>
            <div>
                <div className="text-xl font-semibold text-foreground">{data}</div>
                <div className="text-lg text-muted-foreground">{title}</div>
            </div>
        </div>
    )
}

export function Scenes() {
    const data: dataProps[] = [
        {
            title: "Students",
            data: "30",
            icon: Sunrise
        },
        {
            title: "Staff",
            data: "30",
            icon: Sunrise
        }, {
            title: "Classes",
            data: "30",
            icon: Sunrise
        },
    ]
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {data.map((item, index) => (
                <Scene key={index} icon={Sunrise} title={item.title} data={item.data} />
            ))}
        </div>
    )
}
