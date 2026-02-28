"use client"
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@heroui/react";
import { PlusCircle, Sunrise, EyeIcon, Edit, TrashIcon, UserRound } from "lucide-react"
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useState, useEffect } from "react"
import { GuardianSchemaT, StudentSchemaT, StudentStatsSchemaT, SubjectT } from "@/lib/schemas"
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
import { BaseErrMsg, BaseRequestHeaders, ClassGroups } from "@/lib/utils"
import StudentStatistics from "@/components/dashboard/student-stats"
import { toast } from "react-toastify"

export default function Students() {

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const [hasMultichoiceScoring, setHasMultichoiceScoring] = useState<boolean>(false)
    const [multiScoreCount, setMultiScoreCount] = useState<number>(1)
    const scoreOptions = ["yes", "always", "sometimes", "no"]


    // new ones here
    const [modalAction, setModalAction] = useState<"view" | "add" | "delete" | "update">("view")
    const [loading, setLoading] = useState<boolean>(false)
    const [studentFetched, setStudentFetched] = useState<boolean>(false)
    const [allStudents, setAllStudents] = useState<StudentSchemaT[]>([])
    const [guardianInfo, setGuardianInfo] = useState<GuardianSchemaT>({
        fullname: "",
        occupation: "",
        educationBackground: "",
        phone: "",
        postAddress: "",
        houseNumber: "",
    })
    const [studentStats, setStudentStats] = useState<StudentStatsSchemaT>({
        maleCount: 0,
        femaleCount: 0,
        malePercentage: 0,
        femalePercentage: 0
    })
    const [studentInfo, setStudentInfo] = useState<StudentSchemaT>({
        surname: "",
        otherNames: "",
        dateOfBirth: "",
        placeOfBirth: "",
        gender: "",
        nationality: "",
        schoolsAttended: "",
        healthProblems: "",
    })

    useEffect(() => {
        const fetchStudentStats = async () => {
            try {
                const response = await fetch(`/api/stats?query=staff`, {
                    headers: { ...BaseRequestHeaders },
                })
                const result = await response.json()
                if (!response.ok) {
                    return Promise.reject(response.status)
                } else {
                    setStudentStats(result.data)
                }
            } catch (err: any) {
            }
        }
        fetchStudentStats()
    }, [loading])

    useEffect(() => {
        const fetchAllStudents = async () => {
            try {
                const response = await fetch(`/api/staff?query=all`, {
                    headers: { ...BaseRequestHeaders },
                })
                const result = await response.json()
                if (!response.ok) {
                    setStudentFetched(false)
                    return Promise.reject(response.status)
                } else {
                    setAllStudents(result.data)
                    setStudentFetched(true)
                }
            } catch (err: any) {
                setStudentFetched(false)
            }
        }
        fetchAllStudents()
    }, [loading])

    const handleStudentInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value })
    }

    const handleGuardianInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setGuardianInfo({ ...guardianInfo, [e.target.name]: e.target.value })
    }

    const handleOpenModal = (action: typeof modalAction, item?: StudentSchemaT) => {
        if (!action) return
        setModalAction(action)
        { item ? setStudentInfo(item) : null }
        onOpen()
    }

    function handleOnCloseModal() {
        setStudentInfo({
            surname: "",
            otherNames: "",
            dateOfBirth: "",
            placeOfBirth: "",
            gender: "",
            nationality: "",
            schoolsAttended: "",
            healthProblems: "",
        })
        setGuardianInfo({
            fullname: "",
            occupation: "",
            educationBackground: "",
            phone: "",
            postAddress: "",
            houseNumber: "",
        })
        onClose()
    }

    const handleCreateNewStaff = async () => {
        onClose()
        const fn = async () => {
            try {
                const response = await fetch("/api/student", {
                    method: "POST",
                    headers: { ...BaseRequestHeaders },
                    body: JSON.stringify(studentInfo)
                })
                if (!response.ok) {
                    return Promise.reject(response.status)
                } else {
                    return Promise.resolve(response.status)
                }

            } catch (err: any) {
                throw Error(err)
            }
        }

        setLoading(true)
        await toast.promise(
            fn,
            {
                pending: "Creating student...",
                success: "Student successfully created",
                error: BaseErrMsg
            }
        )
        handleOnCloseModal()
        setLoading(false)
    }

    async function handleDeleteStudent() {
        onClose()
        const fn = async () => {
            try {
                const response = await fetch(`/api/student?query=${studentInfo.id}`, {
                    method: "DELETE",
                    headers: { ...BaseRequestHeaders },
                })
                if (!response.ok) {
                    return Promise.reject(response.status)
                } else {
                    return Promise.resolve(response.status)
                }

            } catch (err: any) {
                throw Error(err)
            }
        }

        setLoading(true)
        await toast.promise(
            fn,
            {
                pending: "Deleting student...",
                success: "Student successfully deleted",
                error: BaseErrMsg
            }
        )
        setLoading(false)
    }

    return (
        <div className="h-dvh">
            <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
                <div className="flex flex-row justify-between items-center mb-4">
                    <h1 className="text-balance text-2xl font-semibold text-foreground">Students</h1>
                    <Button className="bg-brand cursor-pointer text-white" onPress={() => handleOpenModal("add")}>
                        <PlusCircle />
                        New Student
                    </Button>
                </div>

                <StudentStatistics data={studentStats} />

                <div className="mt-8">
                    <p className="mt-2 text-muted-foreground">All Students({allStudents.length})</p>
                </div>

                <ul className="mt-6 divide-y divide-border">
                    {allStudents.map((item, index) => (
                        <li key={index} className="flex items-center gap-4 py-4">
                            <div className="size-10 shrink-0 rounded-full bg-primary/10 grid place-items-center text-primary font-medium">
                                {item.surname[0]}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="truncate font-medium text-foreground">{item.otherNames}</p>
                                </div>
                                {/* <p className="truncate text-sm text-muted-foreground">Total: 9</p> */}
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                <Button size="sm" className="color-brand-100" color="primary" onPress={() => handleOpenModal("update", item)}>
                                    <Edit />
                                </Button>
                                <Button size="sm" className="color-brand-100 mx-2" color="primary" onPress={() => handleOpenModal("delete", item)}>
                                    <TrashIcon />
                                </Button>
                                <Button size="sm" className="color-brand-100" color="primary" onPress={() => handleOpenModal("view", item)}>
                                    <EyeIcon />
                                </Button>

                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <Modal isOpen={isOpen} size="lg" backdrop="opaque" placement="center" onOpenChange={onOpenChange} className={`overflow-y-auto ${modalAction === "delete" ? "h-[20rem]" : modalAction === "view" ? "h-[37rem]" : "h-[40rem]"}`}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col">
                                {modalAction === "add" ?
                                    "Add New Staff" : modalAction === "view" ? "Staff Info" : null}
                            </ModalHeader>

                            <ModalBody className="">
                                {modalAction === "add" || modalAction === "update" ?
                                    <>
                                        <p className="font-semibold">Personal Info</p>
                                        <div className="mx-4 gap-8 space-y-12 mb-4">
                                            <Input
                                                isRequired
                                                name="surname"
                                                label="Surname"
                                                labelPlacement="outside"
                                                placeholder="John"
                                                className="w-full"
                                                value={studentInfo.surname}
                                                onChange={handleStudentInfoChange}
                                            />
                                            <Input
                                                isRequired
                                                name="otherNames"
                                                label="Othernames"
                                                labelPlacement="outside"
                                                placeholder="Doe"
                                                className="w-full"
                                                value={studentInfo.otherNames}
                                                onChange={handleStudentInfoChange}
                                            />
                                            <DatePicker
                                                name="dateOfBirth"
                                                label="Date of Birth"
                                                labelPlacement="outside"
                                                isRequired
                                                onChange={(value) => setStudentInfo({ ...studentInfo, dateOfBirth: value?.toString() })}
                                            />
                                            <Input
                                                name="placeOfBirth"
                                                isRequired
                                                label="Email"
                                                labelPlacement="outside"
                                                placeholder="Kumasi"
                                                className="w-full"
                                                value={studentInfo.placeOfBirth}
                                                onChange={handleStudentInfoChange}
                                            />
                                            <Select
                                                name="nationality"
                                                isRequired
                                                label="Nationality"
                                                labelPlacement="outside"
                                                placeholder="Select nationality"
                                                value={studentInfo.nationality}
                                                onChange={handleStudentInfoChange}
                                            >
                                                <SelectItem key="gh">Ghanaian</SelectItem>
                                                <SelectItem key="ngn">Nigerian</SelectItem>
                                                <SelectItem key="other">Other</SelectItem>
                                            </Select>
                                            <Select
                                                name="religion"
                                                isRequired
                                                label="Religion"
                                                labelPlacement="outside"
                                                placeholder="Select religion"
                                                value={studentInfo.religion}
                                                onChange={handleStudentInfoChange}
                                            >
                                                <SelectItem key="christian">Christian</SelectItem>
                                                <SelectItem key="muslim">Muslim</SelectItem>
                                                <SelectItem key="other">Other</SelectItem>
                                            </Select>
                                            <Input
                                                name="schoolsAttended"
                                                label="Previous School"
                                                labelPlacement="outside"
                                                placeholder="Name of previous school if applicable"
                                                className="w-full"
                                                value={studentInfo.schoolsAttended}
                                                onChange={handleStudentInfoChange}
                                            />
                                            <Input
                                                name="healthProblems"
                                                label="Health Issues"
                                                labelPlacement="outside"
                                                placeholder="Concerning health related issues"
                                                className="w-full"
                                                value={studentInfo.healthProblems}
                                                onChange={handleStudentInfoChange}
                                            />
                                        </div>
                                        <Separator />
                                        <p className="font-semibold">Guardian Info</p>
                                        <div className="mx-4 gap-8 space-y-12">
                                            <Input
                                                name="fullname"
                                                isRequired
                                                label="Guardian Name"
                                                labelPlacement="outside"
                                                placeholder=""
                                                className="w-full"
                                                value={guardianInfo.fullname}
                                                onChange={handleGuardianInfoChange}
                                            />
                                            <Input
                                                name="occupation"
                                                isRequired
                                                label="Occupation"
                                                labelPlacement="outside"
                                                placeholder="Trader"
                                                className="w-full"
                                                value={guardianInfo.occupation}
                                                onChange={handleGuardianInfoChange}
                                            />
                                            <Select
                                                name="educationalBackground"
                                                isRequired
                                                label="Educational Background"
                                                labelPlacement="outside"
                                                placeholder="Select edu. background"
                                                value={guardianInfo.educationBackground}
                                                onChange={handleStudentInfoChange}
                                            >
                                                <SelectItem key="bachelor">Bachelor</SelectItem>
                                                <SelectItem key="hnd">Diploma</SelectItem>
                                                <SelectItem key="wassce">Wassce</SelectItem>
                                            </Select>
                                            <Input
                                                name="phone"
                                                isRequired
                                                label="Phone"
                                                labelPlacement="outside"
                                                placeholder=""
                                                className="w-full"
                                                value={guardianInfo.phone}
                                                onChange={handleGuardianInfoChange}
                                            />
                                            <Input
                                                name="postalAddress"
                                                isRequired
                                                label="Postal Address"
                                                labelPlacement="outside"
                                                placeholder="Teacher"
                                                className="w-full"
                                                value={guardianInfo.postAddress}
                                                onChange={handleGuardianInfoChange}
                                            />
                                            <Input
                                                name="houseNumber"
                                                isRequired
                                                label="House Number"
                                                labelPlacement="outside"
                                                placeholder=""
                                                className="w-full"
                                                value={guardianInfo.houseNumber}
                                                onChange={handleGuardianInfoChange}
                                            />
                                        </div>
                                    </>
                                    :
                                    modalAction === "view" ?
                                        <Card className="w-full">
                                            <CardHeader className="flex gap-3">
                                                <UserRound className="border border rounded-lg" size={40} />
                                                <div className="flex flex-col">
                                                    <p className="text-md">{studentInfo.surname} {studentInfo.otherNames}</p>
                                                    <p className="text-small text-default-500">{studentInfo.gender}</p>
                                                </div>
                                            </CardHeader>
                                            <Divider />
                                            <CardBody className="gap-4">

                                                <h1 className="font-bold">Personal</h1>
                                                <div className="mx-4">
                                                    <p>Surname: {studentInfo.surname}</p>
                                                    <p>OtherNames: {studentInfo.otherNames}</p>
                                                    <p>Gender: {studentInfo.gender === "m" ? "Male" : "Female"}</p>
                                                    <p>DateOfBirth: {studentInfo.dateOfBirth}</p>
                                                    <p>Nationality: {studentInfo.nationality}</p>
                                                </div>
                                            </CardBody>
                                            <Divider />
                                        </Card>
                                        : modalAction === "delete" ?
                                            <Card className="w-full">
                                                <CardHeader className="flex gap-3">
                                                    <UserRound className="border border rounded-lg" size={40} />
                                                    <div className="flex flex-col">
                                                        <p className="text-md">{studentInfo.surname} {studentInfo.otherNames}</p>
                                                        <p className="text-small text-default-500">{studentInfo.gender}</p>
                                                    </div>
                                                </CardHeader>
                                                <Divider />
                                                <CardBody className="gap-4">
                                                    <h1 className="">Are you sure you want to delete this student</h1>
                                                    <Button className="color-brand-100" color="primary" onPress={() => handleDeleteStudent()}>
                                                        Confirm Delete
                                                    </Button>

                                                </CardBody>
                                                <Divider />
                                            </Card>
                                            :
                                            null
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="flat" onPress={() => handleOnCloseModal()}>
                                    Close
                                </Button>
                                {modalAction === "add" ?
                                    <Button type="submit" color="primary" onPress={handleCreateNewStaff}>
                                        Submit
                                    </Button>
                                    : modalAction === "update" ?
                                        <Button type="submit" color="primary">
                                            Save Changes
                                        </Button>
                                        : null
                                }
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div >
    )
}
