import React from "react";

type CardProps = {
    title: string;
    desc: string;
};

const Card = ({ title, desc }: CardProps) => {
    return (
        <div className="shadow-md shadow-slate-400 border flex flex-col px-4 py-8 gap-3 rounded-sm">
            <h1 className="text-slate-900 text-xl font-bold">{title}</h1>
            <p className="text-slate-700 text-sm">{desc}</p>
        </div>
    );
};


export default Card;