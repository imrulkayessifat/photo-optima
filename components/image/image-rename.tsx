"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"

interface ImageRenameProps {
    data: any
}

const ImageRename: React.FC<ImageRenameProps> = ({
    data
}) => {

    const [plan, setPlan] = useState('')
    const storeName = localStorage.getItem('store-name')

    useEffect(() => {
        const fetchPlan = async () => {
            const res = await fetch('http://localhost:3001/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    storeName: `${storeName}`
                })
            })
            const data = await res.json()

            setPlan(data.data.plan)

        }
        fetchPlan()
    }, [storeName])


    const fileRename = async (id: string, name: string) => {
        const req = await fetch('http:localhost:3001/rename/file-rename', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: `${id}`,
                name: name
            })
        })

        const res = await req.json()

        console.log(res)
    }

    return (
        <div>
            {
                plan !== 'FREE' && (
                    <Button onClick={() => fileRename(data.id, data.name)} variant={'outline'}>
                        File Rename
                    </Button>
                )
            }
        </div>
    )
}

export default ImageRename