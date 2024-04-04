import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LiaCompressArrowsAltSolid } from "react-icons/lia";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";


interface ImageCellProps {
    data: any
}
const ImageActionCell: React.FC<ImageCellProps> = ({
    data
}) => {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();


    return (
        <div className="flex gap-2">
            <Button variant={"outline"}>
                <LiaCompressArrowsAltSolid className="w-7 h-7" />
            </Button>
        </div>
    )
}

export default ImageActionCell;