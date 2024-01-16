

interface NullDataProps {
    title : string;
}

const NullData:React.FC<NullDataProps> = ({title}) => {
    return (
        <div className="w-full h-[50vh] flex items-center justify-center text-xl">
            <p className="font-medium">{title}</p>
        </div>
    )
}


export default NullData;