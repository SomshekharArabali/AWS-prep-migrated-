"use client"

import { useState } from "react"
import "./CheatSheet.css"

const CheatSheet = () => {
  const [activeSection, setActiveSection] = useState("services")

  const cheatSheetData = {
    services: {
      title: "AWS Core Services",
      content: [
        {
           category: "Compute",
  items: [
    { name: "EC2", description: "Virtual servers in the cloud" },
    { name: "EC2 Image Builder", description: "Automate build, customize, and deploy OS images" },
    { name: "Lambda", description: "Run code without thinking about servers (serverless)" },
    { name: "ECS", description: "Managed container orchestration service using Docker" },
    { name: "EKS", description: "Managed Kubernetes service for container orchestration" },
    { name: "Fargate", description: "Serverless containers for ECS and EKS, no server management" },
    { name: "Lightsail", description: "Launch and manage Virtual Private Servers" },
    { name: "Batch", description: "Fully managed batch processing at any scale" },
    { name: "Elastic Beanstalk", description: "Run and manage web applications easily" },
    { name: "Outposts", description: "Run AWS servers on premises with full integration" },
    { name: "Serverless Application Repository", description: "Assemble, deploy, and share serverless apps within teams or publicly" },
    { name: "Wavelength", description: "Deploy applications at the edge for ultra-low latency" },
    { name: "SimSpace Weaver", description: "Build and run large-scale spatial simulations" }
  ],
        },
        {
         category: "Storage",
  items: [
    { name: "S3", description: "Scalable storage in the cloud" },
    { name: "S3 Glacier", description: "Low-cost archival storage in the cloud" },
    { name: "EBS", description: "Block storage volumes for EC2 instances" },
    { name: "EFS", description: "Managed file storage for EC2" },
    { name: "FSx", description: "Fully managed third-party file systems for various workloads" },
    { name: "Lightsail Block Storage", description: "Simple block storage for Lightsail instances" },
    { name: "Storage Gateway", description: "Hybrid storage integration between on-premises and AWS" },
    { name: "Backup", description: "Centrally manage and automate backups across AWS services" },
    { name: "Elastic Disaster Recovery", description: "Scalable, cost-effective application recovery to AWS" }
  ],
        },
        {
         category: "Database",
  items: [
    { name: "RDS", description: "Managed relational database service" },
    { name: "Aurora", description: "High-performance, MySQL and PostgreSQL-compatible relational database" },
    { name: "DynamoDB", description: "Managed NoSQL database with single-digit millisecond latency" },
    { name: "ElastiCache", description: "In-memory caching service for Redis and Memcached" },
    { name: "DocumentDB", description: "Fully managed MongoDB-compatible database service" },
    { name: "Neptune", description: "Fast, reliable graph database built for the cloud" },
    { name: "Keyspaces", description: "Serverless Cassandra-compatible database" },
    { name: "MemoryDB for Redis", description: "Fully managed Redis-compatible in-memory database service" },
    { name: "QLDB", description: "Fully managed ledger database with immutable and cryptographically verifiable transactions" },
    { name: "Redshift", description: "Fully managed data warehouse for analytics" },
    { name: "Timestream", description: "Fast, scalable serverless time series database for IoT and operational applications" }
  ],
        },
        {
  category: "Analytics",
  items: [
    { name: "Athena", description: "Serverless interactive query service to analyze data in S3 using SQL" },
    { name: "EMR", description: "Managed Hadoop and Spark framework for big data processing" },
    { name: "Kinesis", description: "Real-time data streaming and analytics service" },
    { name: "QuickSight", description: "Fast, easy-to-use business intelligence and visualization service" },
    { name: "Redshift", description: "Fast, simple, cost-effective data warehouse" },
    { name: "CloudSearch", description: "Managed search service for websites and applications" },
    { name: "Data Pipeline", description: "Orchestrate and automate data-driven workflows" },
    { name: "Glue", description: "Serverless data integration and ETL service" },
    { name: "Glue DataBrew", description: "Visual data preparation tool to clean and normalize data for analytics and ML" },
    { name: "Lake Formation", description: "Set up secure data lakes easily and manage access" },
    { name: "MSK", description: "Fully managed, highly available, and secure Apache Kafka service" },
    { name: "OpenSearch Service", description: "Managed service to run OpenSearch or Elasticsearch clusters or serverless deployments" },
    { name: "Data Exchange", description: "Find, subscribe to, and use third-party data easily" },
    { name: "Clean Rooms", description: "Securely collaborate on datasets without revealing underlying raw data" },
    { name: "DataZone", description: "Unlock data across organizational boundaries with built-in governance" },
    { name: "FinSpace", description: "Store, catalog, prepare, and analyze financial industry data" }
  ]
},
{
  category: "Container",
  items: [
    { name: "Elastic Container Registry (ECR)", description: "Fully-managed Docker container registry to share and deploy container software, publicly or privately" },
    { name: "Elastic Container Service (ECS)", description: "Highly secure, reliable, and scalable way to run containers" },
    { name: "Elastic Kubernetes Service (EKS)", description: "Managed Kubernetes service to start, run, and scale Kubernetes clusters" },
    { name: "Red Hat OpenShift Service on AWS (ROSA)", description: "Fully managed Red Hat OpenShift service on AWS for container orchestration" }
  ]
},{
  category: "Developer Tools",
  items: [
    { name: "AppConfig", description: "Use feature flags and runtime configuration to make changes quickly and safely in production" },
    { name: "Application Composer", description: "Visually design and build serverless applications quickly" },
    { name: "Cloud9", description: "IDE for writing, running, and debugging code in the cloud" },
    { name: "CloudShell", description: "Browser-based shell with AWS CLI access from the Management Console" },
    { name: "CodeArtifact", description: "Secure, scalable artifact management for software developers" },
    { name: "CodeBuild", description: "Build and test code" },
    { name: "CodeCatalyst", description: "Integrated DevOps service for planning, building, and delivering software" },
    { name: "CodeCommit", description: "Store code in private Git repositories" },
    { name: "CodeDeploy", description: "Automate code deployments to any instance or serverless environment" },
    { name: "CodePipeline", description: "Release software using continuous integration and delivery" },
    { name: "CodeStar", description: "Quickly develop, build, and deploy applications" },
    { name: "CodeWhisperer", description: "ML-powered coding companion to build applications faster" },
    { name: "FIS (Fault Injection Simulator)", description: "Improve resiliency and performance with controlled experiments" },
    { name: "X-Ray", description: "Analyze and debug your applications to trace issues and bottlenecks" }
  ]
},{
  category: "Machine Learning",
  items: [
    { name: "Augmented AI (A2I)", description: "Easily implement human review of machine learning predictions" },
    { name: "Bedrock", description: "Build and scale generative AI applications using foundation models" },
    { name: "CodeGuru", description: "Intelligent recommendations for building and running modern applications" },
    { name: "Comprehend", description: "Analyze unstructured text using natural language processing" },
    { name: "Comprehend Medical", description: "Extract insights and relationships from medical text using ML" },
    { name: "DeepComposer", description: "Get started with generative AI for music creation" },
    { name: "DeepLens", description: "Deep learning enabled video camera for computer vision projects" },
    { name: "DeepRacer", description: "Autonomous 1/18 scale car driven by reinforcement learning" },
    { name: "DevOps Guru", description: "ML-powered cloud operations service to improve application availability" },
    { name: "Forecast", description: "Fully-managed service for accurate time-series forecasting" },
    { name: "Fraud Detector", description: "Detect online fraud using machine learning" },
    { name: "HealthLake", description: "Organize, index, and analyze health data at scale" },
    { name: "Kendra", description: "Highly accurate enterprise search powered by ML" },
    { name: "Lex", description: "Build conversational voice and text chatbots" },
    { name: "Lookout for Equipment", description: "Detect abnormal equipment behavior using sensor data" },
    { name: "Lookout for Metrics", description: "Detect anomalies in business metrics and understand causes" },
    { name: "Lookout for Vision", description: "Identify defects using computer vision to automate quality inspection" },
    { name: "Monitron", description: "End-to-end system for equipment monitoring" },
    { name: "Omics", description: "Transform omics data into actionable insights" },
    { name: "Panorama", description: "Run computer vision applications at the edge" },
    { name: "Personalize", description: "Add real-time recommendations to applications" },
    { name: "Polly", description: "Turn text into lifelike speech" },
    { name: "Rekognition", description: "Analyze and search images and videos" },
    { name: "SageMaker", description: "Build, train, and deploy machine learning models" },
    { name: "Textract", description: "Extract text and structured data from documents" },
    { name: "Transcribe", description: "Automatic speech recognition to convert speech to text" },
    { name: "Translate", description: "Neural machine translation to convert text between languages" }
  ]
},{
  category: "Networking & Content Delivery",
  items: [
    { name: "API Gateway", description: "Build, deploy, and manage APIs at any scale" },
    { name: "App Mesh", description: "Easily monitor and control microservices" },
    { name: "Cloud Map", description: "Build a dynamic map of your cloud resources" },
    { name: "CloudFront", description: "Global content delivery network (CDN) for low-latency content delivery" },
    { name: "Direct Connect", description: "Dedicated network connection from on-premises to AWS" },
    { name: "Global Accelerator", description: "Improve application availability and performance using the AWS global network" },
    { name: "Private 5G", description: "Deploy and scale private mobile networks on-premises" },
    { name: "Route 53", description: "Highly available and scalable DNS and domain name registration service" },
    { name: "Route 53 Application Recovery Controller", description: "Monitor application recovery readiness and manage failovers" },
    { name: "VPC", description: "Provision isolated cloud resources and control network configuration" }
  ]
},{
  category: "Migration & Transfer",
  items: [
    { name: "Application Discovery Service", description: "Discover on-premises application inventory and dependencies" },
    { name: "Application Migration Service (MGN)", description: "Automates lift-and-shift migration to AWS" },
    { name: "Database Migration Service (DMS)", description: "Managed service to migrate databases to AWS with minimal downtime" },
    { name: "DataSync", description: "Simplify, automate, and accelerate moving data between on-premises and AWS" },
    { name: "Mainframe Modernization", description: "Modernize, migrate, and run mainframe applications on AWS" },
    { name: "Migration Hub", description: "Simplify and accelerate the migration of data centers to AWS" },
    { name: "Snow Family", description: "Physical devices and services for large-scale data transport" },
    { name: "Transfer Family", description: "Fully managed service for SFTP, FTPS, and FTP transfers" }
  ]
},
{
  category: "Media Services",
  items: [
    { name: "Elastic Transcoder", description: "Easy-to-use, scalable media transcoding service" },
    { name: "Elemental Appliances & Software", description: "On-premises solutions for video processing" },
    { name: "Interactive Video Service (IVS)", description: "Managed interactive live streaming service" },
    { name: "Kinesis Video Streams", description: "Capture, process, and store video streams for analytics and ML" },
    { name: "MediaConnect", description: "Reliable, secure, and flexible transport for live video" },
    { name: "MediaConvert", description: "Convert file-based content for broadcast and multiscreen delivery" },
    { name: "MediaLive", description: "Convert video inputs into live outputs for broadcast and streaming delivery" },
    { name: "MediaPackage", description: "Deliver video to many devices using just-in-time format conversion" },
    { name: "MediaStore", description: "Store and deliver video assets for live or on-demand workflows" },
    { name: "MediaTailor", description: "Personalize and monetize multiscreen content with ad insertion" },
    { name: "Nimble Studio", description: "Build cloud-based content creation studios or Thinkbox Deadline render farms" }
  ]
},
{
  category: "Business Applications",
  items: [
    { name: "Chime", description: "Communications service that transforms online meetings" },
    { name: "Chime SDK", description: "Real-time communication capabilities for your applications" },
    { name: "Connect", description: "Cloud-based contact center to engage customers at any scale" },
    { name: "Honeycode", description: "Build mobile and web apps without programming" },
    { name: "Pinpoint", description: "Engage users via Email, SMS, Push notifications, and Analytics" },
    { name: "Simple Email Service (SES)", description: "Email sending and receiving service" },
    { name: "Supply Chain", description: "Manage and optimize supply chain systems" },
    { name: "Wickr", description: "Secure communication with end-to-end encryption" },
    { name: "WorkDocs", description: "Secure enterprise storage and file sharing service" },
    { name: "WorkMail", description: "Secure email and calendaring service" }
  ]
},


      ],
    },
    pricing: {
      title: "AWS Pricing Models",
      content: [
        {
          category: "Pricing Models",
          items: [
            { name: "On-Demand", description: "Pay for what you use with no upfront costs" },
            { name: "Reserved Instances", description: "1-3 year commitments for discounted rates" },
            { name: "Spot Instances", description: "Bid for unused EC2 capacity" },
            { name: "Dedicated Hosts", description: "Physical servers dedicated to your use" },
          ],
        },
        {
          category: "Cost Management",
          items: [
            { name: "AWS Cost Explorer", description: "Visualize and manage AWS costs" },
            { name: "AWS Budgets", description: "Set custom cost and usage budgets" },
            { name: "AWS Cost and Usage Report", description: "Detailed billing reports" },
            { name: "AWS Trusted Advisor", description: "Cost optimization recommendations" },
          ],
        },
      ],
    },
    security: {
      title: "Security & Compliance",
      content: [
        {
          category: "Identity & Access",
          items: [
            { name: "IAM", description: "Identity and Access Management" },
            { name: "AWS SSO", description: "Single Sign-On service" },
            { name: "Cognito", description: "User identity and authentication" },
            { name: "Directory Service", description: "Managed Microsoft Active Directory" },
          ],
        },
        {
          category: "Security Services",
          items: [
            { name: "CloudTrail", description: "API logging and monitoring" },
            { name: "Config", description: "Resource configuration monitoring" },
            { name: "GuardDuty", description: "Threat detection service" },
            { name: "Inspector", description: "Security assessment service" },
          ],
        },
      ],
    },
    architecture: {
      title: "Architecture Principles",
      content: [
        {
          category: "Well-Architected Framework",
          items: [
            { name: "Operational Excellence", description: "Run and monitor systems effectively" },
            { name: "Security", description: "Protect information and systems" },
            { name: "Reliability", description: "Recover from failures and meet demand" },
            { name: "Performance Efficiency", description: "Use resources efficiently" },
            { name: "Cost Optimization", description: "Avoid unnecessary costs" },
          ],
        },
        {
          category: "Design Principles",
          items: [
            { name: "Scalability", description: "Handle increased load gracefully" },
            { name: "Elasticity", description: "Scale resources up and down automatically" },
            { name: "High Availability", description: "Minimize downtime and failures" },
            { name: "Fault Tolerance", description: "Continue operating despite failures" },
          ],
        },
      ],
    },
  }

  const sections = [
    { key: "services", label: "Core Services", icon: "🔧" },
    { key: "pricing", label: "Pricing", icon: "💰" },
    { key: "security", label: "Security", icon: "🔒" },
    { key: "architecture", label: "Architecture", icon: "🏗️" },
  ]

  return (
    <div className="cheat-sheet">
      <div className="container">
        <div className="cheat-sheet-header">
          <h1>AWS Cloud Practitioner Cheat Sheet</h1>
          <p>Quick reference guide for key AWS concepts and services</p>
        </div>

        <div className="cheat-sheet-content">
          <div className="cheat-sheet-nav">
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`nav-btn ${activeSection === section.key ? "active" : ""}`}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-label">{section.label}</span>
              </button>
            ))}
          </div>

          <div className="cheat-sheet-main">
            <h2>{cheatSheetData[activeSection].title}</h2>

            <div className="content-sections">
              {cheatSheetData[activeSection].content.map((section, index) => (
                <div key={index} className="content-section">
                  <h3>{section.category}</h3>
                  <div className="items-grid">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="cheat-item">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheatSheet
