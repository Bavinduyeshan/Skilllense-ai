from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict


def calculate_match(resume_skills: List[str], job_skills: List[str]) -> Dict:
    """
    Calculate skill matching between resume and job description
    
    Args:
        resume_skills: List of skills from resume
        job_skills: List of skills from job description
        
    Returns:
        Dictionary containing matched skills, missing skills, and match percentage
    """
    
    resume_set = set(skill.lower() for skill in resume_skills)
    job_set = set(skill.lower() for skill in job_skills)
    
    # Find matched skills
    matched_skills = list(resume_set & job_set)
    
    # Find missing skills (in job but not in resume)
    missing_skills = list(job_set - resume_set)
    
    # Find extra skills (in resume but not in job)
    extra_skills = list(resume_set - job_set)
    
    # Calculate match percentage
    if len(job_skills) == 0:
        match_percentage = 0.0
    else:
        match_percentage = (len(matched_skills) / len(job_skills)) * 100
    
    return {
        "matched_skills": sorted(matched_skills),
        "missing_skills": sorted(missing_skills),
        "extra_skills": sorted(extra_skills),
        "match_percentage": round(match_percentage, 2),
        "match_count": len(matched_skills),
        "missing_count": len(missing_skills)
    }


def text_similarity(resume_text: str, job_text: str) -> float:
    """
    Calculate text similarity using TF-IDF and Cosine Similarity
    
    Args:
        resume_text: Full resume text
        job_text: Full job description text
        
    Returns:
        Similarity score as percentage (0-100)
    """
    
    try:
        # Create TF-IDF vectors
        vectorizer = TfidfVectorizer(
            max_features=500,
            stop_words='english',
            ngram_range=(1, 2)  # Consider unigrams and bigrams
        )
        
        # Fit and transform both texts
        tfidf_matrix = vectorizer.fit_transform([resume_text, job_text])
        
        # Calculate cosine similarity
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        
        # Convert to percentage
        similarity_percentage = similarity * 100
        
        return round(similarity_percentage, 2)
    
    except Exception as e:
        print(f"Error calculating similarity: {e}")
        return 0.0


def advanced_match_score(resume_skills: List[str], job_skills: List[str], 
                         resume_text: str, job_text: str) -> Dict:
    """
    Calculate comprehensive match score combining multiple factors
    
    Args:
        resume_skills: List of skills from resume
        job_skills: List of skills from job description
        resume_text: Full resume text
        job_text: Full job description text
        
    Returns:
        Dictionary with detailed scoring breakdown
    """
    
    # Basic skill match
    skill_match = calculate_match(resume_skills, job_skills)
    
    # Text similarity
    text_sim = text_similarity(resume_text, job_text)
    
    # Weighted overall score (60% skills, 40% text similarity)
    overall_score = (skill_match["match_percentage"] * 0.6) + (text_sim * 0.4)
    
    # Determine match level
    if overall_score >= 80:
        match_level = "Excellent Match"
    elif overall_score >= 60:
        match_level = "Good Match"
    elif overall_score >= 40:
        match_level = "Fair Match"
    else:
        match_level = "Poor Match"
    
    return {
        "overall_score": round(overall_score, 2),
        "skill_match_score": skill_match["match_percentage"],
        "text_similarity_score": text_sim,
        "match_level": match_level,
        "matched_skills": skill_match["matched_skills"],
        "missing_skills": skill_match["missing_skills"],
        "recommendation": get_match_recommendation(overall_score)
    }


def get_match_recommendation(score: float) -> str:
    """
    Provide recommendation based on match score
    
    Args:
        score: Overall match score
        
    Returns:
        Recommendation text
    """
    
    if score >= 80:
        return "Your profile is an excellent match! Apply with confidence."
    elif score >= 60:
        return "Good match! Consider highlighting your matching skills in your application."
    elif score >= 40:
        return "Fair match. Focus on learning the missing skills before applying."
    else:
        return "Consider gaining more relevant skills before applying to this role."