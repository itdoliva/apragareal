function ringShape(x, y, ir, or) {
    var path  =
          'M'+x+' '+(y+or)+'A'+or+' '+or+' 0 1 1 '+(x+0.001)+' '+(y+or) // outer
        + 'M'+x+' '+(y+ir)+'A'+ir+' '+ir+' 0 1 0 '+(x-0.001)+' '+(y+ir) // inner
        ;
    return path;
}

export default ringShape