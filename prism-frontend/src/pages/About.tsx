import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Database,
  Target,
  Users,
  Shield,
  TrendingUp,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative">
      {/* Return to Home Button - Top Left */}
      <div className="absolute left-4 top-4 z-50">
        <a href="/">
          <button className="px-5 py-2 rounded bg-primary text-white font-semibold shadow hover:bg-primary/80 transition">
            Return to Home
          </button>
        </a>
      </div>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Our Model
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about the science and methodology behind our behavioral
            assessment platform
          </p>
        </div>

        {/* Problem Statement */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Target className="w-8 h-8 mr-3 text-red-600" />
              Problem Statement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed text-lg">
              Early identification of behavioral tendencies—such as
              introversion/extroversion or susceptibility to stress—is essential
              in educational and workplace settings for improving mental
              well-being and productivity. However, such traits are often
              assessed manually or overlooked entirely due to lack of scalable,
              objective tools.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              There is a growing need for simple, automated methods that can
              support early screening of personality or stress levels using data
              that can be collected in a non-invasive, scalable manner.
            </p>
          </CardContent>
        </Card>

        {/* Data Sources */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Database className="w-8 h-8 mr-3 text-blue-600" />
              Data Sources & Methodology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">
                  Assessment Instruments
                </h3>
                <div className="space-y-2">
                  <Badge variant="outline">
                    Perceived Stress Scale (PSS-10)
                  </Badge>
                  <Badge variant="outline">Demographic Data</Badge>
                  <Badge variant="outline">Psychological Self-Assessment</Badge>
                  <Badge variant="outline">Behavioral Indicators</Badge>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">
                  Machine Learning Techniques
                </h3>
                <div className="space-y-2">
                  <Badge variant="secondary">K-Nearest Neighbor (KNN)</Badge>
                  <Badge variant="secondary">Naive Bayes Classification</Badge>
                  <Badge variant="secondary">Supervised Learning</Badge>
                  <Badge variant="secondary">Ensemble Methods</Badge>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mt-6 leading-relaxed">
              Our model utilizes supervised machine learning with a focus on
              training classifying models using K-Nearest Neighbor and Naive
              Bayes algorithms. These approaches allow for fuzzier, yet accurate
              determinations based on clustered or majority-based algorithms,
              which are more suitable for human behavior analysis than absolute
              rule classifiers.
            </p>
          </CardContent>
        </Card>

        {/* Solution Approach */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Brain className="w-8 h-8 mr-3 text-green-600" />
              Our Solution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              We've developed an AI model designed to assign healthy coping
              behaviors and predict the likelihood of experiencing duress due to
              stress based on an individual's background and assessment
              responses.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold">Predictive Analysis</h4>
                <p className="text-sm text-gray-600">
                  Stress susceptibility prediction
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold">Behavioral Profiling</h4>
                <p className="text-sm text-gray-600">
                  Personality tendency classification
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold">Coping Strategies</h4>
                <p className="text-sm text-gray-600">
                  Personalized recommendations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Model Validation */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">
              Model Validation & Limitations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-green-700">
                  Strengths
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Based on validated psychological instruments (PSS-10)</li>
                  <li>Uses ensemble methods for improved accuracy</li>
                  <li>Designed for scalable, non-invasive assessment</li>
                  <li>Provides actionable insights and coping strategies</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-orange-700">
                  Limitations
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Self-reported data may contain response bias</li>
                  <li>
                    Not a replacement for professional psychological evaluation
                  </li>
                  <li>
                    Cultural and demographic factors may influence results
                  </li>
                  <li>Requires continuous model refinement with new data</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ethical Considerations */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Privacy & Ethics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Data Privacy
                </h4>
                <p className="text-blue-700">
                  All responses are processed anonymously. We do not store
                  personal identifiers or link responses to individuals.
                </p>
              </div>
              <div className="p-4 bg-green-50 border-l-4 border-green-500">
                <h4 className="font-semibold text-green-800 mb-2">
                  Informed Consent
                </h4>
                <p className="text-green-700">
                  Users are clearly informed about the nature and limitations of
                  the assessment before participation.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  Professional Guidance
                </h4>
                <p className="text-yellow-700">
                  Results include clear disclaimers and recommendations to seek
                  professional help when appropriate.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
