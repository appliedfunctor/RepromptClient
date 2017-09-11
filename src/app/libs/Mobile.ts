export class Mobile {

    preventMobileScreenDrag() {
        // https://stackoverflow.com/questions/10592411/disable-scrolling-in-all-mobile-devices accessed 24/08/2016 author Knetic
        window.addEventListener("scroll", this.preventMotion, false);
        window.addEventListener("touchmove", this.preventMotion, false);
    }

    enableMobileScreenDrag() {
        window.removeEventListener("scroll")
        window.removeEventListener("touchmove")
    }

    // https://stackoverflow.com/questions/10592411/disable-scrolling-in-all-mobile-devices accessed 24/08/2016 author Knetic
    preventMotion(event) {
        //window.scrollTo(0, 0);
        event.preventDefault();
        event.stopPropagation();
    }

}



