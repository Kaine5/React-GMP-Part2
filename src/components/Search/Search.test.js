import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Search from './Search';
import userEvent from '@testing-library/user-event';

it('renders correctly according to the snapshot', () => {
    const { asFragment } = render(<MemoryRouter><Search /></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
})

it('allows user to input in the search field', () => {
    render(<MemoryRouter><Search /></MemoryRouter>);

    userEvent.type(screen.getByTitle('searchInput'), "something");
    expect(screen.getByTitle('searchInput')).toHaveValue("something");
    
})