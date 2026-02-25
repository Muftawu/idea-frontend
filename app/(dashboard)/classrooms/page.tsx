"use client"
import { PlusCircle, Sunrise, EyeIcon } from "lucide-react"
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useState } from "react"
import { ClassRoomSchemaT } from "@/lib/schemas"
import { Form, Input, Select, SelectItem, Checkbox, Button } from "@heroui/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/react";

export default function Classrooms() {

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const [classRoomInfo, setClassRoomInfo] = useState<ClassRoomSchemaT>({
        name: "",
        teacher: "",
        group: "",
        studentCount: 0
    })

    const classrooms = [
        { id: 1, name: "Nursery", classTeacher: "Mrs Ivy", studentCount: Math.random() * 100, badge: "Device" },
        { id: 2, name: "Kindergarten", classTeacher: "Mrs Ivy", studentCount: Math.random() * 100, badge: "Security" },
        { id: 3, name: "Primary", classTeacher: "Mrs Ivy", studentCount: Math.random() * 100, badge: "System" },
        { id: 4, name: "JHS", classTeacher: "Mrs Ivy", studentCount: Math.random() * 100, badge: "Lighting" },
    ]

    async function handleCreateNewClass() {
        onClose()
        console.log("showing dialog")
    }

    return (
        <>
            <div className="h-dvh">
                <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-balance text-2xl font-semibold text-foreground">Classrooms ({classrooms.length})</h1>
                        <Button className="bg-brand cursor-pointer text-white" onClick={() => onOpen()}>
                            <PlusCircle />
                            Create Class
                        </Button>
                    </div>

                    <div className="mt-6 mb-4 h-80 w-full rounded-xl bg-background p-4 ring-1 ring-border">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={classrooms} barCategoryGap={18}>
                                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                <YAxis stroke="hsl(var(--muted-foreground))" />
                                <Tooltip
                                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                                    labelStyle={{ color: "hsl(var(--foreground))" }}
                                />
                                <Legend />
                                <Bar dataKey="studentCount" fill="#ff9001" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-8">
                        <p className="mt-2 text-muted-foreground">List of all Classes.</p>
                    </div>

                    <ul className="mt-6 divide-y divide-border">
                        {classrooms.map((t) => (
                            <li key={t.id} className="flex items-center gap-4 py-4">
                                <div className="size-10 shrink-0 rounded-full bg-primary/10 grid place-items-center text-primary font-medium">
                                    {t.name[0]}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="truncate font-medium text-foreground">{t.name}</p>
                                        {/* <span className="text-xs text-muted-foreground">{t.studentCount}</span> */}
                                    </div>
                                    <p className="truncate text-sm text-muted-foreground">ClassTeacher: {t.classTeacher}</p>
                                </div>
                                <Button className="color-brand-100" color="primary">
                                    <EyeIcon />
                                    View
                                </Button>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            <Modal isOpen={isOpen} size="lg" backdrop="opaque" placement="center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col m-2">
                                Add New Class
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    isRequired
                                    label="Name"
                                    labelPlacement="outside"
                                    placeholder="Class name"
                                    className="w-full mb-4"
                                    value={classRoomInfo.name}
                                    onChange={(e) => setClassRoomInfo({ ...classRoomInfo, name: e.target.value })}
                                />
                                <Select
                                    isRequired
                                    label="Class Teacher"
                                    labelPlacement="outside"
                                    name="classTeacher"
                                    placeholder="Select class teacher"
                                    value={classRoomInfo.teacher}
                                    onChange={(e) => setClassRoomInfo({ ...classRoomInfo, teacher: e.target.value })}
                                    className="mb-4"
                                >
                                    <SelectItem key="t1">Teacher 1</SelectItem>
                                    <SelectItem key="t2">Teacher 2</SelectItem>
                                    <SelectItem key="t3">Teacher 3</SelectItem>
                                </Select>
                                <Select
                                    isRequired
                                    label="Group"
                                    labelPlacement="outside"
                                    name="group"
                                    placeholder="Select class group"
                                    value={classRoomInfo.group}
                                    onChange={(e) => setClassRoomInfo({ ...classRoomInfo, group: e.target.value })}
                                    className="mb-4"
                                >
                                    <SelectItem key="creche">Creche</SelectItem>
                                    <SelectItem key="nursery1">Nursery 1</SelectItem>
                                    <SelectItem key="nursery2">Nursery 2</SelectItem>
                                    <SelectItem key="kg1">KG 1</SelectItem>
                                    <SelectItem key="kg2">KG 2</SelectItem>
                                    <SelectItem key="primary">Primary</SelectItem>
                                    <SelectItem key="jhs">JHS</SelectItem>
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button type="submit" color="primary" onPress={handleCreateNewClass}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>


    )
}
