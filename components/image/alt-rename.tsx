"use client"

import { Button } from '@/components/ui/button';
import { useAltRename } from '@/hooks/use-alt-rename';

interface AltRenameProps {
    storeName:string;
    plan: string;
    data: any
}

const AltRename: React.FC<AltRenameProps> = ({
    storeName,
    plan,
    data
}) => {
    const mutation = useAltRename()
    const altRename = async (id: string, name: string) => {
        const data = await mutation.mutateAsync({ id, name ,storeName})
    }
    return (
        <div className="flex flex-col gap-2">
            <Button disabled={plan === 'FREE'} onClick={() => altRename(data.id, data.name)} variant={'outline'}>
                Alt Rename
            </Button>
        </div>
    )
}

export default AltRename