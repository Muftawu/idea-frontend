import { VendorDTOType } from '@/dtos/vendorDTOs';
import { BaseRequestHeaders } from '@/lib/utils';
import { NextResponse, NextRequest } from 'next/server';
import { cookies } from "next/headers";
import { clearTokens, refetchTokens } from '@/actions/cookies';

const baseUrlList = `${process.env.BASE_API_URL}/vendors/`
const baseUrlDetail = `${process.env.BASE_API_URL}/vendors/detail/`

// plugin functions
const getVendorPlugin = async (query: string) => {
    const cookieStore = await cookies()
    const access_token = cookieStore.get("access_token")?.value ?? ""

    const link = query === "all" ? baseUrlList : `${baseUrlDetail}${query}`
    const headers = query === "all" ?
        {
            ...BaseRequestHeaders,
            "Authorization": `Bearer ${access_token}`
        }
        :
        {
            ...BaseRequestHeaders,
        }

    const response = await fetch(link, {
        headers: headers,
    })
    const result = await response.json()
    return { response, result }
}

const createVendorPlugin = async (payload: VendorDTOType) => {
    const cookieStore = await cookies()
    const access_token = cookieStore.get("access_token")?.value ?? ""

    const response = await fetch(baseUrlList, {
        method: "POST",
        headers: {
            ...BaseRequestHeaders,
            "Authorization": `Bearer ${access_token}`,
        },
        body: JSON.stringify(payload)
    })
    const result = await response.json()
    return { response, result }
}

const updateVendorPlugin = async (payload: VendorDTOType) => {
    const cookieStore = await cookies()
    const access_token = cookieStore.get("access_token")?.value ?? ""

    const response = await fetch(`${baseUrlDetail}${payload.id}/`, {
        method: "PATCH",
        headers: {
            ...BaseRequestHeaders,
            "Authorization": `Bearer ${access_token}`,
        },
        body: JSON.stringify(payload)
    })
    const result = await response.json()
    return { response, result }
}

const deleteVendorPlugin = async (payload: string) => {
    console.log("payload menu item id", payload)
    const cookieStore = await cookies()
    const access_token = cookieStore.get("access_token")?.value ?? ""

    const response = await fetch(`${baseUrlDetail}${payload}/`, {
        method: "DELETE",
        headers: {
            ...BaseRequestHeaders,
            "Authorization": `Bearer ${access_token}`,
        },
    })
    return { response }
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("query") ?? ""

    let out = await getVendorPlugin(query)
    if (!out?.response.ok) {
        if (out?.response.status === 401) {
            const cookieStore = await cookies()
            const refresh_token = cookieStore.get("refresh_token")?.value ?? ""
            const refetchSuccess = await refetchTokens(refresh_token)
            if (refetchSuccess) {
                out = await getVendorPlugin(query)
            } else {
                await clearTokens()
            }
        } else {
            return NextResponse.json({ message: out?.result.message }, { status: out?.response.status })
        }
    }
    return NextResponse.json(
        { message: out?.result.message, data: out?.result.data },
        { status: out?.response.status }
    )
}

export async function POST(request: NextRequest) {
    const payload = await request.json()

    let out = await createVendorPlugin(payload)
    if (!out?.response.ok) {
        if (out?.response.status === 401) {
            const cookieStore = await cookies()
            const refresh_token = cookieStore.get("refresh_token")?.value ?? ""
            const refetchSuccess = await refetchTokens(refresh_token)
            if (refetchSuccess) {
                out = await createVendorPlugin(payload)
            } else {
                await clearTokens()
            }
        } else {
            return NextResponse.json({ message: out?.result.message }, { status: out?.response.status })
        }
    }
    return NextResponse.json(
        { message: out?.result.message, data: out?.result.data },
        { status: out?.response.status }
    )
}

export async function PATCH(request: NextRequest) {
    const payload = await request.json()

    let out = await updateVendorPlugin(payload)
    if (!out?.response.ok) {
        if (out?.response.status === 401) {
            const cookieStore = await cookies()
            const refresh_token = cookieStore.get("refresh_token")?.value ?? ""
            const refetchSuccess = await refetchTokens(refresh_token)
            if (refetchSuccess) {
                out = await updateVendorPlugin(payload)
            } else {
                await clearTokens()
            }
        } else {
            return NextResponse.json({ message: out?.result.message }, { status: out?.response.status })
        }
    }
    return NextResponse.json(
        { message: out?.result.message, data: out?.result.data },
        { status: out?.response.status }
    )
}

export async function DELETE(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const payload = searchParams.get("query") ?? ""

    let out = await deleteVendorPlugin(payload)
    if (!out?.response.ok) {
        if (out?.response.status === 401) {
            const cookieStore = await cookies()
            const refresh_token = cookieStore.get("refresh_token")?.value ?? ""
            const refetchSuccess = await refetchTokens(refresh_token)
            if (refetchSuccess) {
                out = await deleteVendorPlugin(payload)
            } else {
                await clearTokens()
            }
        } else {
            return NextResponse.json({ message: "failed" }, { status: out?.response.status })
        }
    }
    return NextResponse.json(
        null,
        { status: 200 }
    )
}
