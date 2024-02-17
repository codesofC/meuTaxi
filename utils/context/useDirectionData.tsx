import { useContext, createContext, Dispatch, SetStateAction } from "react"

type UseDirectionDataProps = {
    directionData: any,
    setDirectionData: Dispatch<SetStateAction<any>>
}

export const directionDataContext = createContext<UseDirectionDataProps | null>(null)


export const useDirectionData = () => {

    const context = useContext(directionDataContext)

    if(!context){
        throw new Error("useDirectionData must be used within a directionDataContext")
    }


  return context;
}
