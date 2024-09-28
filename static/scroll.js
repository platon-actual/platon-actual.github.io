export class Scroll{
    // Ramiro Ríos 2024.
    constructor(_config) {
        this.callback = null;
        if ( _config.onScroll !== undefined)
            this.callback = _config.onScroll;

        this.last_known_scroll_position = 0;
        this.ticking = false;

        window.addEventListener('scroll', (e)=>{
            this.last_known_scroll_position = window.scrollY;
            if( !this.ticking ){
                window.requestAnimationFrame(()=>{
                    this.doSomething(this.last_known_scroll_position);
                    if( this.callback )
                        this.callback();
                    this.ticking = false;
                });
            }

            this.ticking = true;
        });
    }

    doSomething(scroll_pos){
        // console.log("scroll pos: " + scroll_pos);
    }

    position() {
        return this.last_known_scroll_position;
    }
}