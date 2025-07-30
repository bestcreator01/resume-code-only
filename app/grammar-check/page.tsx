"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  FileText,
  MessageSquare,
  Target,
  Clock,
  Star,
  Zap,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function GrammarCheckPage() {
  const [grammarScore, setGrammarScore] = useState(0)
  const [matchScore, setMatchScore] = useState(0)
  const [resumeFileName, setResumeFileName] = useState("")
  const [jdLink, setJdLink] = useState("")
  const [activeTab, setActiveTab] = useState<"jd-match" | "grammar" | "questions">("grammar")
  const router = useRouter()

  useEffect(() => {
    const storedResumeFileName = localStorage.getItem("resumeFileName")
    const storedJdLink = localStorage.getItem("jdLink")

    if (!storedResumeFileName || !storedJdLink) {
      router.push("/")
      return
    }

    setResumeFileName(storedResumeFileName)
    setJdLink(storedJdLink)

    // Animate grammar score
    const grammarTimer = setInterval(() => {
      setGrammarScore((prev) => {
        if (prev >= 85) {
          clearInterval(grammarTimer)
          return 85
        }
        return prev + 2
      })
    }, 50)

    // Animate match score
    const matchTimer = setInterval(() => {
      setMatchScore((prev) => {
        if (prev >= 78) {
          clearInterval(matchTimer)
          return 78
        }
        return prev + 2
      })
    }, 60)

    return () => {
      clearInterval(grammarTimer)
      clearInterval(matchTimer)
    }
  }, [router])

  const grammarIssues = [
    {
      type: "error",
      section: "Professional Summary",
      original: "I am a experienced software developer with 5 years of experience.",
      suggestion: "I am an experienced software developer with 5 years of experience.",
      explanation: "Use 'an' before words starting with vowel sounds.",
    },
    {
      type: "warning",
      section: "Work Experience",
      original: "Developed and maintained web applications using React, Node.js, and other technologies.",
      suggestion: "Developed and maintained web applications using React, Node.js, and MongoDB.",
      explanation: "Be specific about technologies rather than using vague terms like 'other technologies'.",
    },
    {
      type: "error",
      section: "Skills",
      original: "Proficient in JavaScript, Python, and have experience with cloud platforms.",
      suggestion: "Proficient in JavaScript and Python, with experience in cloud platforms.",
      explanation: "Maintain parallel structure in lists.",
    },
    {
      type: "warning",
      section: "Education",
      original: "Graduated with honors from University.",
      suggestion: "Graduated with honors from State University.",
      explanation: "Include the full name of the institution for clarity.",
    },
    {
      type: "suggestion",
      section: "Work Experience",
      original: "Worked on various projects and helped the team.",
      suggestion: "Led development of 3 major projects, resulting in 25% improved team efficiency.",
      explanation: "Use specific metrics and action verbs to demonstrate impact.",
    },
  ]

  const matchingKeywords = [
    { keyword: "JavaScript", status: "match" },
    { keyword: "React", status: "match" },
    { keyword: "Node.js", status: "match" },
    { keyword: "TypeScript", status: "partial" },
    { keyword: "AWS", status: "missing" },
    { keyword: "Docker", status: "match" },
    { keyword: "MongoDB", status: "match" },
    { keyword: "GraphQL", status: "missing" },
    { keyword: "Agile", status: "match" },
    { keyword: "Team Leadership", status: "partial" },
  ]

  const questions = {
    easy: [
      {
        question: "Tell me about yourself and your background in software development.",
        category: "General",
        tips: "Focus on your relevant experience, key skills, and what makes you a good fit for this role. Keep it concise and professional.",
      },
      {
        question: "Why are you interested in this position and our company?",
        category: "Motivation",
        tips: "Research the company beforehand. Mention specific aspects of the role or company culture that appeal to you.",
      },
    ],
    medium: [
      {
        question: "Describe a challenging project you worked on and how you overcame the obstacles.",
        category: "Problem Solving",
        tips: "Use the STAR method (Situation, Task, Action, Result). Focus on your problem-solving process and the positive outcome.",
      },
      {
        question: "How do you stay updated with the latest technologies and industry trends?",
        category: "Learning",
        tips: "Mention specific resources like blogs, conferences, courses, or communities. Show your commitment to continuous learning.",
      },
    ],
    hard: [
      {
        question:
          "Design a scalable system for handling real-time notifications for millions of users. Walk me through your architecture decisions.",
        category: "System Design",
        tips: "Start with requirements gathering, discuss scalability challenges, propose solutions like message queues, caching, and load balancing. Consider trade-offs.",
      },
    ],
  }

  const getIssueColor = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "suggestion":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="w-4 h-4" />
      case "warning":
        return <AlertTriangle className="w-4 h-4" />
      case "suggestion":
        return <Target className="w-4 h-4" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "match":
        return "bg-green-100 text-green-800 border-green-200"
      case "partial":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "missing":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "match":
        return <CheckCircle className="w-4 h-4" />
      case "partial":
        return <AlertCircle className="w-4 h-4" />
      case "missing":
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return <Star className="w-4 h-4" />
      case "medium":
        return <Clock className="w-4 h-4" />
      case "hard":
        return <Zap className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-blue-900">ResumeScope.ai</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Info */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">Analysis Results</h2>
          <p className="text-blue-700">
            Resume: <span className="font-medium">{resumeFileName}</span>
          </p>
          <p className="text-blue-700">
            Job Posting: <span className="font-medium">{jdLink}</span>
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg border border-blue-200 shadow-lg mb-8">
          <div className="flex border-b border-blue-200">
            <button
              onClick={() => setActiveTab("jd-match")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "jd-match"
                  ? "border-blue-600 text-blue-600 bg-blue-50"
                  : "border-transparent text-blue-700 hover:text-blue-900 hover:bg-blue-50"
              }`}
            >
              <Target className="w-4 h-4 inline mr-2" />
              JD Match Analysis
            </button>
            <button
              onClick={() => setActiveTab("grammar")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "grammar"
                  ? "border-blue-600 text-blue-600 bg-blue-50"
                  : "border-transparent text-blue-700 hover:text-blue-900 hover:bg-blue-50"
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Grammar Check
            </button>
            <button
              onClick={() => setActiveTab("questions")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "questions"
                  ? "border-blue-600 text-blue-600 bg-blue-50"
                  : "border-transparent text-blue-700 hover:text-blue-900 hover:bg-blue-50"
              }`}
            >
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Interview Questions
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "grammar" && (
          <>
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Grammar Score */}
              <Card className="lg:col-span-1 border-blue-200 shadow-lg">
                <CardHeader className="bg-blue-50 text-center">
                  <CardTitle className="text-blue-900">Grammar Score</CardTitle>
                  <CardDescription className="text-blue-700">Overall writing quality</CardDescription>
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray={`${grammarScore}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-blue-900">{grammarScore}%</span>
                    </div>
                  </div>
                  <p className="text-green-700 font-medium">Very Good</p>
                  <p className="text-sm text-blue-600 mt-2">Minor improvements needed</p>
                </CardContent>
              </Card>

              {/* Issues Summary */}
              <Card className="lg:col-span-3 border-blue-200 shadow-lg">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-900">Issues Summary</CardTitle>
                  <CardDescription className="text-blue-700">
                    Grammar, style, and content suggestions for your resume
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="text-2xl font-bold text-red-700">2</div>
                      <div className="text-sm text-red-600">Grammar Errors</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="text-2xl font-bold text-yellow-700">2</div>
                      <div className="text-sm text-yellow-600">Style Warnings</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-700">1</div>
                      <div className="text-sm text-blue-600">Suggestions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Issues */}
            <Card className="mt-8 border-blue-200 shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-900">Detailed Analysis</CardTitle>
                <CardDescription className="text-blue-700">
                  Specific issues found in your resume with suggestions for improvement
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {grammarIssues.map((issue, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge className={getIssueColor(issue.type)}>
                            {getIssueIcon(issue.type)}
                            <span className="ml-1 capitalize">{issue.type}</span>
                          </Badge>
                          <span className="text-sm text-blue-600 font-medium">{issue.section}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-red-700 mb-1">Original:</h4>
                          <p className="text-sm bg-red-50 p-2 rounded border border-red-200">{issue.original}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-green-700 mb-1">Suggested:</h4>
                          <p className="text-sm bg-green-50 p-2 rounded border border-green-200">{issue.suggestion}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-blue-700 mb-1">Explanation:</h4>
                          <p className="text-sm text-blue-600">{issue.explanation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Writing Tips */}
            <Card className="mt-8 border-blue-200 shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-900">Writing Tips for Resumes</CardTitle>
                <CardDescription className="text-blue-700">
                  Best practices to make your resume more effective
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900">Use Action Verbs</h4>
                        <p className="text-sm text-blue-700">
                          Start bullet points with strong action verbs like "developed," "led," "implemented."
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900">Quantify Achievements</h4>
                        <p className="text-sm text-blue-700">
                          Include numbers, percentages, and metrics to demonstrate impact.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900">Be Concise</h4>
                        <p className="text-sm text-blue-700">
                          Keep bullet points concise and focused on key accomplishments.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900">Consistent Formatting</h4>
                        <p className="text-sm text-blue-700">
                          Maintain consistent formatting, fonts, and spacing throughout.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900">Tailor Content</h4>
                        <p className="text-sm text-blue-700">
                          Customize your resume for each job application to match requirements.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900">Proofread Carefully</h4>
                        <p className="text-sm text-blue-700">
                          Always proofread for spelling, grammar, and formatting errors.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === "jd-match" && (
          <>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Match Score */}
              <Card className="lg:col-span-1 border-blue-200 shadow-lg">
                <CardHeader className="bg-blue-50 text-center">
                  <CardTitle className="text-blue-900">Overall Match Score</CardTitle>
                  <CardDescription className="text-blue-700">How well your resume matches this job</CardDescription>
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeDasharray={`${matchScore}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-blue-900">{matchScore}%</span>
                    </div>
                  </div>
                  <p className="text-blue-700 font-medium">Good Match</p>
                  <p className="text-sm text-blue-600 mt-2">Your resume aligns well with the job requirements</p>
                </CardContent>
              </Card>

              {/* Keyword Analysis */}
              <Card className="lg:col-span-2 border-blue-200 shadow-lg">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-900">Keyword Analysis</CardTitle>
                  <CardDescription className="text-blue-700">
                    Key skills and requirements from the job description
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Matching Keywords ({matchingKeywords.filter((k) => k.status === "match").length})
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {matchingKeywords
                          .filter((k) => k.status === "match")
                          .map((item, index) => (
                            <Badge key={index} className={getStatusColor(item.status)}>
                              {getStatusIcon(item.status)}
                              <span className="ml-1">{item.keyword}</span>
                            </Badge>
                          ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        Partially Matching ({matchingKeywords.filter((k) => k.status === "partial").length})
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {matchingKeywords
                          .filter((k) => k.status === "partial")
                          .map((item, index) => (
                            <Badge key={index} className={getStatusColor(item.status)}>
                              {getStatusIcon(item.status)}
                              <span className="ml-1">{item.keyword}</span>
                            </Badge>
                          ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        Missing Keywords ({matchingKeywords.filter((k) => k.status === "missing").length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {matchingKeywords
                          .filter((k) => k.status === "missing")
                          .map((item, index) => (
                            <Badge key={index} className={getStatusColor(item.status)}>
                              {getStatusIcon(item.status)}
                              <span className="ml-1">{item.keyword}</span>
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {activeTab === "questions" && (
          <>
            {/* Overview */}
            <Card className="mb-8 border-blue-200 shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-900 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Interview Preparation Overview
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Practice with these AI-generated questions tailored to the job description
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-700">2</div>
                    <div className="text-sm text-green-600">Easy Questions</div>
                    <div className="text-xs text-green-500 mt-1">Warm-up & Background</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-700">2</div>
                    <div className="text-sm text-yellow-600">Medium Questions</div>
                    <div className="text-xs text-yellow-500 mt-1">Experience & Skills</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                    <Zap className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-700">1</div>
                    <div className="text-sm text-red-600">Hard Question</div>
                    <div className="text-xs text-red-500 mt-1">Technical Challenge</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Easy Questions */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                <Star className="w-6 h-6 mr-2 text-green-600" />
                Easy Questions
              </h3>
              <div className="grid gap-6">
                {questions.easy.map((q, index) => (
                  <Card key={index} className="border-green-200 shadow-lg">
                    <CardHeader className="bg-green-50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-green-900">Question {index + 1}</CardTitle>
                        <Badge className={getDifficultyColor("easy")}>
                          {getDifficultyIcon("easy")}
                          <span className="ml-1">Easy</span>
                        </Badge>
                      </div>
                      <Badge variant="outline" className="w-fit">
                        {q.category}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-2">Question:</h4>
                          <p className="text-blue-800 text-lg">{q.question}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-2">Tips for answering:</h4>
                          <p className="text-blue-700">{q.tips}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Medium Questions */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-yellow-600" />
                Medium Questions
              </h3>
              <div className="grid gap-6">
                {questions.medium.map((q, index) => (
                  <Card key={index} className="border-yellow-200 shadow-lg">
                    <CardHeader className="bg-yellow-50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-yellow-900">Question {index + 1}</CardTitle>
                        <Badge className={getDifficultyColor("medium")}>
                          {getDifficultyIcon("medium")}
                          <span className="ml-1">Medium</span>
                        </Badge>
                      </div>
                      <Badge variant="outline" className="w-fit">
                        {q.category}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-2">Question:</h4>
                          <p className="text-blue-800 text-lg">{q.question}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-2">Tips for answering:</h4>
                          <p className="text-blue-700">{q.tips}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Hard Questions */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-red-600" />
                Hard Question
              </h3>
              <div className="grid gap-6">
                {questions.hard.map((q, index) => (
                  <Card key={index} className="border-red-200 shadow-lg">
                    <CardHeader className="bg-red-50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-red-900">Question {index + 1}</CardTitle>
                        <Badge className={getDifficultyColor("hard")}>
                          {getDifficultyIcon("hard")}
                          <span className="ml-1">Hard</span>
                        </Badge>
                      </div>
                      <Badge variant="outline" className="w-fit">
                        {q.category}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-2">Question:</h4>
                          <p className="text-blue-800 text-lg">{q.question}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-2">Tips for answering:</h4>
                          <p className="text-blue-700">{q.tips}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
