"use client"

import { Button } from '@/components/ui/button';
import { useAltRename } from '@/hooks/use-alt-rename';
import { restoreAltTag } from '@/hooks/restore-alt-tag';

interface AltRenameProps {
    shopifyAccessToken:string;
    storeName: string;
    plan: string;
    data: any
}

const AltRename: React.FC<AltRenameProps> = ({
    shopifyAccessToken,
    storeName,
    plan,
    data
}) => {
    const mutation = useAltRename({shopifyAccessToken})
    const mutationRestoreAltTag = restoreAltTag({shopifyAccessToken});

    const altRename = async (uid: string) => {
        const data = await mutation.mutateAsync({ uid, storeName })
    }

    const altTagRestore = async (restoreId: string) => {
        const data = await mutationRestoreAltTag.mutateAsync({ restoreId,storeName })
    }
    
    return (
        <div className="flex flex-col gap-2">
            {
                data.altRename === false && (
                    <Button className='text-xs' disabled={plan === 'FREE' || data.status === 'ONGOING' || data.status === 'RESTORING'} onClick={() => altRename(data.uid)} variant={'outline'}>
                        Alt Rename
                    </Button>
                )
            }
            {
                data.altRename === true && (
                    <Button className='text-xs' disabled={plan === 'FREE' || data.status === 'ONGOING' || data.status === 'RESTORING'} onClick={() => altTagRestore(data.uid)} variant={'outline'}>
                        Restore Alt Tag
                    </Button>
                )
            }
        </div>
    )
}

export default AltRename