// cropInfo.ts
export interface CropInfo {
  name: string;
  description: string;
  tips: string[];
  image: string;
}

export const cropInfo: Record<string, CropInfo> = {
  rice: {
    name: "Rice",
    description: "A staple food that needs lots of water and warm weather.",
    tips: [
      "Grows best in clay soil with good water retention.",
      "Requires flooded fields or consistent irrigation.",
      "Usually planted in Kharif season (monsoon)."
    ],
    image: "/images/rice.jpg",
  },
  maize: {
    name: "Maize (Corn)",
    description: "A versatile crop used for food, fodder, and industrial purposes.",
    tips: [
      "Needs fertile, well-drained soil.",
      "Requires moderate water and sunlight.",
      "Can be grown in both Kharif and Rabi seasons."
    ],
    image: "/images/maize.jpg",
  },
  chickpea: {
    name: "Chickpea",
    description: "A protein-rich pulse commonly used in Indian kitchens.",
    tips: [
      "Best grown in cool, dry climates.",
      "Requires less water compared to cereals.",
      "Prefers sandy loam soils."
    ],
    image: "/images/chickpea.jpg",
  },
  kidneybeans: {
    name: "Kidney Beans (Rajma)",
    description: "Popular legume known for its use in North Indian curries.",
    tips: [
      "Grows well in warm climates.",
      "Requires moderate rainfall and good drainage.",
      "Sensitive to waterlogging."
    ],
    image: "/images/kidneybeans.jpg",
  },
  pigeonpeas: {
    name: "Pigeon Peas (Arhar/Tur)",
    description: "A staple pulse crop used for dal in India.",
    tips: [
      "Tolerates dry conditions.",
      "Prefers loamy soils.",
      "Grown mainly in Kharif season."
    ],
    image: "/images/pigeonpeas.jpg",
  },
  mothbeans: {
    name: "Moth Beans",
    description: "A drought-tolerant pulse crop grown in arid areas.",
    tips: [
      "Thrives in sandy soils.",
      "Needs minimal water.",
      "Common in Rajasthan and dry regions."
    ],
    image: "/images/mothbeans.jpg",
  },
  mungbean: {
    name: "Mung Bean (Moong)",
    description: "A short-duration pulse crop, very nutritious.",
    tips: [
      "Can grow in different soils.",
      "Needs warm weather.",
      "Best in loamy, well-drained soils."
    ],
    image: "/images/mungbean.jpg",
  },
  blackgram: {
    name: "Black Gram (Urad)",
    description: "A major pulse crop rich in protein.",
    tips: [
      "Requires warm, humid climate.",
      "Tolerates dry conditions but not waterlogging.",
      "Short-duration crop."
    ],
    image: "/images/blackgram.jpg",
  },
  lentil: {
    name: "Lentil (Masoor)",
    description: "A widely consumed pulse crop in India.",
    tips: [
      "Grows in cool, dry climates.",
      "Needs well-drained sandy loam soil.",
      "Requires low to moderate water."
    ],
    image: "/images/lentil.jpg",
  },
  pomegranate: {
    name: "Pomegranate",
    description: "A fruit crop known for its juicy, red arils.",
    tips: [
      "Needs hot, dry climate.",
      "Prefers loamy soils.",
      "Tolerates drought but not waterlogging."
    ],
    image: "/images/pomegranate.jpg",
  },
  banana: {
    name: "Banana",
    description: "A tropical fruit crop eaten daily in India.",
    tips: [
      "Needs warm and humid climate.",
      "Requires high water and fertile soil.",
      "Grown throughout the year in tropical regions."
    ],
    image: "/images/banana.jpg",
  },
  mango: {
    name: "Mango",
    description: "The 'King of Fruits', widely loved in India.",
    tips: [
      "Thrives in tropical and subtropical climates.",
      "Requires deep, well-drained soil.",
      "Needs hot, dry weather before flowering."
    ],
    image: "/images/mango.jpg",
  },
  grapes: {
    name: "Grapes",
    description: "A fruit crop grown for fresh eating and wine.",
    tips: [
      "Requires dry climate during ripening.",
      "Needs sandy loam or clay loam soil.",
      "Pruning is essential for good yield."
    ],
    image: "/images/grapes.jpg",
  },
  watermelon: {
    name: "Watermelon",
    description: "A juicy summer fruit with high water content.",
    tips: [
      "Needs hot, dry climate.",
      "Requires sandy loam soil.",
      "High sunlight improves sweetness."
    ],
    image: "/images/watermelon.jpg",
  },
  muskmelon: {
    name: "Muskmelon (Kharbuja)",
    description: "A sweet summer fruit with musky aroma.",
    tips: [
      "Grows best in sandy loam soil.",
      "Needs hot, dry weather.",
      "Requires regular irrigation."
    ],
    image: "/images/muskmelon.jpg",
  },
  apple: {
    name: "Apple",
    description: "A popular fruit crop grown in hilly regions.",
    tips: [
      "Needs cold climate with chilling hours.",
      "Prefers well-drained loamy soils.",
      "Common in Himachal Pradesh and J&K."
    ],
    image: "/images/apple.jpg",
  },
  orange: {
    name: "Orange",
    description: "A citrus fruit rich in Vitamin C.",
    tips: [
      "Requires subtropical climate.",
      "Prefers light soils with good drainage.",
      "Needs regular watering during dry season."
    ],
    image: "/images/orange.jpg",
  },
  papaya: {
    name: "Papaya",
    description: "A tropical fruit crop with many health benefits.",
    tips: [
      "Needs warm, frost-free climate.",
      "Requires light, well-drained soils.",
      "Grows fast and bears fruit early."
    ],
    image: "/images/papaya.jpg",
  },
  coconut: {
    name: "Coconut",
    description: "A tropical tree valued for its fruit and oil.",
    tips: [
      "Thrives in coastal areas.",
      "Needs sandy soil with good drainage.",
      "Requires high humidity and rainfall."
    ],
    image: "/images/coconut.jpg",
  },
  cotton: {
    name: "Cotton",
    description: "An important fiber crop used in textiles.",
    tips: [
      "Grows well in black soil (regur).",
      "Needs long frost-free period.",
      "Requires moderate rainfall and lots of sunlight."
    ],
    image: "/images/cotton.jpg",
  },
};
