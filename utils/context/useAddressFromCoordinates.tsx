import { useContext, createContext, Dispatch, SetStateAction } from "react"
import { UserLocationProps } from "../types"

type UserLocationPropsContext = {
    fromAddressCoordinates: UserLocationProps | null,
    setFromAddressCoordinates: Dispatch<SetStateAction<UserLocationProps | null>>
}

export const useAddressFromCoordinatesContext = createContext<UserLocationPropsContext | null>(null)


export const useAddressFromCoordinates = () => {

    const context = useContext(useAddressFromCoordinatesContext)

    if(!context){
        throw new Error("useAddressFromCoordinates must be used within a useAddressFromCoordinatesContext")
    }


  return context;
}
