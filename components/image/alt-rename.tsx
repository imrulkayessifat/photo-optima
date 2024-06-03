"use client"

import { Button } from '@/components/ui/button';
import { useAltRename } from '@/hooks/use-alt-rename';
import { restoreAltTag } from '@/hooks/restore-alt-tag';

interface AltRenameProps {
    storeName: string;
    plan: string;
    data: any
}

const AltRename: React.FC<AltRenameProps> = ({
    storeName,
    plan,
    data
}) => {
    const mutation = useAltRename()
    const mutationRestoreAltTag = restoreAltTag();

    const altRename = async (id: string) => {
        const data = await mutation.mutateAsync({ id, storeName })
    }

    const altTagRestore = async (restoreId: string) => {
        const data = await mutationRestoreAltTag.mutateAsync({ restoreId })
    }
    
    return (
        <div className="flex flex-col gap-2">
            {
                data.altRename === false && (
                    <Button className='text-xs' disabled={plan === 'FREE'} onClick={() => altRename(data.id)} variant={'outline'}>
                        Alt Rename
                    </Button>
                )
            }
            {
                data.altRename === true && (
                    <Button className='text-xs' disabled={plan === 'FREE'} onClick={() => altTagRestore(data.id)} variant={'outline'}>
                        Restore Alt Tag
                    </Button>
                )
            }
        </div>
    )
}

export default AltRename