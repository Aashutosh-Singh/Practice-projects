import lmstudio as lms
import time
import threading
import sys

# model = lms.llm("deepseek-r1-distill-llama-8b")
# model = lms.llm("gemma-3-12b-it")
model = lms.llm("google/gemma-3-1b")
print("Type exit to quit")

# Define a flag to signal when to stop the timer
stop_timer = False

def live_timer():
    start = time.time()
    while not stop_timer:
        elapsed = int(time.time() - start)
        sys.stdout.write(f"\rTime elapsed: {elapsed} sec")
        sys.stdout.flush()
        time.sleep(1)
    print()  # To move to a new line after stopping

while True:
    query = input("Enter: \n")
    if query.lower() == "exit":
        break

    stop_timer = False
    print("\nThinking...")

    timer_thread = threading.Thread(target=live_timer)
    timer_thread.start()

    start_time = time.time()
    result = model.respond(query)
    stop_timer = True
    timer_thread.join()

    print(result)
    result = result.content
    elapsed_time = time.time() - start_time
    print(f"\nTotal response time: {elapsed_time:.2f} seconds")
    print("\n _________________________________________\n")