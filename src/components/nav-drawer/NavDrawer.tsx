import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavDrawer.scss";

import CloseSvg from "../../resources/icons/close.svg";
import LogoImg from "../../resources/images/logo/logo_240.webp";
import { firstLetterToUpperCase } from "../../utils/HelperFunctions.utils";
import ApCounter from "../ap-counter/ApCounter";
import { routes } from "../../Routes";
import { useGlobalStates } from "../../hooks/UseGlobalStates";
import ImageLoader from "../image-loader/ImageLoader";

export default function NavDrawer() {
    const location = useLocation();
    const { isNavDrawerOpen, setIsNavDrawerOpen, windowInfo } =
        useGlobalStates();
    const window = windowInfo;

    useEffect(() => {
        const nav = document.getElementById("nav-drawer");
        if (!nav)
            throw new Error(
                "#nav-drawer should be assigned to use NavDrawer component!"
            );
        if (isNavDrawerOpen || window.isDesktop) {
            nav.style.transform = "translateX(0)";
        } else {
            nav.style.transform = "translateX(-120vw)";
        }
    }, [isNavDrawerOpen, window.isDesktop]);

    function close() {
        setIsNavDrawerOpen(false);
    }

    const navElements = routes.map((route) => {
        return (
            <li key={route.key}>
                <Link
                    to={route.path}
                    className={`link ${
                        location.pathname === route.path && "active"
                    }`}
                    onClick={close}
                >
                    <ImageLoader
                        src={route.icon}
                        wrapperClass="img-imit icon"
                    />
                    {firstLetterToUpperCase(route.key)}
                </Link>
            </li>
        );
    });

    return (
        <nav id="nav-drawer">
            {!window.isDesktop && (
                <button className="close-button" onClick={close}>
                    <img alt="" src={CloseSvg} className="icon" />
                </button>
            )}
            <div className="logo">
                <ImageLoader src={LogoImg}></ImageLoader>
            </div>
            <ApCounter />
            <ul className="nav-list">{navElements}</ul>
        </nav>
    );
}
