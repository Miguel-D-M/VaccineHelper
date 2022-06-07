import React, { Component }  from 'react';

const Header = ({title, subtitle}) => {
    return (
        <header className='header'>
            <h2>{title}</h2>
            <h4>{subtitle}</h4>
        </header>
    )
}

Header.defaultProps = {
    title: "Please fill this form",
    subtitle: ""
}

export default Header
