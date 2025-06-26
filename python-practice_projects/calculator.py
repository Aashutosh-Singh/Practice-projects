operation={
    "+": "addition",
    "-": "subtraction",
    "*": "multiplication",
    "/": "Division",
    "Q":"quit",
    "q":"quit",
}
try:
    while True:
        
        a=int(input("Enter the first number: "))
        b=int(input("Enter the second number: "))
        print(operation)
        op=input("Enter the operation: ")
        if op=="+":
            print(a+b)
        elif op=="-":
            print(a-b)
        elif op=="*":
            print(a*b)
        elif op=="/":
            print(a/b)
        elif op=="Q" or op=="q":
            break
        else:
            print("Invalid operation")
except Exception as e:
    print(e)
