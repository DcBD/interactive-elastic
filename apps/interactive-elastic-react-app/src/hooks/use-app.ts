import { useContext } from "react"
import { AppContext } from "src/components/providers/app-provider"

export default function useApp() {
    const context = useContext(AppContext)

    return context

}

