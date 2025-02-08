import * as React from "react";
import {FC} from "react";
import {Button} from "primereact/button";

type ButtonProps =  {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

const GButton:FC<ButtonProps> = ({className,children,onClick})=>{
    return (
        <Button className={className} onClick={onClick}>
            {children}
        </Button>
    )
}
export default GButton;