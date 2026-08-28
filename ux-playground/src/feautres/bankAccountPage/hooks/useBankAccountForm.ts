import type { BankAccountType } from "@/types"
import { useForm } from "react-hook-form"

export function useBankAccountForm() {
    const form = useForm<{
        type: BankAccountType | "ALL"
    }>({
        defaultValues: {
            type: "ALL",
        },
    })
    return form
}