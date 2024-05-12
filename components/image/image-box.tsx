import ImagestList from "@/components/image/imageslist";

const ImageBox = async () => {
    
    const res = await fetch('http://localhost:3001/image', { cache: 'no-store' });
    const data = await res.json();
    return (
        <ImagestList images={data.data} />
    )
}

export default ImageBox