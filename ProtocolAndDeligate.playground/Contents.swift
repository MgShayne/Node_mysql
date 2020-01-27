import UIKit

protocol PoliceCodes {
    func nineOhTwo()
}

class Officer {
    var radio:PoliceCodes?
    
    func callItIn() {
        radio?.nineOhTwo()
    }
    
    func hello(){
        print("hello")
    }
}

class Dispatcher:PoliceCodes {
    func nineOhTwo() {
        print("902 received and handled")
    }
}

let o = Officer()
let d = Dispatcher()
o.radio = d
o.callItIn()
o.hello()
