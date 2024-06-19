"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Actions from "@/components/user-subscription/Actions"

export type UserSubscriptionType = {
    name: string
    plan: string
    chargeId: string
}

export const columns: ColumnDef<UserSubscriptionType>[] = [

    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "plan",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Plan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "chargeId",
        header: "Charge Id",
    },
    {
        id: "actions",
        cell: ({ row }) => <Actions
            name={row.original.name}
            plan={row.original.plan}
            chargeId={row.original.chargeId}
        />
    }
]
