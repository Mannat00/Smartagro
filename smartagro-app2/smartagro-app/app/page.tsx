import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, Bug, Beaker, TrendingUp, Users, MapPin } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">SmartAgro</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                Dashboard
              </Link>
              <Link href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                About
              </Link>
              <Link href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Agricultural Intelligence</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Revolutionize your farming with smart crop recommendations, disease identification, and fertilizer
            optimization powered by artificial intelligence.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">95%</span>
              </div>
              <p className="text-gray-600">Accuracy Rate</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">10K+</span>
              </div>
              <p className="text-gray-600">Farmers Helped</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">28</span>
              </div>
              <p className="text-gray-600">Indian States</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Smart Agricultural Solutions</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Crop Recommendation */}
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Crop Recommendation</CardTitle>
                <CardDescription className="text-gray-600">
                  Get AI-powered crop suggestions based on climate, season, and previous crops
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-gray-600 mb-6 space-y-2">
                  <li>• State-wise recommendations</li>
                  <li>• Seasonal analysis</li>
                  <li>• Climate data integration</li>
                  <li>• Top 3 crop suggestions</li>
                </ul>
                <Link href="/crop-recommendation">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Get Recommendations</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Disease Identification */}
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bug className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Disease Identification</CardTitle>
                <CardDescription className="text-gray-600">
                  Upload crop images for instant AI-powered disease detection and diagnosis
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-gray-600 mb-6 space-y-2">
                  <li>• Image-based detection</li>
                  <li>• Instant diagnosis</li>
                  <li>• Treatment suggestions</li>
                  <li>• Prevention tips</li>
                </ul>
                <Link href="/disease-identification">
                  <Button className="w-full bg-red-600 hover:bg-red-700">Identify Disease</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Fertilizer Recommendation */}
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Beaker className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Fertilizer Recommendation</CardTitle>
                <CardDescription className="text-gray-600">
                  Get optimal fertilizer suggestions based on crop, soil type, and budget
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-gray-600 mb-6 space-y-2">
                  <li>• Crop-specific analysis</li>
                  <li>• Soil type consideration</li>
                  <li>• Budget optimization</li>
                  <li>• Market price analysis</li>
                </ul>
                <Link href="/fertilizer-recommendation">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Fertilizer Plan</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">SmartAgro</h3>
            </div>
            <p className="text-gray-400 mb-4">Empowering farmers with AI-driven agricultural solutions</p>
            <p className="text-sm text-gray-500">© 2025 SmartAgro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
