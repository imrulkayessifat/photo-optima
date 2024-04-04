import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaRegEye } from "react-icons/fa";

import { Button } from "@/components/ui/button";


interface ProductActionCellProps {
    data: any
}
const ProductActionCell: React.FC<ProductActionCellProps> = ({
    data
}) => {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    return (
        <div className="flex gap-2">
            <Button onClick={() => router.push(`/products/${data.id}`)} variant={"outline"}>
                <FaRegEye className="w-5 h-5" />
            </Button>
        </div>
    )
}

export default ProductActionCell;