"use client"
import { PlusCircle, Sunrise, EyeIcon, Edit } from "lucide-react"
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useState } from "react"
import { SubjectT } from "@/lib/schemas"
import { Input, Select, SelectItem, Checkbox, Button, DatePicker } from "@heroui/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/react";
import { Separator } from "@/components/ui/separator"
import { SubjecStatistics } from "@/components/dashboard/subject-stats"
import { ClassGroups } from "@/lib/utils"

export default function Subjects() {

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [modalAction, setModalAction] = useState<"view" | "add" | "delete">("view")
    const [hasMultichoiceScoring, setHasMultichoiceScoring] = useState<boolean>(false)
    const [multiScoreCount, setMultiScoreCount] = useState<number>(1)
    const scoreOptions = ["yes", "always", "sometimes", "no"]

    const [subjectInfo, setSubjectInfo] = useState<SubjectT>({
        classGroup: "",
        name: "",
        scoreType: "",
        scoreOptions: []
    })

    const subjects: SubjectT[] = [
        {
            classGroup: "Nursery",
            name: "Keep self clean",
            scoreType: "multiple",
            scoreOptions: scoreOptions
        },
        {
            classGroup: "Nursery",
            name: "Keep self clean",
            scoreType: "multiple",
            scoreOptions: scoreOptions
        },
    ]

    async function handleCreateNewStaff() {
        console.log("dialog")
    }

    function handleOpenModal(action: typeof modalAction, item?: SubjectT) {
        if (!action) return
        setModalAction(action)
        { item ? setSubjectInfo(item) : null }
        onOpen()
    }

    function handleOnCloseModal() {
        setSubjectInfo({
            classGroup: "",
            name: "",
            scoreType: "",
            scoreOptions: []
        })
        onClose()
    }

    function onSelectScoringType(item: string) {
        if (!item) return
        if (item === "multiple") {
            setHasMultichoiceScoring(true)
        } else {
            setHasMultichoiceScoring(false)
        }
    }

    return (
        <div className="h-dvh">
            <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
                <div className="flex flex-row justify-between items-center mb-4">
                    <h1 className="text-balance text-2xl font-semibold text-foreground">Taught Subjects</h1>
                    <Button className="bg-brand cursor-pointer text-white" onPress={() => handleOpenModal("add")}>
                        <PlusCircle />
                        Add Subject
                    </Button>
                </div>

                <SubjecStatistics />

                <div className="mt-8">
                    <p className="mt-2 text-muted-foreground">All Subjects({subjects.length})</p>
                </div>

                <ul className="mt-6 divide-y divide-border">
                    {subjects.map((item, index) => (
                        <li key={index} className="flex items-center gap-4 py-4">
                            <div className="size-10 shrink-0 rounded-full bg-primary/10 grid place-items-center text-primary font-medium">
                                {item.name[0]}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="truncate font-medium text-foreground">{item.classGroup}</p>
                                    {/* <span className="text-xs text-muted-foreground">{t.studentCount}</span> */}
                                </div>
                                <p className="truncate text-sm text-muted-foreground">Total: 9</p>
                            </div>
                            <div className="flex flex row justify-center items-center">
                                <Button className="color-brand-100" color="primary" onPress={() => handleOpenModal("view", item)}>
                                    <Edit />
                                    View
                                </Button>
                                <Button className="color-brand-100 mx-4" color="primary" onPress={() => handleOpenModal("view", item)}>
                                    <EyeIcon />
                                    Edit
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <Modal isOpen={isOpen} size="lg" backdrop="opaque" placement="center" onOpenChange={onOpenChange} className="overflow-y-auto h-auto">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col m-2">
                                Add New Subject
                            </ModalHeader>
                            <ModalBody className="">
                                <p className="font-semibold">Subject Info</p>
                                <div className="mx-4 gap-8 space-y-12 mb-4">
                                    <Input
                                        isRequired
                                        label="Name"
                                        labelPlacement="outside"
                                        placeholder="Mathematics"
                                        className="w-full"
                                        value={subjectInfo.name}
                                        onChange={(e) => setSubjectInfo({ ...subjectInfo, name: e.target.value })}
                                    />
                                    <Select
                                        isRequired
                                        label="Class Group"
                                        labelPlacement="outside"
                                        placeholder="Select class group"
                                        value={subjectInfo.classGroup}
                                        onChange={(e) => setSubjectInfo({ ...subjectInfo, classGroup: e.target.value })}
                                    >
                                        {ClassGroups.map((item, index) => (
                                            <SelectItem key={item.key}>{item.value}</SelectItem>
                                        ))}
                                    </Select>
                                    <Select
                                        isRequired
                                        label="Scoring Type"
                                        labelPlacement="outside"
                                        placeholder="Select scoring type"
                                        value={subjectInfo.scoreType}
                                        onChange={(e) => onSelectScoringType(e.target.value)}
                                    >
                                        <SelectItem key="number">Number</SelectItem>
                                        <SelectItem key="multiple">Multi-choice</SelectItem>
                                    </Select>

                                    <Separator />
                                    {hasMultichoiceScoring ? "Add options below" : null}
                                    {hasMultichoiceScoring ?
                                        Array.from({ length: multiScoreCount }, (_, index) => (
                                            <div className="flex flex row justify-between items-center">
                                                <Input
                                                    key={index}
                                                    isRequired
                                                    label={`Option ${index + 1}`}
                                                    labelPlacement="outside-left"
                                                    placeholder="Doe"
                                                    className="w-full"
                                                />
                                                <Button className="cursor-pointer mx-2" onPress={() => setMultiScoreCount(prev => prev - 1)}>Remove</Button>
                                            </div>
                                        ))
                                        : null
                                    }
                                    {hasMultichoiceScoring ? <Button className="cursor-pointer" onPress={() => setMultiScoreCount(prev => prev + 1)}>Add new option</Button> : null}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="flat" onPress={() => handleOnCloseModal()}>
                                    Close
                                </Button>
                                <Button type="submit" color="primary" onPress={handleCreateNewStaff}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div >
    )
}
