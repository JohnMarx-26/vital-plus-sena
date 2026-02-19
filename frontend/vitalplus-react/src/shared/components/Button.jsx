
export default function Button({
    variant = "primary", //define el estilo visual
    size = "md",
    type = "button",
    children,               //contenido del boton 
    ...props
}){
    const variants = {
        primary : "border border-border bg-brand text-inverse hover:brand-hover",
        secondary : "border border-border bg-background text-primary hover:brand-soft",
        
    }

    const sizes = { 

        sm : 
            `
            h-9 px-3
            before:absolute before:content-['']
            before:-inset-y-[7px] before:-inset-x-[0px]
             `,

        md :
            `
            h-10 px-4
            before:absolute before:content-['']
            before:-inset-y-[4px] before:-inset-x-[0px]
             `        
            
    }

    return (
        <button 
            type={type}
            className= {
             `
                relative
                inline-flex items-center justify-center
                rounded-md
                transition-colors
                ${variants[variant]}
                ${sizes[size]}
            `}
                {...props}
                >
                {children}
        </button>
    );
};