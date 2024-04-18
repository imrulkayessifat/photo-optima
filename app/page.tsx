import Navbar from "@/components/navbar";
import ImagestList from "@/components/image/imageslist";

export default async function Home() {
  const res = await fetch('http://localhost:8080/images', { cache: 'no-store' });
  const data = await res.json();
  return (
    <main>
      <Navbar />
      <div className="mt-24">
        <ImagestList images={data.data} />
      </div>
    </main>
  );
}
