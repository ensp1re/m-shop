import { FieldValues, UseFormRegister } from "react-hook-form";


interface CustomCheckboxProps {
    id: string;
    label: string;
    disabled?: boolean;
    register: UseFormRegister<FieldValues>

}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    id, label, disabled, register
}) => {
    return (
        <div className="w-full flex flex-row gap-2 items-center">
            <input className="cursor-pointer" type="checkbox" id={id} disabled={disabled}
                {...register(id)} placeholder="" />
            <label htmlFor={id} className="font-medium cursor-pointer">{label}</label>
        </div>
    )
}

export default CustomCheckbox;