import { useContext, createContext, Dispatch, SetStateAction } from "react"
import { UserLocationProps } from "../types"

type UserLocationPropsContext = {
    destinationAddressCoordinates: UserLocationProps | null,
    setDestinationAddressCoordinates: Dispatch<SetStateAction<UserLocationProps | null>>
}

export const useAddressDestinationCoordinatesContext = createContext<UserLocationPropsContext | null>(null)


export const useAddressDestinationCoordinates = () => {

    const context = useContext(useAddressDestinationCoordinatesContext)

    if(!context){
        throw new Error("useAddressFromCoordinates must be used within a useAddressFromCoordinatesContext")
    }


  return context;
}
