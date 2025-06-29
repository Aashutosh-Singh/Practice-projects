import lmstudio as lms

model = lms.llm("google/gemma-3-1b")
print("Type exit to quit")
while True:
    query=input("Enter: \n")
    if query=="exit":
        break
    print("\n")
    result=model.respond(query)
    print(result)
    result=result.content
    print("\n _________________________________________\n")
#lms server start