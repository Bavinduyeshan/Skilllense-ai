from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import PyPDF2
import docx
import io
from typing import Optional

from app.skill_extractor import extract_skills
from app.matcher import calculate_match, text_similarity
from app.recommender import get_recommendations

app = FastAPI(
    title="SkillLens AI Service",
    description="AI-powered resume analysis and skill gap detection",
    version="1.0.0"
)

# CORS - Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "SkillLens AI Service is Running",
        "status": "active",
        "version": "1.0.0"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    """
    Main endpoint for resume analysis
    
    Parameters:
    - resume: PDF or DOCX file
    - job_description: Text input of job posting
    
    Returns:
    - Skill match analysis
    - Missing skills
    - Learning recommendations
    """
    
    try:
        # Validate file type
        if not resume.filename.endswith(('.pdf', '.docx')):
            raise HTTPException(
                status_code=400, 
                detail="Only PDF and DOCX files are supported"
            )
        
        # Extract text from resume
        file_bytes = await resume.read()
        
        if resume.filename.endswith('.pdf'):
            resume_text = extract_text_from_pdf(file_bytes)
        else:
            resume_text = extract_text_from_docx(file_bytes)
        
        # Validate extracted text
        if len(resume_text.strip()) < 50:
            raise HTTPException(
                status_code=400,
                detail="Resume text is too short or could not be extracted properly"
            )
        
        # Extract skills from both documents
        resume_skills = extract_skills(resume_text)
        job_skills = extract_skills(job_description)
        
        # Calculate matching
        match_result = calculate_match(resume_skills, job_skills)
        similarity_score = text_similarity(resume_text, job_description)
        
        # Get learning recommendations for missing skills
        recommendations = get_recommendations(match_result["missing_skills"])
        
        return JSONResponse(content={
            "success": True,
            "data": {
                "resume_skills": resume_skills,
                "job_skills": job_skills,
                "matched_skills": match_result["matched_skills"],
                "missing_skills": match_result["missing_skills"],
                "match_percentage": match_result["match_percentage"],
                "similarity_score": similarity_score,
                "recommendations": recommendations,
                "analysis_summary": {
                    "total_job_skills": len(job_skills),
                    "total_resume_skills": len(resume_skills),
                    "matched_count": len(match_result["matched_skills"]),
                    "missing_count": len(match_result["missing_skills"])
                }
            }
        })
        
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract text from PDF file"""
    try:
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"PDF extraction failed: {str(e)}")


def extract_text_from_docx(file_bytes: bytes) -> str:
    """Extract text from DOCX file"""
    try:
        doc = docx.Document(io.BytesIO(file_bytes))
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"DOCX extraction failed: {str(e)}")


@app.post("/extract-skills")
async def extract_skills_endpoint(text: str = Form(...)):
    """
    Endpoint to extract skills from any text
    """
    try:
        skills = extract_skills(text)
        return {
            "success": True,
            "skills": skills,
            "count": len(skills)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)