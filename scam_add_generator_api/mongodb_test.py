
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os


def create_mongodb_client_connection():
    uri = f"mongodb+srv://clucafoc_db_user:{os.environ.get("MONGO_DB_PWD")}@cluster0.p1phbfj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    # Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))

    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        return client
    except Exception as e:
        print(e)
        return None