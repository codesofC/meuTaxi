import { useContext, createContext, Dispatch, SetStateAction } from "react"
import { UserLocationProps } from "../types"

type UserLocationPropsContext = {
    userLocation: UserLocationProps | null,
    setUserLocation: Dispatch<SetStateAction<UserLocationProps | null>>
}

export const userLocationContext = createContext<UserLocationPropsContext | null>(null)


export const useUserLocation = () => {

    const context = useContext(userLocationContext)

    if(!context){
        throw new Error("useUserLocation must be used within a UserLocationContext")
    }


  return context;
}
