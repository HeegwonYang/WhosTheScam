import os
from os.path import join
from pydoc import text
from google.genai import Client
from utils import get_model_response
from fastapi import FastAPI
from mongodb_test import create_mongodb_client_connection

app = FastAPI()

client = Client(api_key=os.environ.get('GEMINI_API_KEY'))

@app.get("/generate_ads/{level}/{sublevel}/{num_messages}")
def generate_ads(level=1,sublevel=1,num_messages=10):
  
    model = "gemini-2.5-flash-lite"
    prompt = open(join('./prompt_levels',f'level{level}_{sublevel}.txt')).read().format(num_messages = num_messages)
    system_prompt = open(join('./system_prompt.txt')).read()    
    text_messages = get_model_response(model,prompt,system_prompt,client)
    # print(text_messages)
    return text_messages

@app.post("/update_score/{level}/{sublevel}/{score}")
def update_score(level,sublevel,score):
    #TODO handle score storage in mongodb
    client = create_mongodb_client_connection()
    if client:
        print(level,sublevel,score)

@app.post("/store_answer_correctness/{level}/{sublevel}/{student_answer}/{correct_answer}")
def store_answer_correctness(level,sublevel,correct_answer,student_answer):
    #TODO handle student and correct answers
    client = create_mongodb_client_connection()
    if client:
        print(level,sublevel,correct_answer,student_answer)




if __name__ == "__main__":
    generate_ads()
