import { useState, useEffect } from "react";

const useWindowInfo = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 600);

    function init() {
      setIsDesktop(window.innerWidth > 600);
      setRootWindowStyle();
    }

    function setRootWindowStyle() {
      if (window.innerWidth > 600) document.getElementById('root').classList.add('desktop');
      else document.getElementById('root').classList.remove('desktop');
    }

    useEffect(() => {
      init();
      const isDesktopSub = window.addEventListener('resize', () => {
        init();
      })
      return () => {
        window.removeEventListener('resize', isDesktopSub);
      }
    })

    return {
        isDesktop,
    }
}

export { useWindowInfo };