
# Ensure Pinecone API key is set in environment
import os
from dotenv import load_dotenv
load_dotenv()
from pinecone import Pinecone, ServerlessSpec

if 'PINECONE_API_KEY' in os.environ:
    pc = Pinecone(api_key=os.environ['PINECONE_API_KEY'])
else:
    raise ValueError('PINECONE_API_KEY not found in environment. Please set it in your .env file.')

def get_or_create_child_index(child_id: str, dimension: int = 1536) -> str:
    index_name = f"child_{child_id}"
    # Check if index exists
    if index_name not in pc.list_indexes().names():
        pc.create_index(
            name=index_name,
            dimension=dimension,
            metric="cosine",
            spec=ServerlessSpec(
                cloud="aws",
                region="us-east-1"
            )
        )
    return index_name
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from dotenv import load_dotenv
load_dotenv()
# FastAPI setup
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Updated request model to accept child_id
class QueryRequest(BaseModel):
    question: str
    child_id: str = None


@app.post("/ask-ai")
async def ask_ai(request: QueryRequest):
    # Use child_id to select Pinecone index
    if not request.child_id:
        return {"error": "child_id is required"}

    index_name = get_or_create_child_index(request.child_id)
    # Load embeddings and set up retriever
    from langchain_openai import OpenAIEmbeddings, ChatOpenAI
    from langchain_pinecone import PineconeVectorStore
    from langchain.memory import ConversationBufferMemory
    from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate

    embeddings = OpenAIEmbeddings(model='text-embedding-3-small', dimensions=1536)
    vector_store = PineconeVectorStore.from_existing_index(index_name, embeddings)
    retriever = vector_store.as_retriever(search_type='similarity', search_kwargs={'k': 5})

    llm = ChatOpenAI(model='gpt-4.1-nano', temperature=0)
    memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)
    system_template = r'''
    Use the following pieces of context to answer the user's questions.
    If you don’t find the answer in the provided context, just say “I don’t know”.
    -------------
    Context:```{context}```
    '''
    user_template = '''
    Question : ```{question}```
    Chat history : ```{chat_history}```
    '''
    messages = [
        SystemMessagePromptTemplate.from_template(system_template),
        HumanMessagePromptTemplate.from_template(user_template)
    ]
    qna_prompt = ChatPromptTemplate.from_messages(messages)

    # Retrieve relevant docs
    docs = retriever.get_relevant_documents(request.question)
    context = "\n".join([doc.page_content for doc in docs])
    chat_history = []  # You may want to persist this per user/session
    prompt = qna_prompt.format(context=context, question=request.question, chat_history=chat_history)
    response = llm.invoke(prompt)
    return {"answer": response.content}


