import ImagestList from "@/components/image/imageslist";

const Page = async () => {
    const res = await fetch('http://localhost:8080/images',{ cache: 'no-store' });
    const data = await res.json();
    return (
        <div className="mt-24">
            <ImagestList images={data.data} />
        </div>
    )
}

export default Page