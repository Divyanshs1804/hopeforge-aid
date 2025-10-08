
# Ensure Pinecone API key is set in environment
import os
from dotenv import load_dotenv
load_dotenv()
import pinecone
from pinecone import ServerlessSpec

if 'PINECONE_API_KEY' in os.environ:
    pinecone.init(api_key=os.environ['PINECONE_API_KEY'])
else:
    raise ValueError('PINECONE_API_KEY not found in environment. Please set it in your .env file.')

pc = pinecone.Pinecone()

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
    from langchain_openai import OpenAIEmbeddings
    from langchain_pinecone import PineconeVectorStore
    embeddings = OpenAIEmbeddings(model='text-embedding-3-small', dimensions=1536)
    vector_store = PineconeVectorStore.from_existing_index(index_name, embeddings)
    retriever = vector_store.as_retriever(search_type='similarity', search_kwargs={'k': 5})

    # Set up ConversationalRetrievalChain
    from langchain_openai import ChatOpenAI
    from langchain.chains import ConversationalRetrievalChain
    from langchain.memory import ConversationBufferMemory
    from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
    llm = ChatOpenAI(model='gpt-4.1-nano', temperature=0)
    memory = ConversationBufferMemory(memory_key='chat_history', return_message=True)
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
    crc = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        memory=memory,
        combine_docs_chain_kwargs={'prompt': qna_prompt},
        chain_type='stuff',
        verbose=True
    )
    answer = crc.invoke({"question": request.question})
    return {"answer": answer}

# RAG and LangChain code (as provided)
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate

# Initialize LLM and retriever here (these will be dynamically loaded)
llm = ChatOpenAI(model='gpt-4.1-nano', temperature=0)
vector_store = None  # Placeholder; load dynamically later if needed
retriever = None if not vector_store else vector_store.as_retriever(search_type='similarity', search_kwargs={'k': 5})
memory = ConversationBufferMemory(memory_key='chat_history', return_message=True)
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
crc = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever,
    memory=memory,
    combine_docs_chain_kwargs={'prompt': qna_prompt},
    chain_type='stuff',
    verbose=True
)
