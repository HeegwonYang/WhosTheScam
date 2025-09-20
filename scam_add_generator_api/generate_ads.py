import os
from os.path import join
from pydoc import text
from google.genai import Client
from utils import get_model_response
from AdItem import AdItem
from fastapi import FastAPI

app = FastAPI()

client = Client(api_key=os.environ.get('GEMINI_API_KEY'))

@app.get("/generate_ads/{level}/{sublevel}/{num_messages}")
def generate_ads(level=1,sublevel=1,num_messages=10):
  
    model = "gemini-2.5-flash-lite"
    prompt = open(join('./prompt_levels',f'level{level}_{sublevel}.txt')).read().format(num_messages = num_messages)
    system_prompt = open(join('./system_prompt.txt')).read()    
    text_messages = get_model_response(model,prompt,system_prompt,client)
    # print(text_messages)
    return {"messages": text_messages}

if __name__ == "__main__":
    generate_ads()
