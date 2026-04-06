from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints.api import api_router
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from app.core.auth import verify_password, create_access_token, SECRET_KEY, ALGORITHM
from app.core.crud import get_user_by_username
from app.db.database import get_db
from app.schemas.UserModel import Token, TokenData, UserResponse
from datetime import timedelta
from app.core.deps import get_current_user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.post("/token", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = get_user_by_username(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    token = create_access_token(
        data={"sub": user.username},
        expires_delta=timedelta(minutes=30),
    )
    return {"access_token": token, "token_type": "bearer"}

@app.get("/me", response_model=UserResponse)
def read_me(current_user=Depends(get_current_user)):
    return current_user