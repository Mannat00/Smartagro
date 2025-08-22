"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Bug, ArrowLeft, Upload, Camera, AlertTriangle, CheckCircle, Info } from "lucide-react"
import Link from "next/link"

const sampleDiseaseResults = [
  {
    id: 1,
    name: "Late Blight",
    confidence: 94,
    severity: "High",
    crop: "Tomato",
    description: "Late blight is a destructive disease caused by the fungus-like organism Phytophthora infestans.",
    symptoms: [
      "Dark brown to black lesions on leaves",
      "White fuzzy growth on leaf undersides",
      "Rapid spreading in humid conditions",
      "Fruit rot with dark, firm lesions",
    ],
    treatment: [
      "Apply copper-based fungicides immediately",
      "Remove and destroy infected plant parts",
      "Improve air circulation around plants",
      "Apply preventive fungicide sprays",
    ],
    prevention: [
      "Plant resistant varieties when available",
      "Ensure proper spacing for air circulation",
      "Avoid overhead watering",
      "Monitor weather conditions for disease-favorable periods",
    ],
    urgency: "Immediate action required",
    image: "/late-blight-tomato-disease.png",
  },
]

export default function DiseaseIdentificationPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [results, setResults] = useState<typeof sampleDiseaseResults>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setResults([])
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async () => {
    if (!uploadedImage) return

    setAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate AI analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setAnalyzing(false)
          setResults(sampleDiseaseResults)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-red-600">
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </Link>
              <div className="bg-red-600 p-2 rounded-lg ml-4">
                <Bug className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Disease Identification</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-red-600" />
              Upload Crop Image
            </CardTitle>
            <CardDescription>
              Upload a clear image of your infected crop for AI-powered disease identification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-red-400 bg-red-50" : "border-gray-300 hover:border-red-400 hover:bg-red-50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadedImage ? (
                <div className="space-y-4">
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded crop"
                    className="max-w-md max-h-64 mx-auto rounded-lg shadow-md"
                  />
                  <div className="flex gap-4 justify-center">
                    <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                      Upload Different Image
                    </Button>
                    <Button onClick={analyzeImage} className="bg-red-600 hover:bg-red-700" disabled={analyzing}>
                      {analyzing ? "Analyzing..." : "Analyze Disease"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-900">Drag and drop your crop image here</p>
                    <p className="text-gray-600">or click to browse files</p>
                  </div>
                  <Button onClick={() => fileInputRef.current?.click()} className="bg-red-600 hover:bg-red-700">
                    Choose Image
                  </Button>
                </div>
              )}
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />

            {analyzing && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Bug className="h-5 w-5 text-red-600 animate-pulse" />
                  <span className="font-medium">Analyzing crop disease...</span>
                </div>
                <Progress value={analysisProgress} className="w-full" />
                <p className="text-sm text-gray-600">AI is examining the image for disease patterns and symptoms</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Disease Analysis Results</h2>

            {results.map((disease) => (
              <Card key={disease.id} className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-red-700">{disease.name}</CardTitle>
                      <CardDescription className="text-gray-600 mt-1">Detected in {disease.crop} crop</CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className="bg-red-600">{disease.confidence}% Confidence</Badge>
                      <Badge className={getSeverityColor(disease.severity)}>{disease.severity} Severity</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Urgency Alert */}
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800 font-medium">{disease.urgency}</AlertDescription>
                  </Alert>

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Disease Description
                    </h3>
                    <p className="text-gray-700">{disease.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Symptoms */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Bug className="h-4 w-4 text-red-600" />
                        Symptoms
                      </h3>
                      <ul className="space-y-2">
                        {disease.symptoms.map((symptom, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Treatment */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        Treatment
                      </h3>
                      <ul className="space-y-2">
                        {disease.treatment.map((treatment, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span>
                            {treatment}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Prevention */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Prevention
                      </h3>
                      <ul className="space-y-2">
                        {disease.prevention.map((prevention, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            {prevention}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4 border-t">
                    <Button className="bg-red-600 hover:bg-red-700">Get Treatment Products</Button>
                    <Button variant="outline">Consult Agricultural Expert</Button>
                    <Button variant="outline">Download Report</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Tips Section */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Photography Tips for Better Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <ul className="space-y-2">
                <li>• Take photos in good natural lighting</li>
                <li>• Focus on the affected areas clearly</li>
                <li>• Include both infected and healthy parts</li>
              </ul>
              <ul className="space-y-2">
                <li>• Avoid blurry or dark images</li>
                <li>• Capture multiple angles if possible</li>
                <li>• Ensure the disease symptoms are visible</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
