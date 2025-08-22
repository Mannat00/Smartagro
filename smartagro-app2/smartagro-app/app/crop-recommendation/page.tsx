'use client';
import { cropInfo } from '@/lib/cropInfo';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Leaf,
  ArrowLeft,
  MapPin,
  Calendar,
  Sprout,
  CloudSun,
} from 'lucide-react';
import Link from 'next/link';

const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

const seasons = ['Kharif', 'Rabi', 'Zaid'];

const previousCrops = [
  'Rice',
  'Wheat',
  'Maize',
  'Cotton',
  'Sugarcane',
  'Soybean',
  'Groundnut',
  'Sunflower',
  'Mustard',
  'Gram',
  'Pigeon Pea',
  'Black Gram',
  'Green Gram',
  'Lentil',
  'Barley',
  'Jowar',
  'Bajra',
  'Ragi',
  'Sesame',
  'Castor',
  'Jute',
  'None',
];

export default function CropRecommendationPage() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedPreviousCrop, setSelectedPreviousCrop] = useState('');
  const [climateData, setClimateData] = useState<any | null>(null);
  const [recommendation, setRecommendation] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetRecommendations = async () => {
    if (!selectedState || !selectedSeason || !selectedPreviousCrop) {
      alert('Please select all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/recommend-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: selectedState }),
      });

      if (!res.ok) throw new Error('Failed to fetch recommendation');
      const data = await res.json();

      // your mainfn.py returns: { state, climate, NPK, predicted_crop }
      setRecommendation(data);
      setClimateData(data.climate);
    } catch (err) {
      console.error(err);
      alert('Something went wrong while fetching recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-green-600"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </Link>
              <div className="bg-green-600 p-2 rounded-lg ml-4">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Crop Recommendation
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-green-600" />
              Crop Selection Parameters
            </CardTitle>
            <CardDescription>
              Select your location, season, and previous crop to get AI-powered
              recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* State Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  State
                </label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Season Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Season
                </label>
                <Select
                  value={selectedSeason}
                  onValueChange={setSelectedSeason}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((season) => (
                      <SelectItem key={season} value={season}>
                        {season}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Previous Crop Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  Previous Crop
                </label>
                <Select
                  value={selectedPreviousCrop}
                  onValueChange={setSelectedPreviousCrop}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select previous crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {previousCrops.map((crop) => (
                      <SelectItem key={crop} value={crop}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Climate Data Display */}
            {climateData && (
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <CloudSun className="h-5 w-5 text-blue-600" />
                  Current Climate Data for {selectedState}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(climateData.temperature)}°C
                    </div>
                    <div className="text-sm text-gray-600">Temperature</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(climateData.humidity)}%
                    </div>
                    <div className="text-sm text-gray-600">Humidity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(climateData.rainfall)}mm
                    </div>
                    <div className="text-sm text-gray-600">Annual Rainfall</div>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleGetRecommendations}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading
                ? 'Getting Recommendations...'
                : 'Get AI Recommendations'}
            </Button>
          </CardContent>
        </Card>

        {/* Recommendation Section */}
        {recommendation && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recommended Crop
            </h2>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl uppercase">
                  {recommendation.predicted_crop}
                </CardTitle>
                <CardDescription>
                  Based on climate and soil conditions in {recommendation.state}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    {
                      cropInfo[recommendation.predicted_crop.toLowerCase()]
                        ?.description
                    }
                  </div>
                  <div>
                    {
                      cropInfo[recommendation.predicted_crop.toLowerCase()]
                        ?.tips
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
