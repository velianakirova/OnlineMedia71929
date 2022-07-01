import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Nav.css';

export const Nav = () => {
    return (
        <nav className='Nav'>
            <NavLink className={({ isActive }) => isActive ? "active" : undefined} to="/">
                Home
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : undefined} to="/Login">
                Login
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : undefined} to="/Register">
                Register
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : undefined} to="/NewArticle">
                Add Article
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : undefined} to="/PublishedArticles">
                Published Articles
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : undefined} to="/PendingArticles">
                Pending Articles
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : undefined} to="/UserProfile">
                My Profile
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : undefined} to="/ManageArticles">
                Manage Articles
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : undefined} to="/ManageUsers">
                Manage Users
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : undefined} to="/ManageGroups">
                Manage Groups
            </NavLink>
        </nav>
    );
}
