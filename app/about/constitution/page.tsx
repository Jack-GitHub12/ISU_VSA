'use client'

import { FileText, Download, Scale, Users, BookOpen, Gavel, Shield, Eye } from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function ConstitutionPage() {
  const sections = [
    {
      id: 'article1',
      title: 'Article I: Name and Purpose',
      icon: BookOpen,
      content: `The organization shall be known as the Iowa State University Vietnamese Student Association (ISU VSA). 
                The purpose of this organization is to promote Vietnamese culture, provide support for Vietnamese students, 
                and foster community connections within Iowa State University and the greater Ames community.`,
    },
    {
      id: 'article2',
      title: 'Article II: Membership',
      icon: Users,
      content: `Membership is open to all students, faculty, staff, and community members who support the mission and 
                values of ISU VSA. Active membership requires participation in organizational activities and payment of 
                annual dues as determined by the Executive Board.`,
    },
    {
      id: 'article3',
      title: 'Article III: Executive Board',
      icon: Gavel,
      content: `The Executive Board shall consist of President, Vice President, Secretary, Treasurer, Cultural Chair, 
                Social Chair, and Public Relations Chair. Officers serve one-year terms and are elected by general membership.`,
    },
    {
      id: 'article4',
      title: 'Article IV: Meetings',
      icon: Scale,
      content: `General meetings shall be held bi-weekly during the academic year. Special meetings may be called by 
                the President or by petition of at least 25% of active members. Quorum for official business requires 
                50% of active membership.`,
    },
    {
      id: 'article5',
      title: 'Article V: Finances',
      icon: Shield,
      content: `The organization's finances shall be managed by the Treasurer under oversight of the Executive Board. 
                Annual budgets must be approved by general membership. All expenditures over $100 require Executive Board approval.`,
    },
    {
      id: 'article6',
      title: 'Article VI: Amendments',
      icon: FileText,
      content: `This constitution may be amended by a two-thirds vote of active members present at a general meeting, 
                provided that proposed amendments have been distributed to membership at least one week prior to the vote.`,
    },
  ]

  const bylaws = [
    {
      title: 'Election Procedures',
      description: 'Detailed process for nominating and electing Executive Board members',
    },
    {
      title: 'Committee Structure',
      description: 'Organization and responsibilities of standing committees',
    },
    {
      title: 'Event Planning Guidelines',
      description: 'Standards and procedures for organizing VSA events',
    },
    {
      title: 'Membership Benefits',
      description: 'Privileges and responsibilities of active members',
    },
    {
      title: 'Disciplinary Procedures',
      description: 'Process for addressing violations of organizational policies',
    },
    {
      title: 'Alumni Relations',
      description: 'Framework for maintaining connections with VSA graduates',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Constitution & Bylaws</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              The governing documents that guide our organization&apos;s structure, operations, and
              values
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Our Governing Documents</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              These documents establish the framework for our organization&apos;s governance,
              ensuring transparency, accountability, and democratic participation in all VSA
              activities.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection direction="left">
              <div className="card h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-cardinal rounded-full flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Constitution</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Our constitution establishes the fundamental principles, structure, and purpose of
                  ISU VSA. It serves as the foundation for all organizational activities and
                  decision-making processes.
                </p>
                <div className="flex space-x-4">
                  <button className="btn-primary inline-flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                  <button className="btn-outline inline-flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    View Online
                  </button>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="card h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mr-4">
                    <Scale className="w-6 h-6 text-charcoal" />
                  </div>
                  <h3 className="text-2xl font-bold">Bylaws</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Our bylaws provide detailed procedures and guidelines for implementing the
                  constitution. They cover operational matters such as elections, committees, and
                  event planning.
                </p>
                <div className="flex space-x-4">
                  <button className="btn-primary inline-flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                  <button className="btn-outline inline-flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    View Online
                  </button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Constitution Articles */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Constitution Articles</h2>
            <p className="section-subtitle">Key sections of our constitutional framework</p>
          </AnimatedSection>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <AnimatedSection
                key={section.id}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={index * 0.1}
              >
                <div className="card">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-cardinal-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">{section.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bylaws Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Bylaws Overview</h2>
            <p className="section-subtitle">Additional governing procedures and guidelines</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bylaws.map((bylaw, index) => (
              <AnimatedSection key={bylaw.title} direction="up" delay={index * 0.1}>
                <div className="card h-full text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scale className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{bylaw.title}</h3>
                  <p className="text-gray-600">{bylaw.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Amendment Process */}
      <section className="py-16 px-4 bg-gradient-to-r from-cardinal/10 to-gold/10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Amendment Process</h2>
            <p className="section-subtitle">How our governing documents can be updated</p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSection direction="up" delay={0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Proposal</h3>
                  <p className="text-gray-600">
                    Any member may propose amendments to the constitution or bylaws
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.2}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Review</h3>
                  <p className="text-gray-600">
                    Executive Board reviews and distributes proposed amendments to membership
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.3}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Vote</h3>
                  <p className="text-gray-600">
                    Two-thirds majority of active members required for approval
                  </p>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection direction="up" delay={0.4} className="text-center mt-12">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Have Questions or Suggestions?</h3>
                <p className="text-gray-600 mb-6">
                  We welcome feedback and suggestions for improving our governing documents. Contact
                  the Executive Board to discuss potential amendments or clarifications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-primary">Contact Executive Board</button>
                  <button className="btn-outline">Submit Suggestion</button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
