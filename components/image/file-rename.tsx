"use client"

import { Button } from '@/components/ui/button';
import { useFileRename } from '@/hooks/use-file-rename';
import { restoreFileName } from '@/hooks/restore-file-name';

interface FileRenameProps {
    storeName: string;
    plan: string;
    data: any
}

const FileRename: React.FC<FileRenameProps> = ({
    storeName,
    plan,
    data
}) => {
    const mutation = useFileRename()
    const mutationRestoreFileName = restoreFileName();

    const fileRename = async (id: string) => {
        const data = await mutation.mutateAsync({ id, storeName })
    }

    const fileNameRestore = async (restoreId: string) => {
        const data = await mutationRestoreFileName.mutateAsync({ restoreId })
    }

    return (
        <div className="flex flex-col gap-2">
            {
                data.fileRename === false && (
                    <Button disabled={plan === 'FREE'} onClick={() => fileRename(data.id)} variant={'outline'}>
                        File Rename
                    </Button>
                )
            }
            {
                data.fileRename === true && (
                    <Button disabled={plan === 'FREE'} onClick={() => fileNameRestore(data.id)} variant={'outline'}>
                        Restore File Name
                    </Button>
                )
            }

        </div>

    )
}

export default FileRename