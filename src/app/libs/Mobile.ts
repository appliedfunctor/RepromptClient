export class Mobile {

    preventMobileScreenDrag() {
        //solution based on code from https://github.com/bevacqua/dragula/issues/487 accessed 19/08/2016 author John Beedell
        $(document).on('touchstart', function(e) {
            e.preventDefault()
        })
    }

    enableMobileScreenDrag() {
        //solution based on code from https://github.com/bevacqua/dragula/issues/487 accessed 19/08/2016 author John Beedell
        $(document).off('touchstart')
    }

}