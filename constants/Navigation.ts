import { label } from "framer-motion/client";

export const NavLinks = [
    {
        label: "Home",
        path: "/",
    },
    {
        label: "Browse",
        path: "/posts",
    },
    {
        label: "Contact",
        path: "/contact",
    },
    {
        label: "Dashboard",
        path: "/dashboard",
    },
    {
        label: "Login",
        path: "/login",
    },
    {
        label: "Register",
        path: "/register",
    },
];

export const FooterLinks = [
    {
        label: "Community",
        links: [
            {
                label: "Browse Projects",
                path: "/posts"
            },
            {
                label: "Browse Creators",
                path: "/users"
            },
            {
                label: "Browse Tags",
                path: "/tags"
            }
        ]
    },
    {
        label: "More Information",
        links: [
            {
                label: "Report a problem",
                path: "/report",
            },
            {
                label: "Terms of Service",
                path: "/tos",
            },
            {
                label: "Suggest a feature",
                path: "/feature",
            },
            {
                label: "Contact Us",
                path: "/contact",
            },
        ]
    }
];

