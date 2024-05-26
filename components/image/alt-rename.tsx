"use client"

import { Button } from '@/components/ui/button';

interface AltRenameProps {
    plan: string;
    data: any
}

const AltRename: React.FC<AltRenameProps> = ({
    plan,
    data
}) => {
    const altRename = async (id: string, name: string) => {
        const req = await fetch('http://localhost:3001/rename/alt-rename', {
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
    }
    return (
        <div>
            {
                plan !== 'FREE' && (
                    <div className="flex flex-col gap-2">
                        <Button onClick={() => altRename(data.id, data.name)} variant={'outline'}>
                            Alt Rename
                        </Button>
                    </div>
                )
            }
        </div>
    )
}

export default AltRename