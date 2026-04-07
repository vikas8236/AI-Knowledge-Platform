from sqlalchemy.orm import Session
from app.models.models import User, Conversation, Message
from app.schemas.UserModel import UserCreate
from app.core.auth import hash_password

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_all_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()

def create_user(db: Session, user: UserCreate):
    hashed = hash_password(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    user = get_user_by_id(db, user_id)
    if user:
        db.delete(user)
        db.commit()
    return user

def create_conversation(db: Session, user_id: int, title: str):
    db_conversation = Conversation(
        title=title,
        user_id=user_id
    )
    db.add(db_conversation)
    db.commit()
    db.refresh(db_conversation)
    return db_conversation

def get_user_conversations(db: Session, user_id: int):
    return db.query(Conversation).filter(Conversation.user_id == user_id).all()

def get_conversation_by_id(db: Session, conversation_id: int):
    return db.query(Conversation).filter(Conversation.id == conversation_id).first()

def delete_conversation(db: Session, conversation_id: int):
    conversation = get_conversation_by_id(db, conversation_id)
    if conversation:
        db.delete(conversation)
        db.commit()
    return conversation

def create_message(db: Session, conversation_id: int, role: str, content: str):
    db_message = Message(
        content=content,
        role=role,
        conversation_id=conversation_id
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_conversation_messages(db: Session, conversation_id: int):
    return db.query(Message).filter(Message.conversation_id == conversation_id).all()


