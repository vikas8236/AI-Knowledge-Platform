from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session
from app.services.ai_service import get_ai_response
from app.core.deps import get_current_user
from app.core import crud
from app.db.database import get_db

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[int] = None


class ChatResponse(BaseModel):
    response: str
    conversation_id: int


@router.post("/", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if request.conversation_id:
        conversation = crud.get_conversation_by_id(db, request.conversation_id)
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        if conversation.user_id != current_user.id:
            raise HTTPException(status_code=403, detail="Not your conversation")
    else:
        title = request.message[:50]
        conversation = crud.create_conversation(db, user_id=current_user.id, title=title)

    crud.create_message(db, conversation_id=conversation.id, role="user", content=request.message)

    ai_response = await get_ai_response(request.message)

    crud.create_message(db, conversation_id=conversation.id, role="assistant", content=ai_response)

    return {"response": ai_response, "conversation_id": conversation.id}

