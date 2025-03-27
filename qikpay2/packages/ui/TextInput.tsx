// "use client"
// import React from "react";

// export const TextInput = ({
//     placeholder,
//     onChange,
//     label,
//     value
// }: {
//     placeholder: string;
//     onChange: (value: string) => void;
//     label: string;
//     value: string;
// }) => {
//     return <div className="pt-2">
//         <label className="block mb-2 text-lg font-medium text-white font-mono">{label}</label>
//         <input value={value} onChange={(e) => onChange((e.target.value))} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} />
//     </div>
// }




"use client";

import React , { JSX} from "react";

export const TextInput = ({
    placeholder,
    onChange,
    label,
    value
}: {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
    value: string;
}): JSX.Element => {
    return (
        <div className="pt-2">
            <label className="block mb-2 text-lg font-medium text-white font-mono">
                {label}
            </label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
            />
        </div>
    );
};
