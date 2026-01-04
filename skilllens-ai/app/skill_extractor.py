import spacy
import re
from typing import List

# Load spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except:
    print("spaCy model not found. Run: python -m spacy download en_core_web_sm")
    nlp = None

# Comprehensive skill database
SKILL_PATTERNS = [
    # Programming Languages
    "python", "java", "javascript", "typescript", "c++", "c#", "php", "ruby",
    "go", "golang", "rust", "swift", "kotlin", "scala", "r", "matlab",
    
    # Web Development
    "html", "css", "react", "angular", "vue", "vue.js", "svelte", "next.js",
    "node.js", "express", "django", "flask", "fastapi", "spring boot",
    "asp.net", ".net", "laravel", "jquery", "bootstrap", "tailwind css",
    
    # Mobile Development
    "react native", "flutter", "ios", "android", "xamarin", "ionic",
    
    # Databases
    "sql", "mysql", "postgresql", "mongodb", "redis", "sqlite", "oracle",
    "cassandra", "dynamodb", "firebase", "supabase", "prisma",
    
    # Cloud & DevOps
    "aws", "azure", "google cloud", "gcp", "docker", "kubernetes", "jenkins",
    "git", "github", "gitlab", "ci/cd", "terraform", "ansible",
    
    # Data Science & AI
    "machine learning", "deep learning", "artificial intelligence", "ai",
    "nlp", "natural language processing", "computer vision", "data science",
    "data analysis", "tensorflow", "pytorch", "keras", "scikit-learn",
    "pandas", "numpy", "matplotlib", "tableau", "power bi",
    
    # Other Technical Skills
    "api", "rest api", "graphql", "microservices", "agile", "scrum",
    "unit testing", "integration testing", "selenium", "jest", "pytest",
    "linux", "bash", "shell scripting", "excel", "powerpoint",
    
    # Soft Skills
    "communication", "leadership", "teamwork", "problem solving",
    "critical thinking", "time management", "project management"
]


def extract_skills(text: str) -> List[str]:
    """
    Extract skills from text using pattern matching and NLP
    
    Args:
        text: Input text (resume or job description)
        
    Returns:
        List of unique skills found
    """
    text_lower = text.lower()
    found_skills = set()
    
    # Method 1: Pattern matching with predefined skills
    for skill in SKILL_PATTERNS:
        # Use word boundaries to avoid partial matches
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text_lower):
            found_skills.add(skill)
    
    # Method 2: spaCy NLP extraction
    if nlp:
        doc = nlp(text)
        
        # Extract noun chunks (potential skills)
        for chunk in doc.noun_chunks:
            chunk_text = chunk.text.lower().strip()
            if len(chunk_text) > 2 and chunk_text in text_lower:
                # Check if it matches any known skill
                for skill in SKILL_PATTERNS:
                    if skill in chunk_text or chunk_text in skill:
                        found_skills.add(skill)
        
        # Extract named entities (organizations, products)
        for ent in doc.ents:
            if ent.label_ in ["PRODUCT", "ORG", "TECH"]:
                ent_text = ent.text.lower().strip()
                if ent_text in [s.lower() for s in SKILL_PATTERNS]:
                    found_skills.add(ent_text)
    
    # Method 3: Common abbreviations and variations
    skill_variations = {
        "js": "javascript",
        "ts": "typescript",
        "py": "python",
        "ml": "machine learning",
        "dl": "deep learning",
        "k8s": "kubernetes",
        "reactjs": "react",
        "nodejs": "node.js",
        "vuejs": "vue.js",
    }
    
    for abbr, full_name in skill_variations.items():
        if re.search(r'\b' + abbr + r'\b', text_lower):
            found_skills.add(full_name)
    
    return sorted(list(found_skills))


def categorize_skills(skills: List[str]) -> dict:
    """
    Categorize skills into groups
    
    Args:
        skills: List of skills
        
    Returns:
        Dictionary with categorized skills
    """
    categories = {
        "programming": [],
        "web_development": [],
        "database": [],
        "cloud_devops": [],
        "data_science": [],
        "soft_skills": []
    }
    
    programming_keywords = ["python", "java", "javascript", "c++", "c#", "php"]
    web_keywords = ["react", "angular", "vue", "html", "css", "node"]
    db_keywords = ["sql", "mysql", "mongodb", "postgresql", "redis"]
    cloud_keywords = ["aws", "azure", "docker", "kubernetes", "git"]
    ds_keywords = ["machine learning", "ai", "data science", "tensorflow"]
    soft_keywords = ["communication", "leadership", "teamwork"]
    
    for skill in skills:
        if any(kw in skill for kw in programming_keywords):
            categories["programming"].append(skill)
        elif any(kw in skill for kw in web_keywords):
            categories["web_development"].append(skill)
        elif any(kw in skill for kw in db_keywords):
            categories["database"].append(skill)
        elif any(kw in skill for kw in cloud_keywords):
            categories["cloud_devops"].append(skill)
        elif any(kw in skill for kw in ds_keywords):
            categories["data_science"].append(skill)
        elif any(kw in skill for kw in soft_keywords):
            categories["soft_skills"].append(skill)
    
    return categories