import React from 'react'
import { NavLink } from 'react-router-dom'
export interface INavElement {
    name: string,
    path: string,
    id: number
}

export const NavElement: React.FC<INavElement> = (element: INavElement) => {
    const { name, path, id } = element;
    return (
        <NavLink className='nav-link' to={path} style={{ textDecoration: 'none', color: 'white' }} key={id}>
            {name}
        </NavLink >
    )
}
