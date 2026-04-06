from fastapi import APIRouter
from app.api.v1.endpoints import chat
from app.api.v1.endpoints import users

api_router = APIRouter()

api_router.include_router(chat.router, prefix="/chat", tags=["Chat"])
api_router.include_router(users.router)