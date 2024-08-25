"use client"

import { Button } from '@/components/ui/button';
import { useFileRename } from '@/hooks/use-file-rename';
import { restoreFileName } from '@/hooks/restore-file-name';

interface FileRenameProps {
    shopifyAccessToken:string;
    storeName: string;
    plan: string;
    data: any
}

const FileRename: React.FC<FileRenameProps> = ({
    shopifyAccessToken,
    storeName,
    plan,
    data
}) => {
    const mutation = useFileRename({shopifyAccessToken})
    const mutationRestoreFileName = restoreFileName({shopifyAccessToken});

    const fileRename = async (uid: string) => {
        const data = await mutation.mutateAsync({ uid, storeName })
    }

    const fileNameRestore = async (restoreId: string) => {
        const data = await mutationRestoreFileName.mutateAsync({ restoreId,storeName })
    }

    return (
        <div className="flex flex-col gap-2">
            {
                data.fileRename === false && (
                    <Button className='text-xs' disabled={plan === 'FREE' || data.status === 'ONGOING' || data.status === 'RESTORING'} onClick={() => fileRename(data.uid)} variant={'outline'}>
                        File Rename
                    </Button>
                )
            }
            {
                data.fileRename === true && (
                    <Button className='text-xs' disabled={plan === 'FREE' || data.status === 'ONGOING' || data.status === 'RESTORING'} onClick={() => fileNameRestore(data.uid)} variant={'outline'}>
                        Restore File Name
                    </Button>
                )
            }

        </div>

    )
}

export default FileRename