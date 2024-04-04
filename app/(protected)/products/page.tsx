import ProductList from "@/components/product/productlist";

const Page = async () => {
    const res = await fetch('http://localhost:8080/products');
    const data = await res.json();
    
    return (
        <div className="mt-24">
            <ProductList products={data.data} />
        </div>
    )
}

export default Page