import Image from "next/image"

interface LogoProps {
    src:string;
}

const Logo:React.FC<LogoProps> = ({
    src
}) => {
    return (
        <Image
            src={src}
            alt={"photo optima"}
            width={50}
            height={50}
            className="object-cover w-[180px] ml-[-20px] h-[50px]"
        />
    )
}

export default Logo