"use client"
import { PlusCircle, Sunrise, EyeIcon } from "lucide-react"
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useState } from "react"
import { StaffT } from "@/lib/schemas"
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
import StaffStatistics from "@/components/dashboard/staff-stats"


export default function Staff() {

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [modalAction, setModalAction] = useState<"view" | "add" | "delete">("view")

    const [staffInfo, setStaffInfo] = useState<StaffT>({
        personalInfo: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            gender: "f"
        },
        staffId: "",
        placeOfBirth: "",
        academicQualification: "",
        professionalQualification: "",
        placeOfResidence: "",
        homeTown: "",
        bankAccountNo: "",
        socialSecurityNo: "",
    })

    const staffs: StaffT[] = [
        {
            personalInfo: {
                id: "1",
                firstName: "Staff",
                lastName: "1",
                email: "staff1@gmail.com",
                phone: "0201020265",
                gender: "m"
            },
            staffId: "1"
        },
        {
            personalInfo: {
                id: "2",
                firstName: "Staff",
                lastName: "1",
                email: "staff1@gmail.com",
                phone: "0201020265",
                gender: "f"
            },
            staffId: "2"
        },
    ]

    async function handleCreateNewStaff() {
        console.log("dialog")
    }

    function handleOpenModal(action: typeof modalAction, item?: StaffT) {
        if (!action) return
        setModalAction(action)
        { item ? setStaffInfo(item) : null }
        onOpen()
    }

    function handleOnCloseModal() {
        setStaffInfo({
            personalInfo: {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                gender: "f"
            },
            staffId: "",
            placeOfBirth: "",
            academicQualification: "",
            professionalQualification: "",
            placeOfResidence: "",
            homeTown: "",
            bankAccountNo: "",
            socialSecurityNo: "",
        })
        onClose()
    }

    return (
        <div className="h-dvh">
            <section className="rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border">
                <div className="flex flex-row justify-between items-center mb-4">
                    <h1 className="text-balance text-2xl font-semibold text-foreground">Academic Staff</h1>
                    <Button className="bg-brand cursor-pointer text-white" onPress={() => handleOpenModal("add")}>
                        <PlusCircle />
                        Add Staff
                    </Button>
                </div>

                <StaffStatistics className="" />

                <div className="mt-8">
                    <p className="mt-2 text-muted-foreground">All Staff ({staffs.length})</p>
                </div>

                <ul className="mt-6 divide-y divide-border">
                    {staffs.map((item, index) => (
                        <li key={index} className="flex items-center gap-4 py-4">
                            <div className="size-10 shrink-0 rounded-full bg-primary/10 grid place-items-center text-primary font-medium">
                                {item.personalInfo.firstName[0]} {item.personalInfo.lastName[0]}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="truncate font-medium text-foreground">{item.personalInfo.firstName} {item.personalInfo.lastName}</p>
                                    {/* <span className="text-xs text-muted-foreground">{t.studentCount}</span> */}
                                </div>
                                <p className="truncate text-sm text-muted-foreground">Phone: {item.personalInfo.phone}</p>
                            </div>
                            <Button className="color-brand-100" color="primary" onPress={() => handleOpenModal("view", item)}>
                                <EyeIcon />
                                View
                            </Button>
                        </li>
                    ))}
                </ul>
            </section>

            <Modal isOpen={isOpen} size="lg" backdrop="opaque" placement="center" onOpenChange={onOpenChange} className="overflow-y-auto h-[40rem]">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col m-2">
                                Add New Staff
                            </ModalHeader>
                            <ModalBody className="">
                                <p className="font-semibold">Personal Info</p>
                                <div className="mx-4 gap-8 space-y-12 mb-4">
                                    <Input
                                        isRequired
                                        label="First Name"
                                        labelPlacement="outside"
                                        placeholder="John"
                                        className="w-full"
                                        value={staffInfo.personalInfo.firstName}
                                        onChange={(e) => setStaffInfo({ ...staffInfo, personalInfo: { ...staffInfo.personalInfo, firstName: e.target.value } })}
                                    />
                                    <Input
                                        isRequired
                                        label="Last Name"
                                        labelPlacement="outside"
                                        placeholder="Doe"
                                        className="w-full"
                                        value={staffInfo.personalInfo.lastName}
                                        onChange={(e) => setStaffInfo({ ...staffInfo, personalInfo: { ...staffInfo.personalInfo, lastName: e.target.value } })}
                                    />
                                    <Input
                                        isRequired
                                        label="Email"
                                        labelPlacement="outside"
                                        placeholder="jdoe@gmail.com"
                                        className="w-full"
                                        value={staffInfo.personalInfo.email}
                                        onChange={(e) => setStaffInfo({ ...staffInfo, personalInfo: { ...staffInfo.personalInfo, email: e.target.value } })}
                                    />
                                    <Input
                                        isRequired
                                        label="Phone"
                                        labelPlacement="outside"
                                        placeholder="054XXXXXXXX"
                                        className="w-full"
                                        value={staffInfo.personalInfo.firstName}
                                        onChange={(e) => setStaffInfo({ ...staffInfo, personalInfo: { ...staffInfo.personalInfo, phone: e.target.value } })}
                                    />
                                    <DatePicker
                                        label="Date of Birth"
                                        labelPlacement="outside"
                                        isRequired
                                    />
                                    <Select
                                        isRequired
                                        label="Nationality"
                                        labelPlacement="outside"
                                        placeholder="Select nationality"
                                        value={staffInfo.personalInfo.gender}
                                        onChange={(e) => setStaffInfo({ ...staffInfo, personalInfo: { ...staffInfo.personalInfo, nationality: e.target.value } })}
                                    >
                                        <SelectItem key="gh">Ghanaian</SelectItem>
                                        <SelectItem key="ngn">Nigerian</SelectItem>
                                    </Select>
                                    <Select
                                        isRequired
                                        label="Gender"
                                        labelPlacement="outside"
                                        name="gender"
                                        placeholder="Select gender"
                                        value={staffInfo.personalInfo.gender}
                                        onChange={(e) => setStaffInfo({ ...staffInfo, personalInfo: { ...staffInfo.personalInfo, gender: e.target.value } })}
                                    >
                                        <SelectItem key="t1">Teacher 1</SelectItem>
                                        <SelectItem key="t2">Teacher 2</SelectItem>
                                        <SelectItem key="t3">Teacher 3</SelectItem>
                                    </Select>
                                </div>

                                <Separator />
                                <p className="font-semibold">Academic Info</p>
                                <div className="mx-4 gap-8 space-y-12">
                                    <Input
                                        isRequired
                                        label="Place of Birth"
                                        labelPlacement="outside"
                                        placeholder="Accra"
                                        className="w-full"
                                        value={staffInfo.staffId}
                                        onChange={(e) => setStaffInfo({ ...staffInfo, staffId: e.target.value })}
                                    />
                                    <Select
                                        isRequired
                                        label="Academic Qualification"
                                        labelPlacement="outside"
                                        name="gender"
                                        placeholder="Select qualification"
                                        value={staffInfo.personalInfo.gender}
                                        onChange={(e) => setStaffInfo({ ...staffInfo, personalInfo: { ...staffInfo.personalInfo, gender: e.target.value } })}
                                    >
                                        <SelectItem key="bachelors">Bachelors</SelectItem>
                                        <SelectItem key="hnd">Diploma</SelectItem>
                                        <SelectItem key="wassce">Wassce</SelectItem>
                                    </Select>
                                    <Input
                                        isRequired
                                        label="Professional Qualification"
                                        labelPlacement="outside"
                                        placeholder="Teacher"
                                        className="w-full"
                                        value={staffInfo.personalInfo.lastName}
                                        onChange={(e) => setStaffInfo({ ...staffInfo, personalInfo: { ...staffInfo.personalInfo, lastName: e.target.value } })}
                                    />
                                    <Input
                                        isRequired
                                        label="Residence"
                                        labelPlacement="outside"
                                        placeholder="Kasoa"
                                        className="w-full"
                                        value={staffInfo.personalInfo.email}
                                        onChange={(e) => setStaffInfo({ ...staffInfo, personalInfo: { ...staffInfo.personalInfo, email: e.target.value } })}
                                    />
                                    <Input
                                        isRequired
                                        label="Hometown"
                                        labelPlacement="outside"
                                        placeholder="Ho"
                                        className="w-full"
                                        value={staffInfo.personalInfo.firstName}
                                        onChange={(e) => setStaffInfo({ ...staffInfo, personalInfo: { ...staffInfo.personalInfo, phone: e.target.value } })}
                                    />
                                    <Input
                                        isRequired
                                        label="Bank Acc No"
                                        labelPlacement="outside"
                                        placeholder="XXXX-XXX-XXXXX"
                                        className="w-full"
                                        value={staffInfo.personalInfo.firstName}
                                        onChange={(e) => setStaffInfo({ ...staffInfo, personalInfo: { ...staffInfo.personalInfo, phone: e.target.value } })}
                                    />
                                    <Input
                                        label="Social Security No"
                                        labelPlacement="outside"
                                        placeholder="SSN-XXX-XXX-XXX"
                                        className="w-full"
                                        value={staffInfo.personalInfo.firstName}
                                        onChange={(e) => setStaffInfo({ ...staffInfo, personalInfo: { ...staffInfo.personalInfo, phone: e.target.value } })}
                                    />
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
        </div>
    )
}
