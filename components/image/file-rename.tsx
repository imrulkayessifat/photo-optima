"use client"

import { Button } from '@/components/ui/button';

interface FileRenameProps {
    plan:string;
    data: any
}

const FileRename: React.FC<FileRenameProps> = ({
    plan,
    data
}) => {

    const fileRename = async (id: string, name: string) => {
        const req = await fetch('http://localhost:3001/rename/file-rename', {
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
                        <Button onClick={() => fileRename(data.id, data.name)} variant={'outline'}>
                            File Rename
                        </Button>
                    </div>
                )
            }
        </div>
    )
}

export default FileRename