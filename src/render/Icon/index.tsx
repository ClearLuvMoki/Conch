import React, {forwardRef} from 'react'

export type IconProps = {
    className?: string;
    style?: React.CSSProperties;
    svg: React.ReactNode;
    onClick?: () => void;
};

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
    ({className = '', style = {}, svg, onClick}, ref) => {
        return (
            <span
                ref={ref}
                className={className}
                style={{display: 'inline-flex', justifyContent: 'center', alignItems: 'center', ...style}}
                onClick={() => {
                    onClick && onClick()
                }}
            >
                {svg}
            </span>
        )
    }
)

export const buildIcon = (svg: IconProps['svg']) =>
    forwardRef<HTMLSpanElement, Omit<IconProps, 'svg'>>((props, ref) => (
        <Icon ref={ref} svg={svg} {...props}></Icon>
    ))
