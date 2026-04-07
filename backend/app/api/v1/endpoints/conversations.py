from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_service import get_ai_response
from app.core.deps import get_current_user
from fastapi import Depends

class ConversationRequest(BaseModel):
    title: str

class ConversationResponse(BaseModel):
    id: int
    title: str
    created_at: datetime
    updated_at: datetime

router = APIRouter()

@router.post("/conversations", response_model=ConversationResponse)
def create_conversation(request: ConversationRequest, current_user = Depends(get_current_user)):
    return crud.create_conversation(request.title, current_user.id)

@router.get("/conversations", response_model=List[ConversationResponse])
def get_conversations(current_user = Depends(get_current_user)):
    return crud.get_user_conversations(current_user.id)

@router.get("/conversations/{conversation_id}/messages", response_model=List[MessageResponse])
def get_conversation_messages(conversation_id: int, current_user = Depends(get_current_user)):
    return crud.get_converstion_messages(conversation_id)

@router.delete("/conversations/{conversation_id}", response_model=ConversationResponse)
def delete_conversation(conversation_id: int, current_user = Depends(get_current_user)):
    return crud.delete_conversation(conversation_id)

