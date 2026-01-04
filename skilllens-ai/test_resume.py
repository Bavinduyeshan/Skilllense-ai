"""
Test script to verify the AI service is working
"""

import requests
import json

API_URL = "http://127.0.0.1:8000"

def test_health():
    """Test if API is running"""
    response = requests.get(f"{API_URL}/health")
    print("Health Check:", response.json())

def test_skill_extraction():
    """Test skill extraction"""
    test_text = """
    I am a software engineer with 5 years of experience in Python, JavaScript, and React.
    I have worked with AWS, Docker, and PostgreSQL databases.
    My skills include machine learning, data analysis, and API development.
    """
    
    response = requests.post(
        f"{API_URL}/extract-skills",
        data={"text": test_text}
    )
    
    print("\n=== Skill Extraction Test ===")
    print(json.dumps(response.json(), indent=2))

def test_full_analysis():
    """Test full resume analysis (requires a test PDF file)"""
    job_description = """
    We are looking for a Senior Software Engineer with strong experience in:
    - Python and JavaScript
    - React and Node.js
    - AWS cloud services
    - Docker and Kubernetes
    - PostgreSQL and MongoDB
    - Machine Learning and AI
    - Git version control
    """
    
    # You need to have a test PDF file for this
    # files = {"resume": open("test_resume.pdf", "rb")}
    # data = {"job_description": job_description}
    
    # response = requests.post(f"{API_URL}/analyze", files=files, data=data)
    # print("\n=== Full Analysis Test ===")
    # print(json.dumps(response.json(), indent=2))
    
    print("\n=== Full Analysis Test ===")
    print("Skipped: Please add a test_resume.pdf file and uncomment the code above")

if __name__ == "__main__":
    print("🚀 Testing SkillLens AI Service...\n")
    
    try:
        test_health()
        test_skill_extraction()
        test_full_analysis()
        print("\n✅ All tests completed!")
    except requests.exceptions.ConnectionError:
        print("❌ Error: API is not running. Start it with: uvicorn app.main:app --reload")
    except Exception as e:
        print(f"❌ Error: {e}")