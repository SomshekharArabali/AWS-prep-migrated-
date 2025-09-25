# Contributing to AWS Prep Platform

Thank you for your interest in contributing to the AWS Prep Platform! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

1. **Check existing issues** first to avoid duplicates
2. **Use the issue template** when creating new issues
3. **Provide detailed information**:
   - Steps to reproduce the problem
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Browser/OS information
   - Console error messages

### Suggesting Features

1. **Check the roadmap** to see if the feature is already planned
2. **Create a feature request** with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach
   - Mockups or examples (if applicable)

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch** from `main`
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Submit a pull request**

## 🛠️ Development Setup

### Prerequisites
- Node.js 16+
- npm or yarn
- Git
- Clerk account for authentication testing

### Local Development

1. **Clone your fork:**
   \`\`\`bash
   git clone https://github.com/your-username/aws-prep-platform.git
   cd aws-prep-platform
   \`\`\`

2. **Set up backend:**
   \`\`\`bash
   cd backend
   npm install
   cp .env.example .env
   # Configure your .env file
   npm run dev
   \`\`\`

3. **Set up frontend:**
   \`\`\`bash
   cd frontend
   npm install
   cp .env.example .env
   # Configure your .env file
   npm start
   \`\`\`

## 📝 Coding Standards

### JavaScript/React Guidelines

- Use **functional components** with hooks
- Follow **ES6+ syntax**
- Use **meaningful variable names**
- Add **comments** for complex logic
- Keep **components small** and focused
- Use **consistent formatting** (Prettier recommended)

### CSS Guidelines

- Use **CSS custom properties** for theming
- Follow **BEM methodology** for class naming
- Keep **styles modular** (component-specific CSS files)
- Use **flexbox** for layouts (avoid floats)
- Ensure **responsive design** (mobile-first approach)

### File Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── ComponentName.js
│   └── ComponentName.css
├── pages/              # Page components
├── contexts/           # React contexts
├── utils/              # Utility functions
├── hooks/              # Custom hooks
└── assets/             # Static assets
\`\`\`

### Naming Conventions

- **Components**: PascalCase (`UserProfile.js`)
- **Files**: camelCase (`apiClient.js`)
- **Variables**: camelCase (`userName`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes**: kebab-case (`user-profile`)

## 🧪 Testing Guidelines

### Frontend Testing

\`\`\`bash
cd frontend
npm test
\`\`\`

- Write **unit tests** for utility functions
- Write **component tests** for UI components
- Test **user interactions** and **API calls**
- Maintain **test coverage** above 80%

### Backend Testing

\`\`\`bash
cd backend
npm test
\`\`\`

- Write **unit tests** for route handlers
- Test **authentication middleware**
- Test **API endpoints** with different scenarios
- Mock **external dependencies**

### Manual Testing Checklist

- [ ] Authentication flow works correctly
- [ ] All pages load without errors
- [ ] Mobile responsiveness
- [ ] Question loading and submission
- [ ] Progress tracking
- [ ] Error handling
- [ ] Cross-browser compatibility

## 📋 Pull Request Process

### Before Submitting

1. **Update documentation** if needed
2. **Add tests** for new functionality
3. **Run all tests** and ensure they pass
4. **Check code formatting** and linting
5. **Test on multiple browsers/devices**

### PR Description Template

\`\`\`markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Cross-browser testing done

## Screenshots (if applicable)
Add screenshots of UI changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added and passing
\`\`\`

### Review Process

1. **Automated checks** must pass (linting, tests)
2. **Code review** by maintainers
3. **Testing** on staging environment
4. **Approval** and merge by maintainers

## 🎯 Areas for Contribution

### High Priority
- **Question bank expansion** (more AWS questions)
- **Performance optimization**
- **Accessibility improvements**
- **Mobile app development**
- **Offline functionality**

### Medium Priority
- **Advanced analytics dashboard**
- **Study streak tracking**
- **Social features** (study groups)
- **Export/import functionality**
- **Dark mode theme**

### Low Priority
- **Internationalization** (i18n)
- **Advanced customization options**
- **Integration with other platforms**
- **Gamification features**

## 🐛 Bug Fixes

### Bug Report Template

\`\`\`markdown
**Bug Description**
Clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen.

**Actual Behavior**
What actually happens.

**Environment**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 91]
- Device: [e.g., Desktop/Mobile]

**Additional Context**
Screenshots, console logs, etc.
\`\`\`

### Bug Fix Process

1. **Reproduce the bug** locally
2. **Identify the root cause**
3. **Write a test** that fails due to the bug
4. **Fix the bug** and ensure the test passes
5. **Test thoroughly** to avoid regressions
6. **Submit PR** with clear description

## 📚 Documentation

### Types of Documentation

- **Code comments** for complex logic
- **README updates** for new features
- **API documentation** for backend changes
- **User guides** for new functionality
- **Developer guides** for setup/deployment

### Documentation Standards

- Use **clear, concise language**
- Include **code examples** where helpful
- Keep **screenshots up-to-date**
- **Test all instructions** before publishing
- Use **proper markdown formatting**

## 🏆 Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **Release notes** for significant contributions
- **GitHub contributors** page
- **Special mentions** in project updates

## 📞 Getting Help

### Communication Channels

- **GitHub Issues** for bug reports and feature requests
- **GitHub Discussions** for general questions
- **Email** for private matters
- **Discord/Slack** (if available) for real-time chat

### Mentorship

New contributors can request mentorship for:

- **First-time contributions**
- **Complex feature development**
- **Architecture decisions**
- **Best practices guidance**

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

## 🙏 Thank You

Every contribution, no matter how small, helps make this platform better for AWS certification candidates worldwide. Thank you for your time and effort!

---

**Happy Contributing! 🚀**

Together, we're building the best AWS Cloud Practitioner exam preparation platform.
