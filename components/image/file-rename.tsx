"use client"

import { Button } from '@/components/ui/button';
import { useFileRename } from '@/hooks/use-file-rename';

interface FileRenameProps {
    storeName:string;
    plan: string;
    data: any
}

const FileRename: React.FC<FileRenameProps> = ({
    storeName,
    plan,
    data
}) => {
    const mutation = useFileRename()

    const fileRename = async (id: string, name: string) => {
        const data = await mutation.mutateAsync({id,name,storeName})
    }

    return (
        <div className="flex flex-col gap-2">
            <Button disabled={plan === 'FREE'} onClick={() => fileRename(data.id, data.name)} variant={'outline'}>
                File Rename
            </Button>
        </div>

    )
}

export default FileRename