"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Beaker, ArrowLeft, TrendingUp, Package, AlertCircle } from "lucide-react"
import Link from "next/link"

const crops = [
  "Rice",
  "Wheat",
  "Maize",
  "Cotton",
  "Sugarcane",
  "Soybean",
  "Groundnut",
  "Sunflower",
  "Mustard",
  "Gram",
  "Pigeon Pea",
  "Black Gram",
  "Green Gram",
  "Lentil",
  "Barley",
  "Jowar",
  "Bajra",
  "Ragi",
  "Sesame",
  "Castor",
]

const soilTypes = [
  "Alluvial Soil",
  "Black Soil (Regur)",
  "Red Soil",
  "Laterite Soil",
  "Desert Soil",
  "Mountain Soil",
  "Saline Soil",
  "Peaty Soil",
]

const sampleFertilizerRecommendations = [
  {
    id: 1,
    name: "NPK 20-20-0",
    type: "Complex Fertilizer",
    price: 850,
    pricePerKg: 17,
    quantity: "50 kg",
    coverage: "1 acre",
    nutrients: { nitrogen: 20, phosphorus: 20, potassium: 0 },
    benefits: ["Promotes vegetative growth", "Improves root development", "Enhances flowering"],
    applicationTime: "Basal application during sowing",
    dosage: "50-75 kg per acre",
    marketTrend: "stable",
    availability: "High",
    brand: "IFFCO",
  },
  {
    id: 2,
    name: "Urea",
    type: "Nitrogen Fertilizer",
    price: 300,
    pricePerKg: 6,
    quantity: "50 kg",
    coverage: "2 acres",
    nutrients: { nitrogen: 46, phosphorus: 0, potassium: 0 },
    benefits: ["Quick nitrogen supply", "Promotes leaf growth", "Cost effective"],
    applicationTime: "Top dressing after 3-4 weeks",
    dosage: "25-30 kg per acre",
    marketTrend: "decreasing",
    availability: "Very High",
    brand: "Government Subsidy",
  },
  {
    id: 3,
    name: "DAP (Di-Ammonium Phosphate)",
    type: "Phosphatic Fertilizer",
    price: 1350,
    pricePerKg: 27,
    quantity: "50 kg",
    coverage: "1.5 acres",
    nutrients: { nitrogen: 18, phosphorus: 46, potassium: 0 },
    benefits: ["Root development", "Flowering enhancement", "Seed formation"],
    applicationTime: "Basal application",
    dosage: "30-40 kg per acre",
    marketTrend: "increasing",
    availability: "Medium",
    brand: "IFFCO/NFL",
  },
]

