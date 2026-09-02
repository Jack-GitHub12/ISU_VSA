'use client'

import {
  FileText,
  Download,
  Scale,
  Users,
  BookOpen,
  Gavel,
  Shield,
  Eye,
  Target,
  UserCheck,
  Landmark,
} from 'lucide-react'
import { LEGAL } from '@/lib/constants'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function ConstitutionPage() {
  const sections = [
    {
      id: 'article1',
      title: 'Article I: Name',
      icon: BookOpen,
      content: `The name of this organization shall be Vietnamese Student Association (VSA) at Iowa State University.`,
    },
    {
      id: 'article2',
      title: 'Article II: Purpose',
      icon: Target,
      content: `The purpose of the Vietnamese Student Association is to unite the Iowa State University community with the
                local Vietnamese community and to create more awareness about Vietnamese culture and history. VSA's goals are
                to promote Vietnamese culture and heritage through events and school and community collaborations, and to
                give members opportunities for leadership, team building, philanthropy, and individual growth.`,
    },
    {
      id: 'article3',
      title: 'Article III: Statement of Compliance',
      icon: Shield,
      content: LEGAL.compliance,
    },
    {
      id: 'article4',
      title: 'Article IV: Non-Discrimination Statement',
      icon: Scale,
      content: LEGAL.nonDiscrimination,
    },
    {
      id: 'article5',
      title: 'Article V: Membership',
      icon: Users,
      content: `Membership shall be open to all registered students in good standing at Iowa State University. Faculty,
                staff, alumni, and community members may participate as non-voting associate members. Voting members are
                students who have paid dues for the current academic year.`,
    },
    {
      id: 'article6',
      title: 'Article VI: Officers',
      icon: Gavel,
      content: `The Executive Board shall consist of the President, Vice President, Treasurer, Secretary, Student Advisor,
                Public Relations Chair, Education Chair, Fundraising Chair, and two Event Planners. The President shall
                oversee the activities of the organization, preside over all meetings, and serve as chief student leader.
                The Treasurer shall manage all organization finances. The Vice President shall serve as Risk Management
                Officer and shall (a) help minimize potential risks for club activities, (b) recommend risk management
                policies or procedures, (c) submit documentation to ISU's Risk Management Office, and (d) ensure that proper
                waivers and background checks are on file with Risk Management for events (if applicable). Officers serve a
                one academic year term. Elections are held annually in April: candidates each speak to the general
                membership, then voting occurs by secret ballot, and a simple majority of dues-paying members elects an
                officer. Impeachment or removal may be considered if an officer fails to uphold the duties of their position,
                misuses organization funds, or commits wrongdoing against another member. Proceedings begin with a written
                complaint to the President (or to the Vice President if the President is the subject); 2/3 of executive
                officers must vote to continue, the officer is notified at least two weeks before the hearing, may speak for
                five minutes, and is removed by a simple majority secret-ballot vote of dues-paying members. Vacancies are
                filled by a special election held within two weeks, following general election procedures.
                The officers of this organization must meet the following requirements: (a) Be in good standing with the
                university and enrolled: at least half time (six or more credit hours), if an undergraduate student (unless
                fewer credits are required to graduate in the spring and fall semesters) during the term of office, and at
                least half time (four or more credits), if a graduate-level student (unless fewer credits are required in the
                final stages of their degree as defined by the Continuous Registration Requirement) during their term of
                office. (b) Have a minimum cumulative grade point average (GPA) as stated below and meet that minimum GPA in
                the semester immediately prior to the election/appointment, the semester of election/appointment, and
                semesters during the term of office. For undergraduate, graduate, and professional students, the minimum GPA
                is 2.00. In order for this provision to be met, at least six hours (half-time credits) must have been taken
                for the semester under consideration. (c) Be ineligible to hold an office should the student fail to
                maintain the requirements as prescribed in (a) and (b).`,
    },
    {
      id: 'article7',
      title: 'Article VII: Advisor',
      icon: UserCheck,
      content: `The Advisor of this organization shall be an Iowa State University faculty or staff member selected by a
                unanimous decision of the executive officers. The Advisor shall attend executive meetings, maintain
                communication with university administration, approve and sign each expenditure, and assist with the
                leadership development of the organization's officers. The Advisor shall serve an indefinite term at their
                leisure. Impeachment or removal of the Advisor shall follow the same format as officer impeachment
                proceedings. An Advisor vacancy shall be filled by a unanimous decision of the executive officers within
                one month of the vacancy.`,
    },
    {
      id: 'article8',
      title: 'Article VIII: Finances',
      icon: Landmark,
      content: `All monies belonging to this organization shall be deposited and disbursed through a bank account
                established for this organization at the Campus Organizations Accounting Office and/or approved
                institution/office (must receive authorization via Campus Organizations Accounting Office). All funds must be
                deposited within 48 hours after collection. The Advisor to this organization must approve and sign each
                expenditure before payment. Dues will not exceed $30 per academic year and are set by the Executive Board
                before the fall semester. Should the organization dissolve, all remaining funds shall be returned to the
                Campus Organizations Accounting Office after outstanding debts are paid.`,
    },
    {
      id: 'article9',
      title: 'Article IX: Amendments and Ratification',
      icon: FileText,
      content: `A proposal to amend this constitution may be extended to the officers by any voting member of the
                organization. Proposals shall be presented to the general membership at least one week before the vote.
                This constitution may be amended, and shall be ratified, by a 2/3 vote of dues-paying members present at a
                general meeting. The amended constitution will be submitted within 10 days to Student Engagement for
                approval.`,
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
            <p className="text-sm md:text-base mt-4 max-w-3xl mx-auto opacity-90">
              Structured to Iowa State University Student Engagement constitution guidelines. The
              approved copy of record is on file in the Student Organization Database.
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
                  VSA at Iowa State. It serves as the foundation for all organizational activities and
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
