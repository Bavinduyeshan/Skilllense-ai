from typing import List, Dict

# Learning resource database
LEARNING_RESOURCES = {
    # Programming Languages
    "python": {
        "courses": [
            {"name": "Python for Everybody", "platform": "Coursera", "url": "https://www.coursera.org/specializations/python"},
            {"name": "Complete Python Bootcamp", "platform": "Udemy", "url": "https://www.udemy.com/course/complete-python-bootcamp/"},
            {"name": "Python Tutorial", "platform": "W3Schools", "url": "https://www.w3schools.com/python/"}
        ],
        "priority": "high"
    },
    
    "javascript": {
        "courses": [
            {"name": "JavaScript: The Complete Guide", "platform": "Udemy", "url": "https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/"},
            {"name": "JavaScript Algorithms", "platform": "freeCodeCamp", "url": "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/"},
            {"name": "Modern JavaScript", "platform": "JavaScript.info", "url": "https://javascript.info/"}
        ],
        "priority": "high"
    },
    
    "java": {
        "courses": [
            {"name": "Java Programming Masterclass", "platform": "Udemy", "url": "https://www.udemy.com/course/java-the-complete-java-developer-course/"},
            {"name": "Java Tutorial", "platform": "Oracle", "url": "https://docs.oracle.com/javase/tutorial/"},
        ],
        "priority": "high"
    },
    
    # Web Development
    "react": {
        "courses": [
            {"name": "React - The Complete Guide", "platform": "Udemy", "url": "https://www.udemy.com/course/react-the-complete-guide-incl-redux/"},
            {"name": "React Official Docs", "platform": "React.dev", "url": "https://react.dev/learn"},
            {"name": "Full Stack Open", "platform": "University of Helsinki", "url": "https://fullstackopen.com/en/"}
        ],
        "priority": "high"
    },
    
    "node.js": {
        "courses": [
            {"name": "Node.js Complete Guide", "platform": "Udemy", "url": "https://www.udemy.com/course/nodejs-the-complete-guide/"},
            {"name": "Node.js Documentation", "platform": "Node.js", "url": "https://nodejs.org/en/docs/"}
        ],
        "priority": "high"
    },
    
    "typescript": {
        "courses": [
            {"name": "Understanding TypeScript", "platform": "Udemy", "url": "https://www.udemy.com/course/understanding-typescript/"},
            {"name": "TypeScript Handbook", "platform": "TypeScript", "url": "https://www.typescriptlang.org/docs/handbook/intro.html"}
        ],
        "priority": "medium"
    },
    
    # Databases
    "sql": {
        "courses": [
            {"name": "SQL for Data Science", "platform": "Coursera", "url": "https://www.coursera.org/learn/sql-for-data-science"},
            {"name": "SQL Tutorial", "platform": "W3Schools", "url": "https://www.w3schools.com/sql/"}
        ],
        "priority": "high"
    },
    
    "mongodb": {
        "courses": [
            {"name": "MongoDB University", "platform": "MongoDB", "url": "https://learn.mongodb.com/"},
            {"name": "MongoDB Complete Guide", "platform": "Udemy", "url": "https://www.udemy.com/course/mongodb-the-complete-developers-guide/"}
        ],
        "priority": "medium"
    },
    
    # Cloud & DevOps
    "aws": {
        "courses": [
            {"name": "AWS Certified Solutions Architect", "platform": "AWS Training", "url": "https://aws.amazon.com/training/"},
            {"name": "AWS Fundamentals", "platform": "Coursera", "url": "https://www.coursera.org/learn/aws-fundamentals-going-cloud-native"}
        ],
        "priority": "high"
    },
    
    "docker": {
        "courses": [
            {"name": "Docker Mastery", "platform": "Udemy", "url": "https://www.udemy.com/course/docker-mastery/"},
            {"name": "Docker Documentation", "platform": "Docker", "url": "https://docs.docker.com/get-started/"}
        ],
        "priority": "medium"
    },
    
    "git": {
        "courses": [
            {"name": "Git & GitHub Crash Course", "platform": "YouTube", "url": "https://www.youtube.com/watch?v=RGOj5yH7evk"},
            {"name": "Git Documentation", "platform": "Git", "url": "https://git-scm.com/doc"}
        ],
        "priority": "high"
    },
    
    # Data Science & AI
    "machine learning": {
        "courses": [
            {"name": "Machine Learning Specialization", "platform": "Coursera", "url": "https://www.coursera.org/specializations/machine-learning-introduction"},
            {"name": "Machine Learning Crash Course", "platform": "Google", "url": "https://developers.google.com/machine-learning/crash-course"}
        ],
        "priority": "high"
    },
    
    "data science": {
        "courses": [
            {"name": "Data Science Specialization", "platform": "Coursera", "url": "https://www.coursera.org/specializations/jhu-data-science"},
            {"name": "Data Science Path", "platform": "Kaggle", "url": "https://www.kaggle.com/learn"}
        ],
        "priority": "high"
    }
}


def get_recommendations(missing_skills: List[str]) -> List[Dict]:
    """
    Generate learning recommendations for missing skills
    
    Args:
        missing_skills: List of skills the candidate is missing
        
    Returns:
        List of recommended learning resources
    """
    
    recommendations = []
    
    for skill in missing_skills:
        skill_lower = skill.lower()
        
        if skill_lower in LEARNING_RESOURCES:
            resource = LEARNING_RESOURCES[skill_lower]
            recommendations.append({
                "skill": skill,
                "priority": resource["priority"],
                "courses": resource["courses"]
            })
        else:
            # Generic recommendation
            recommendations.append({
                "skill": skill,
                "priority": "medium",
                "courses": [
                    {
                        "name": f"Search '{skill}' tutorials",
                        "platform": "YouTube",
                        "url": f"https://www.youtube.com/results?search_query={skill.replace(' ', '+')}+tutorial"
                    },
                    {
                        "name": f"Learn {skill}",
                        "platform": "Udemy",
                        "url": f"https://www.udemy.com/courses/search/?q={skill.replace(' ', '+')}"
                    }
                ]
            })
    
    # Sort by priority (high first)
    priority_order = {"high": 1, "medium": 2, "low": 3}
    recommendations.sort(key=lambda x: priority_order.get(x["priority"], 3))
    
    return recommendations


def generate_learning_path(missing_skills: List[str]) -> Dict:
    """
    Generate a structured learning path based on missing skills
    
    Args:
        missing_skills: List of missing skills
        
    Returns:
        Structured learning path with timeline
    """
    
    high_priority = []
    medium_priority = []
    low_priority = []
    
    for skill in missing_skills:
        skill_lower = skill.lower()
        if skill_lower in LEARNING_RESOURCES:
            priority = LEARNING_RESOURCES[skill_lower]["priority"]
            if priority == "high":
                high_priority.append(skill)
            elif priority == "medium":
                medium_priority.append(skill)
            else:
                low_priority.append(skill)
        else:
            medium_priority.append(skill)
    
    return {
        "immediate_focus": high_priority,  # Learn first (0-2 months)
        "short_term": medium_priority,      # Learn next (2-4 months)
        "long_term": low_priority,          # Learn later (4+ months)
        "estimated_timeline": f"{len(missing_skills) * 4} weeks",
        "total_skills": len(missing_skills)
    }