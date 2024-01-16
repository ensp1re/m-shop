'use client'


import {FieldValues, UseFormRegister, FieldErrors} from 'react-hook-form'

interface TextAreaProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;

}


const TextArea: React.FC<TextAreaProps> = ({id, errors, disabled, register, type, required, label}) => {
    return (
        <div className="w-full relative">
            <textarea autoComplete="off"
                   disabled={disabled}
                   {...register(id, {required})}
                   placeholder=""
                   id={id} className={`peer w-full p-4 max-h-[150px] min-h-[150px] pt-6 outline-none bg-white font-light border-2 rounded-dm transition disabled:opacity-70
            disabled:cursor-not-allowed ${errors[id] ? 'border-rose-400' : 'border-slate-300'} ${errors[id] ? 'focus:border-rose-400' : '' +
                'focus:border-slate-300'}`}></textarea>
            <label
                className={`absolute cursor-text text-md duration-150
                transform
                -translate-y-3
                top-5 z-10 origin-[0] left-4
                 peer-placeholder-shown:scale-100
                 peer-placeholder-shown:translate-y-0
                 peer-focis:scale-75
                 peer-focus:-translate-y-4
                 ${errors[id] ? 'text-rose-500' : 'text-slate-300'}

                 `}
                htmlFor={id}>{label}</label>
        </div>)
}

export default TextArea;