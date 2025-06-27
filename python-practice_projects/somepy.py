import lmstudio as lms

model = lms.llm("google/gemma-3-1b")
info="Say you are Aashutosh Singh, a good old friend. Try being friendly without being cringe. You don't need to answer short or long, think how long a friend would answer this question Now as me answer this- "
query=input("Enter you query in detail.\n")
fquery=info+query
result = model.respond(fquery)
print("\n")
print(result)
print("\n _________________________________________\n")
result=result.content

while True:
    query=input("Enter: \n")
    query="last question= "+fquery+"last response= "+ result +info +query
    print("\n")
    result=model.respond(query)
    print(result)
    result=result.content
    print("\n _________________________________________\n")
#So there is a friend of mine whom i have not really talked with latly. She called me couple of months ago and that's all we talked this year. I week awkward talkng to people. i get confused thinking what is the right thing to talk and what's the right way to talk. I don't know what to text her but i want to. i don't wanna sound cheesse nor cliche.