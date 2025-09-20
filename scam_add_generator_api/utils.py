from string import ascii_letters
from google.genai.types import Schema,Part,Type,ThinkingConfig,GenerateContentConfig, Content, Part
from json import loads
import string
import random
import re

def get_model_chunks(model,prompt,system_prompt,client):
    return  client.models.generate_content_stream(
                model=model,
                contents=[ Content(
                    role="user",
                    parts= [ Part.from_text(text=prompt)],
                )],
                config=GenerateContentConfig(
                    thinking_config = ThinkingConfig(
                        thinking_budget=0,
                    ),
                    response_mime_type="application/json",
                    response_schema=Schema(
                        type = Type.OBJECT,
                        required = ["message"],
                        properties = {
                            "message": Schema(
                                type = Type.ARRAY,
                                items = Schema(
                                    type = Type.STRING,
                                ),
                            ),
                        },
                    ),
                    system_instruction=[
                        Part.from_text(text=system_prompt),
                    ],
                )
            )

def get_suspicious_link():
    # random.seed(42)
    characters = string.ascii_letters
    length = random.randint(4,8)
    url_chars = [characters[random.randint(0,len(characters)-1)] for i in range(length)]
    suspicious_link = f"https://click.link/{''.join(url_chars)}"

    return suspicious_link

def get_model_response(model,prompt,system_prompt,client):
    full_text = ''
    
    
    for chunk in get_model_chunks(model,prompt,system_prompt,client):
        
        
        full_text += chunk.text
    
    messages = loads(full_text)['message']

    return [msg.format(link = get_suspicious_link()) for msg in messages]