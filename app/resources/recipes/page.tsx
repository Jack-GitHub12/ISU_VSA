'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Search,
  Clock,
  Users,
  ChefHat,
  Heart,
  Star,
  Filter,
  Download,
  Utensils,
} from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const recipes = [
    {
      id: 1,
      title: 'Phở Bò (Beef Pho)',
      description: 'Traditional Vietnamese beef noodle soup with aromatic broth and fresh herbs',
      image: '/images/eboard/eboardGroup.JPG',
      category: 'soup',
      difficulty: 'hard',
      prepTime: '4 hours',
      servings: 6,
      rating: 4.9,
      ingredients: [
        'Beef bones',
        'Rice noodles',
        'Onions',
        'Ginger',
        'Star anise',
        'Cinnamon',
        'Fish sauce',
      ],
      cultural: "Vietnam's national dish, traditionally eaten for breakfast",
      featured: true,
    },
    {
      id: 2,
      title: 'Bánh Mì',
      description: 'Vietnamese sandwich with crispy baguette and savory fillings',
      image: '/images/eboard/eboardGroup.JPG',
      category: 'sandwich',
      difficulty: 'easy',
      prepTime: '30 minutes',
      servings: 4,
      rating: 4.7,
      ingredients: [
        'Baguette',
        'Pâté',
        'Pickled vegetables',
        'Cilantro',
        'Jalapeños',
        'Vietnamese cold cuts',
      ],
      cultural: 'French-influenced Vietnamese street food classic',
      featured: false,
    },
    {
      id: 3,
      title: 'Gỏi Cuốn (Fresh Spring Rolls)',
      description: 'Light and healthy spring rolls with shrimp, pork, and fresh herbs',
      image: '/images/eboard/eboardGroup.JPG',
      category: 'appetizer',
      difficulty: 'medium',
      prepTime: '45 minutes',
      servings: 4,
      rating: 4.6,
      ingredients: [
        'Rice paper',
        'Shrimp',
        'Pork belly',
        'Rice noodles',
        'Lettuce',
        'Herbs',
        'Peanut sauce',
      ],
      cultural: 'Popular appetizer symbolizing freshness and health',
      featured: true,
    },
    {
      id: 4,
      title: 'Bún Chả',
      description: 'Grilled pork served with rice noodles and herbs',
      image: '/images/eboard/eboardGroup.JPG',
      category: 'main',
      difficulty: 'medium',
      prepTime: '2 hours',
      servings: 4,
      rating: 4.8,
      ingredients: [
        'Pork shoulder',
        'Rice noodles',
        'Fish sauce',
        'Sugar',
        'Herbs',
        'Pickled vegetables',
      ],
      cultural: 'Hanoi specialty made famous by Anthony Bourdain',
      featured: false,
    },
    {
      id: 5,
      title: 'Chè Ba Màu',
      description: 'Three-color Vietnamese dessert with beans, coconut, and ice',
      image: '/images/eboard/eboardGroup.JPG',
      category: 'dessert',
      difficulty: 'easy',
      prepTime: '1 hour',
      servings: 6,
      rating: 4.4,
      ingredients: ['Mung beans', 'Red beans', 'Coconut milk', 'Tapioca pearls', 'Ice', 'Sugar'],
      cultural: 'Colorful dessert representing prosperity and happiness',
      featured: false,
    },
    {
      id: 6,
      title: 'Bánh Chưng',
      description: 'Traditional sticky rice cake for Tết (New Year)',
      image: '/images/eboard/eboardGroup.JPG',
      category: 'special',
      difficulty: 'hard',
      prepTime: '12 hours',
      servings: 8,
      rating: 4.5,
      ingredients: ['Glutinous rice', 'Mung beans', 'Pork belly', 'Banana leaves', 'Salt'],
      cultural: 'Sacred Tết food symbolizing the earth and gratitude',
      featured: true,
    },
  ]

  const categories = [
    { id: 'all', name: 'All Recipes', icon: Utensils },
    { id: 'soup', name: 'Soups', icon: ChefHat },
    { id: 'main', name: 'Main Dishes', icon: Utensils },
    { id: 'appetizer', name: 'Appetizers', icon: Heart },
    { id: 'dessert', name: 'Desserts', icon: Star },
    { id: 'sandwich', name: 'Sandwiches', icon: Utensils },
    { id: 'special', name: 'Special Occasions', icon: Star },
  ]

  const difficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ]

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory
    const matchesDifficulty =
      selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'hard':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'soup':
        return 'from-blue-500 to-blue-700'
      case 'main':
        return 'from-red-500 to-red-700'
      case 'appetizer':
        return 'from-green-500 to-green-700'
      case 'dessert':
        return 'from-pink-500 to-pink-700'
      case 'sandwich':
        return 'from-orange-500 to-orange-700'
      case 'special':
        return 'from-purple-500 to-purple-700'
      default:
        return 'from-gray-500 to-gray-700'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Vietnamese Recipes</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Discover the authentic flavors of Vietnam with traditional family recipes
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4 bg-white sticky top-20 z-30 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-cardinal text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <category.icon className="w-4 h-4 inline mr-2" />
                  {category.name}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-transparent"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty.id} value={difficulty.id}>
                  {difficulty.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      {recipes.filter((r) => r.featured).length > 0 && (
        <section className="py-12 px-4 bg-gradient-to-b from-gold/10 to-transparent">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection direction="up" className="text-center mb-8">
              <h2 className="section-title">Featured Recipes</h2>
              <p className="section-subtitle">Must-try dishes from Vietnamese cuisine</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recipes
                .filter((r) => r.featured)
                .map((recipe, index) => (
                  <AnimatedSection key={recipe.id} direction="up" delay={index * 0.1}>
                    <div className="card h-full">
                      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={recipe.image}
                          alt={recipe.title}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-gold text-charcoal px-3 py-1 rounded-full text-xs font-semibold">
                            FEATURED
                          </span>
                        </div>
                        <div className="absolute top-2 right-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}
                          >
                            {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
                      <p className="text-gray-600 mb-4">{recipe.description}</p>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {recipe.prepTime}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {recipe.servings} servings
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-gold" />
                          {recipe.rating}
                        </div>
                      </div>

                      <div className="bg-gold/10 p-3 rounded-lg mb-4">
                        <p className="text-sm text-gray-700 italic">{recipe.cultural}</p>
                      </div>

                      <button className="btn-primary w-full">View Recipe</button>
                    </div>
                  </AnimatedSection>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* All Recipes */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-8">
            <h2 className="section-title">All Recipes</h2>
            <p className="text-gray-600">Showing {filteredRecipes.length} recipes</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe, index) => (
              <AnimatedSection key={recipe.id} direction="up" delay={index * 0.1}>
                <div className="card h-full">
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(recipe.category)}`}
                      >
                        {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}
                      >
                        {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {recipe.prepTime}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {recipe.servings}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-gold" />
                      {recipe.rating}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Key Ingredients:</h4>
                    <div className="flex flex-wrap gap-1">
                      {recipe.ingredients.slice(0, 3).map((ingredient) => (
                        <span
                          key={ingredient}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {ingredient}
                        </span>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{recipe.ingredients.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="btn-outline w-full">View Recipe</button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Submission CTA */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h2 className="section-title">Share Your Family Recipe</h2>
            <p className="section-subtitle mb-8">
              Help preserve Vietnamese culinary traditions by sharing your family&apos;s recipes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center"
              >
                <ChefHat className="w-5 h-5 mr-2" />
                Submit a Recipe
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline inline-flex items-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Recipe Book
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
