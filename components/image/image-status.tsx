import React from 'react'

import { useStore } from '@/hooks/compress-status'

interface ImageStatusProps {
    data: any
}

const ImageStatus: React.FC<ImageStatusProps> = ({
    data
}) => {
    const status = useStore(state => state.imageStatus[data.id]);

    if(!status) {
        return (
            <div className='capitalize'>{data.status}</div>
        )
    }

    return (
        <div className='capitalize'>{status}</div>
    )
}

export default ImageStatus