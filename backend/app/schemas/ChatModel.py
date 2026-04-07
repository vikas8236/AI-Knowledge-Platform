class ConversationCreate(BaseModel):
    title: str

class ConversationResponse(BaseModel):
    id: int
    title: str
    created_at: datetime
    updated_at: datetime

class MessageCreate(BaseModel):
    content: str
    conversation_id: int
    role: str

class MessageResponse(BaseModel):
    id: int
    role: str
    content: str
    created_at: datetime

