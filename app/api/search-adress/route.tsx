import { NextResponse } from "next/server"


const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest"


export const GET = async (request: any) => {

    const { searchParams } = new URL(request.url)

    const searchText = searchParams.get('q')

    const res = await fetch(BASE_URL+'?q='+searchParams+'&language=en&limit=6&session_token=0b592197-0a02-446b-9f12-48a3cf2c8495&country=US&access_token='+process.env.MAPBOX_ACCESS_TOKEN, {
        headers: {
            "Content-Type":"application/json"
        }
    })
    

    const searchResult = await res.json()
    
    return NextResponse.json(searchResult)
}