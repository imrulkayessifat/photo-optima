import React from 'react'

// import useCompressStatusStore from '@/hooks/compress-status'

interface ProductCompressStatusProps {
    data: any
}

const ProductCompressStatus: React.FC<ProductCompressStatusProps> = ({
    data
}) => {
    // const compressStatus = useCompressStatusStore((state) => state.compressStatus);
    // console.log(data.images.length)
    // if (compressStatus[data.id] === 'ongoing') {
    //     return (
    //         <p>ongoing</p>
    //     )
    // }

    // if (compressStatus[data.id] === 'compressed') {
    //     return (
    //         <p>compressed</p>
    //     )
    // }

    // if (data.images.length === 1) {
    //     return (
    //         <p>not compressed</p>
    //     )
    // }
    return (
        <p>compressed</p>
    )

}

export default ProductCompressStatus