from fastapi import APIRouter
from app.api.v1.endpoints import chat, users, conversations

api_router = APIRouter()

api_router.include_router(chat.router, prefix="/chat", tags=["Chat"])
api_router.include_router(users.router)
api_router.include_router(conversations.router, prefix="/conversations", tags=["Conversations"])
