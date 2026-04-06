from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_service import get_ai_response
from app.core.deps import get_current_user
from fastapi import Depends

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest, current_user = Depends(get_current_user)):
    response = await get_ai_response(request.message)
    return {"response": response}