export default function FertilizerRecommendationPage() {
  const [selectedCrop, setSelectedCrop] = useState("")
  const [selectedSoilType, setSelectedSoilType] = useState("")
  const [budget, setBudget] = useState([2000])
  const [acreage, setAcreage] = useState("")
  const [recommendations, setRecommendations] = useState<typeof sampleFertilizerRecommendations>([])
  const [loading, setLoading] = useState(false)
  const [marketAnalysis, setMarketAnalysis] = useState({
    totalCost: 0,
    costPerAcre: 0,
    savings: 0,
    subsidyAvailable: true,
  })

  const handleGetRecommendations = async () => {
    if (!selectedCrop || !selectedSoilType || !acreage) {
      alert("Please fill all fields")
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const filteredRecommendations = sampleFertilizerRecommendations.filter(
        (fertilizer) => fertilizer.price <= budget[0],
      )
      setRecommendations(filteredRecommendations)

      // Calculate market analysis
      const totalCost = filteredRecommendations.reduce((sum, fert) => sum + fert.price, 0)
      const costPerAcre = totalCost / Number.parseFloat(acreage)
      setMarketAnalysis({
        totalCost,
        costPerAcre,
        savings: budget[0] - totalCost,
        subsidyAvailable: true,
      })

      setLoading(false)
    }, 2000)
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "increasing":
        return "text-red-600"
      case "decreasing":
        return "text-green-600"
      case "stable":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return "↗"
      case "decreasing":
        return "↘"
      case "stable":
        return "→"
      default:
        return "→"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </Link>
              <div className="bg-blue-600 p-2 rounded-lg ml-4">
                <Beaker className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Fertilizer Recommendation</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              Fertilizer Selection Parameters
            </CardTitle>
            <CardDescription>
              Select your crop, soil type, and budget to get optimal fertilizer recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Crop Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Crop Type</label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop} value={crop}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Soil Type Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Soil Type</label>
                <Select value={selectedSoilType} onValueChange={setSelectedSoilType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map((soil) => (
                      <SelectItem key={soil} value={soil}>
                        {soil}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Acreage Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Farm Area (acres)</label>
                <Input
                  type="number"
                  placeholder="Enter area in acres"
                  value={acreage}
                  onChange={(e) => setAcreage(e.target.value)}
                />
              </div>

              {/* Budget Display */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Budget: ₹{budget[0].toLocaleString()}</label>
                <div className="px-2">
                  <Slider
                    value={budget}
                    onValueChange={setBudget}
                    max={10000}
                    min={500}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹500</span>
                    <span>₹10,000</span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleGetRecommendations}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Analyzing Market & Recommendations..." : "Get Fertilizer Recommendations"}
            </Button>
          </CardContent>
        </Card>

        {/* Market Analysis */}
        {recommendations.length > 0 && (
          <Card className="mb-8 bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <TrendingUp className="h-5 w-5" />
                Market Analysis & Budget Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹{marketAnalysis.totalCost}</div>
                  <div className="text-sm text-gray-600">Total Cost</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹{Math.round(marketAnalysis.costPerAcre)}</div>
                  <div className="text-sm text-gray-600">Cost per Acre</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">₹{marketAnalysis.savings}</div>
                  <div className="text-sm text-gray-600">Budget Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {marketAnalysis.subsidyAvailable ? "Available" : "Not Available"}
                  </div>
                  <div className="text-sm text-gray-600">Govt. Subsidy</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Fertilizers</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {recommendations.map((fertilizer) => (
                <Card key={fertilizer.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{fertilizer.name}</CardTitle>
                        <CardDescription>{fertilizer.type}</CardDescription>
                      </div>
                      <Badge className="bg-blue-600">{fertilizer.availability}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Price Information */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-blue-600">₹{fertilizer.price}</span>
                        <span className="text-sm text-gray-600">({fertilizer.quantity})</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">₹{fertilizer.pricePerKg}/kg</span>
                        <span className={`flex items-center gap-1 ${getTrendColor(fertilizer.marketTrend)}`}>
                          {getTrendIcon(fertilizer.marketTrend)} {fertilizer.marketTrend}
                        </span>
                      </div>
                    </div>

                    {/* Nutrient Content */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Nutrient Content</h4>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center bg-green-100 p-2 rounded">
                          <div className="font-bold text-green-700">{fertilizer.nutrients.nitrogen}%</div>
                          <div className="text-green-600">N</div>
                        </div>
                        <div className="text-center bg-orange-100 p-2 rounded">
                          <div className="font-bold text-orange-700">{fertilizer.nutrients.phosphorus}%</div>
                          <div className="text-orange-600">P</div>
                        </div>
                        <div className="text-center bg-purple-100 p-2 rounded">
                          <div className="font-bold text-purple-700">{fertilizer.nutrients.potassium}%</div>
                          <div className="text-purple-600">K</div>
                        </div>
                      </div>
                    </div>

                    {/* Application Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coverage:</span>
                        <span className="font-medium">{fertilizer.coverage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dosage:</span>
                        <span className="font-medium">{fertilizer.dosage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Brand:</span>
                        <span className="font-medium">{fertilizer.brand}</span>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Benefits</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {fertilizer.benefits.slice(0, 3).map((benefit, idx) => (
                          <li key={idx}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Application Time */}
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Application Time</span>
                      </div>
                      <p className="text-sm text-blue-700">{fertilizer.applicationTime}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700" size="sm">
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="sm">
                        Compare
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tips Section */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800">Fertilizer Application Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
              <ul className="space-y-2">
                <li>• Apply fertilizers during cool hours (early morning/evening)</li>
                <li>• Ensure adequate soil moisture before application</li>
                <li>• Follow recommended dosage to avoid over-fertilization</li>
              </ul>
              <ul className="space-y-2">
                <li>• Mix fertilizers uniformly for even distribution</li>
                <li>• Store fertilizers in dry, cool places</li>
                <li>• Consider soil testing for precise nutrient management</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
