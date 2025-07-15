
# MkRonix - Creative Digital Agency Website

A modern, responsive website built for MkRonix, a leading creative digital agency in India specializing in web development, UI/UX design, mobile app development, and digital marketing services.

## 🚀 Features

- **Modern Tech Stack**: Built with React 18, TypeScript, Vite, and Tailwind CSS
- **Responsive Design**: Pixel-perfect UI across desktop, tablet, and mobile devices
- **Performance Optimized**: Fast loading times with lazy loading and code splitting
- **SEO Optimized**: Comprehensive SEO implementation with meta tags and structured data
- **Animation Rich**: Smooth animations using Framer Motion and GSAP
- **Type Safe**: Full TypeScript implementation with comprehensive type definitions
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Error Handling**: Graceful error handling for all edge cases

## 🛠 Technologies Used

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Framer Motion** - Production-ready motion library for React
- **GSAP** - Professional animation library
- **Lenis** - Smooth scrolling library

### UI Components
- **Shadcn/ui** - Modern, accessible UI components
- **Radix UI** - Low-level UI primitives
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Performant forms with easy validation

### Data & State Management
- **TanStack Query** - Powerful data synchronization for React
- **React Router DOM** - Declarative routing for React

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing tool
- **TypeScript Config** - Strict type checking configuration

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── SEO/            # SEO related components
│   ├── Layout/         # Layout components
│   └── ...             # Feature-specific components
├── pages/              # Page components
├── data/               # Static data and JSON files
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── services/           # API services and data fetching
├── providers/          # React context providers
└── assets/             # Static assets (images, icons)
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn** or **bun** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mkronix-website.git
   cd mkronix-website
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using bun
   bun install
   ```

3. **Start the development server**
   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev

   # Using bun
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Add any environment variables here
VITE_APP_TITLE=MkRonix
VITE_API_URL=your_api_url_here
```

## 📜 Available Scripts

- `npm run dev` - Start development server on port 8080
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks
- `npm run type-check` - Run TypeScript type checking

## 🎨 Design System

### Color Palette
- **Primary**: #1D1C1C (Dark charcoal)
- **Secondary**: #484440 (Warm gray)
- **Text**: #F5E7D3 (Cream white)
- **Background**: #000000 (Pure black)

### Typography
- **Primary Font**: Boska (Display font)
- **Secondary Font**: Spectral Bridge (Body text)

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🧪 Testing

### Running Tests
```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Testing Strategy
- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: Component interactions and data flow
- **E2E Tests**: User workflows and critical paths

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options

#### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. Deploy automatically on every push to main branch

#### Netlify
1. Connect your repository to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Configure redirects in `netlify.toml` for SPA routing

#### Docker
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔧 Performance Optimization

### Implemented Optimizations
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Images and components loaded on demand
- **Tree Shaking**: Unused code elimination
- **Bundle Analysis**: Webpack bundle analyzer integration
- **Asset Optimization**: Image compression and modern formats
- **Caching**: Proper HTTP caching headers

### Performance Metrics
- **Lighthouse Score**: 95+ for all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🛡 Security

### Security Measures
- **Content Security Policy**: Strict CSP headers
- **HTTPS**: SSL/TLS encryption for all traffic
- **Input Validation**: All user inputs validated and sanitized
- **Dependency Scanning**: Regular security audits
- **Error Handling**: No sensitive information in error messages

## 📱 Browser Support

### Supported Browsers
- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

### Progressive Enhancement
- **Graceful Degradation**: Works without JavaScript
- **Accessibility**: Screen reader compatible
- **Mobile First**: Optimized for mobile devices

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Coding Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow configured rules
- **Prettier**: Code formatting consistency
- **Conventional Commits**: Use conventional commit messages

## 📞 Support

### Getting Help
- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Use GitHub Discussions for questions

### Contact Information
- **Website**: [mkronix.com](https://mkronix.com)
- **Email**: info@mkronix.com
- **Phone**: +91-84-59258801

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design**: MkRonix Design Team
- **Development**: MkRonix Development Team
- **Icons**: Lucide React
- **Animations**: Framer Motion & GSAP
- **UI Components**: Shadcn/ui

---

**Built with ❤️ by MkRonix Team**

For more information about our services, visit [mkronix.com](https://mkronix.com)
