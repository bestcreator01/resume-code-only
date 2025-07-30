"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Link, FileText, CheckCircle, MessageSquare, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [jdLink, setJdLink] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const router = useRouter()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setResumeFile(file)
    }
  }

  const handleAnalyze = async () => {
    if (!jdLink || !resumeFile) return

    setIsAnalyzing(true)

    // Store data in localStorage
    localStorage.setItem("jdLink", jdLink)
    localStorage.setItem("resumeFileName", resumeFile.name)

    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      // Navigate directly to overview page
      router.push("/overview")
    }, 3000)
  }

  const canAnalyze = jdLink && resumeFile
  const canViewQuestions = jdLink

  const navigateToPage = (page: string) => {
    if (jdLink) {
      localStorage.setItem("jdLink", jdLink)
    }
    if (resumeFile) {
      localStorage.setItem("resumeFileName", resumeFile.name)
    }
    router.push(page)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-blue-900">ResumeScope.ai</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#features" className="text-blue-700 hover:text-blue-900 font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-blue-700 hover:text-blue-900 font-medium">
                How it Works
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">AI-Powered Resume Analysis & Job Matching</h2>
          <p className="text-xl text-blue-700 mb-8 max-w-3xl mx-auto">
            Get instant feedback on your resume, match it against job descriptions, and prepare for interviews with
            AI-generated questions.
          </p>
        </div>

        {/* Main Upload Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-900 flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Upload & Analyze
              </CardTitle>
              <CardDescription className="text-blue-700">
                Upload your resume and job description link to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="jd-link" className="text-blue-900 font-medium">
                  Job Description Link
                </Label>
                <div className="relative">
                  <Link className="absolute left-3 top-3 w-4 h-4 text-blue-500" />
                  <Input
                    id="jd-link"
                    type="url"
                    placeholder="https://example.com/job-posting"
                    value={jdLink}
                    onChange={(e) => setJdLink(e.target.value)}
                    className="pl-10 border-blue-200 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume-upload" className="text-blue-900 font-medium">
                  Resume Upload
                </Label>
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-blue-700">{resumeFile ? resumeFile.name : "Click to upload your resume"}</p>
                    <p className="text-sm text-blue-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                  </label>
                </div>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!canAnalyze || isAnalyzing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Resume
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Features Overview */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">What You'll Get</h3>

            <Card className="border-blue-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">JD Match Score</h4>
                    <p className="text-blue-700 text-sm">
                      See how well your resume matches the job requirements with detailed keyword analysis.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Grammar Check</h4>
                    <p className="text-blue-700 text-sm">
                      Get AI-powered grammar suggestions and sentence improvements for your resume.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Interview Questions</h4>
                    <p className="text-blue-700 text-sm">
                      Practice with AI-generated interview questions tailored to the job description.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interview Questions Button - Always visible */}
            <div className="pt-4">
              <Button
                onClick={() => navigateToPage("/job-questions")}
                disabled={!canViewQuestions}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 flex items-center justify-center"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                {canViewQuestions ? "Practice Interview Questions" : "Add Job Description to Enable"}
              </Button>
              {canViewQuestions && !resumeFile && (
                <p className="text-sm text-blue-600 mt-2 text-center">
                  ✓ Job description added - Interview questions available!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <section id="how-it-works" className="bg-white rounded-2xl p-8 shadow-lg border border-blue-200">
          <h3 className="text-3xl font-bold text-blue-900 text-center mb-8">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">Upload & Submit</h4>
              <p className="text-blue-700">Provide your resume and the job description link you're interested in.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">AI Analysis</h4>
              <p className="text-blue-700">
                Our AI analyzes your resume against the job requirements and checks grammar.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">Get Results</h4>
              <p className="text-blue-700">
                Receive detailed feedback, match scores, and interview preparation questions.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
