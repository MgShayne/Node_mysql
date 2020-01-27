import UIKit

func goodMorning() {
    print("Good Morning")
}

goodMorning()

func printTotalWithTax(_ subtotal:Double)->Double{
    let res = subtotal * 1.13
    return res
}

print(printTotalWithTax(100))
