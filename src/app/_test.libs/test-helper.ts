export class TestHelper {
    //https://eclipsesource.com/blogs/2014/03/27/mocks-in-jasmine-tests/ accessed 8/9/17
    static mock = function( constr, name ) {
        var keys = []
        for( var key in constr.prototype ) {
            keys.push( key )
        }
        return keys.length > 0 ? jasmine.createSpyObj( name || "mock", keys ) : {}
    }
}