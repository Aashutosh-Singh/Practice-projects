# import lmstudio as lms

# model = lms.llm("google/gemma-3-1b")
# # info="Say you are Aashutosh Singh, a good old friend. Try being friendly without being cringe. You don't need to answer short or long, think how long a friend would answer this question Now as me answer this- "
# query=input("Enter you query in detail.\n")
# # fquery=info+query
# result = model.respond(query)
# print("\n")
# print(result)
# print("\n _________________________________________\n")
# result=result.content

# while True:
#     query=input("Enter: \n")
#     # tquery="last question= "+fquery+" last response= "+ result +info +query
#     print("\n")
#     result=model.respond(query)
#     print(result)
#     result=result.content
#     print("\n _________________________________________\n")
# #So there is a friend of mine whom i have not really talked with latly. She called me couple of months ago and that's all we talked this year. I week awkward talkng to people. i get confused thinking what is the right thing to talk and what's the right way to talk. I don't know what to text her but i want to. i don't wanna sound cheesse nor cliche.
import lmstudio as lms

# Initialize model
model = lms.llm("google/gemma-3-1b")

# Set maximum token budget for conversation history
MAX_TOKENS = 2000
AVG_TOKENS_PER_WORD = 1.3  # conservative estimate

# Initialize conversation history
conversation_history = ""

# Optional: Initial prompt to guide tone/personality
initial_prompt = (
    "You are Aashutosh Singh, a helpful, friendly companion who responds like a good old friend—"
    "not too formal, not too cringey. Have thoughtful, natural conversations.\n"
)

def estimate_token_length(text: str) -> int:
    words = text.strip().split()
    return int(len(words) * AVG_TOKENS_PER_WORD)

def prune_history(history: str, new_query: str, max_tokens: int) -> str:
    lines = history.strip().split("\n")
    pruned = []
    total_tokens = estimate_token_length("\n".join(lines) + new_query)
    
    # Work backwards and keep latest exchanges within limit
    while lines and total_tokens > max_tokens:
        lines = lines[2:]  # Remove one full exchange: You:, AI:
        total_tokens = estimate_token_length("\n".join(lines) + new_query)
        
    return "\n".join(lines)

conversation_history += initial_prompt

print("Start chatting with your model. Type 'exit' to quit.\n")

while True:
    query = input("You: ").strip()
    if query.lower() == "exit":
        break

    # Prune history if necessary
    conversation_history = prune_history(conversation_history, query, MAX_TOKENS)
    
    # Compose prompt
    prompt = conversation_history + f"\nYou: {query}\nAI:"
    
    # Model response
    response = model.respond(prompt)
    reply = response.content.strip()

    # Display response
    print(f"\nAI: {reply}")
    print("\n" + "_" * 40 + "\n")
    
    # Update history
    conversation_history += f"\nYou: {query}\nAI: {reply}"