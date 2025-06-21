# MLOps Platform

A comprehensive Machine Learning Operations platform built with Next.js, featuring document processing, data annotation, model development, and external data connections.

## 🚀 Features

### Core MLOps Capabilities
- **ML Lifecycle Management** - Complete workflow from data to deployment
- **Model Development** - Experiment tracking, algorithm selection, and hyperparameter tuning
- **Data Preprocessing** - Document processing with Docling integration
- **Data Annotation** - AI-assisted labeling with Label Studio integration
- **External Data Connections** - Support for databases, NoSQL, APIs, and cloud storage
- **Compute Management** - Resource allocation and job scheduling

### Data Processing & Annotation
- **Document Processing**: PDF, DOCX, XLSX, HTML, images with advanced layout understanding
- **AI-Assisted Labeling**: GPT-4 integration for automated data annotation
- **Quality Control**: Inter-annotator agreement and validation workflows
- **Team Collaboration**: Multi-user annotation projects

### External Data Sources
- **Databases**: MySQL, PostgreSQL
- **NoSQL**: MongoDB, Redis
- **APIs**: REST API integration
- **Cloud Storage**: AWS S3
- **Real-time Monitoring**: Connection status and data sync

### Model Development
- **Experiment Tracking**: Comprehensive experiment management
- **Algorithm Library**: Pre-built algorithms and templates
- **Hyperparameter Tuning**: Automated optimization
- **Performance Metrics**: Real-time monitoring and evaluation

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Document Processing**: Docling integration
- **Data Annotation**: Label Studio integration
- **State Management**: React Hooks
- **Routing**: Next.js App Router

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd code-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
code-ai/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Dashboard
│   ├── ml-lifecycle/            # ML Lifecycle page
│   ├── model-development/       # Model Development page
│   ├── data-preprocessing/      # Data Preprocessing page
│   ├── data-annotation/         # Data Annotation page
│   ├── datasets/                # Datasets & Data Sources
│   └── compute/                 # Compute Management
├── components/                   # Reusable components
│   ├── Header.tsx              # Application header
│   ├── Sidebar.tsx             # Navigation sidebar
│   ├── QuickActions.tsx        # Quick action buttons
│   ├── ResourceMonitor.tsx     # Resource monitoring
│   ├── SessionList.tsx         # Session management
│   └── StatsOverview.tsx       # Statistics display
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

## 🎯 Key Pages

### Dashboard (`/`)
- Overview of ML projects and resources
- Quick actions for common tasks
- ML workflow visualization
- Real-time statistics and monitoring

### ML Lifecycle (`/ml-lifecycle`)
- Interactive ML process visualization
- Step-by-step guidance for beginners
- Educational content and examples

### Model Development (`/model-development`)
- Experiment tracking and management
- Algorithm selection and configuration
- Dataset management
- Performance monitoring

### Data Preprocessing (`/data-preprocessing`)
- Document processing with Docling
- Multi-format support (PDF, DOCX, XLSX, HTML, images)
- Processing job management
- Quality metrics and progress tracking

### Data Annotation (`/data-annotation`)
- AI-assisted labeling with Label Studio
- GPT-4 integration for pre-annotation
- Human review and validation
- Quality control metrics

### Datasets (`/datasets`)
- External data source connections
- Database and NoSQL integration
- API and cloud storage support
- Dataset catalog and management

### Compute (`/compute`)
- Resource allocation and monitoring
- Job queue management
- Cost tracking and optimization
- Performance metrics

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

### Tailwind CSS
The project uses Tailwind CSS for styling. Configuration is in `tailwind.config.js`.

### TypeScript
TypeScript configuration is in `tsconfig.json`. The project includes strict type checking.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Docling** - Advanced document processing capabilities
- **Label Studio** - Data annotation and labeling platform
- **Next.js** - React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in each page
- Review the code examples and comments

---

**Built with ❤️ for the MLOps community** 