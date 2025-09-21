import os
from os.path import join,exists
from pydoc import text
from google.genai import Client
from utils import get_model_response
from fastapi import FastAPI
import json
import random
from datetime import datetime

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

@app.get("/update_score/{student_id}/{level}/{sublevel}/{score}")
def update_score(student_id=1,level=1,sublevel=1,score=1):
    
    try:
        if not(exists('./student_scores')): os.mkdir('./student_scores')
        timestamp = datetime.now().strftime(f'%Y-%m-%d-%H-%M-%S-{random.randint(10**2, 10**3-1)}')

        with open(f'./student_scores/{student_id}_{level}_{sublevel}_{timestamp}.json','w+') as f: 
            json.dump({"score":score},f)

        return "success"
    except e:
        print(e)
        return "failed"


@app.get("/update_correctness/{student_id}/{level}/{sublevel}/{question}/{correct_answer}/{student_answer}")
def update_correctness(student_id=1,level=1,sublevel=1,score=1):
    
    try:
        if not(exists('./student_answers')): os.mkdir('./student_answers')
        timestamp = datetime.now().strftime(f'%Y-%m-%d-%H-%M-%S-{random.randint(10**2, 10**3-1)}') 

        with open(f'./student_scores/{student_id}_{level}_{sublevel}_{timestamp}.json','w+') as f: 
            json.dump({"question":question,"correct_answer":correct_answer, "student_answer":student_answer},f)

        return "success"
    except e:
        print(e)
        return "failed"

if __name__ == "__main__":
    generate_ads()
