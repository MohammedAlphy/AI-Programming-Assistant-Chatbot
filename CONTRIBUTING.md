# 🤝 Contributing to AI Programming Assistant Chatbot

Thank you for your interest in contributing to this educational AI chatbot project! This guide will help you understand how to contribute effectively.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Process](#development-process)
- [Coding Guidelines](#coding-guidelines)
- [Adding New Questions](#adding-new-questions)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project adheres to a **Code of Conduct** that all contributors are expected to follow. Please be:
- **Respectful** to all contributors
- **Inclusive** in language and approach
- **Constructive** in feedback
- **Educational** in contributions

## 🚀 Getting Started

### Prerequisites
- Basic understanding of HTML, CSS, JavaScript
- Git installed on your machine
- A GitHub account

### Setting Up Locally
1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/ai-programming-chatbot.git
   cd ai-programming-chatbot
   ```
3. **Open** `index.html` in your browser to test
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🎯 How Can I Contribute?

### 🌐 **For Non-Developers**
- **Report bugs** you encounter
- **Suggest new questions** for the chatbot
- **Improve documentation** (fix typos, clarify explanations)
- **Share the project** with others

### 💻 **For Developers**
- **Add new features** to the chatbot
- **Fix bugs** in existing code
- **Improve UI/UX** design
- **Optimize performance**
- **Add translations** for different languages

## 🔄 Development Process

### 1. Find an Issue or Create One
- Check [Issues](../../issues) for existing tasks
- If creating new issue, use templates if available

### 2. Work on Your Branch
```bash
# Make sure you're on your feature branch
git checkout feature/your-feature-name

# Make your changes
# Test thoroughly

# Add and commit changes
git add .
git commit -m "feat: add new visualization feature"

# Push to your fork
git push origin feature/your-feature-name
```

### 3. Open a Pull Request
- Go to the original repository on GitHub
- Click "New Pull Request"
- Select your branch
- Fill in the PR template

## 📝 Coding Guidelines

### HTML
- Use semantic HTML5 elements
- Maintain proper indentation (2 spaces)
- Add comments for complex sections
- Ensure accessibility (alt text, ARIA labels)

### CSS
- Use CSS variables for theming
- Follow mobile-first responsive design
- Add comments for layout explanations
- Use BEM or similar naming convention

### JavaScript
- Use ES6+ syntax when possible
- Write descriptive function/variable names
- Add JSDoc comments for functions
- Handle errors gracefully

### JSON (intents.json)
- Maintain alphabetical order of intents
- Use consistent indentation (2 spaces)
- Keep patterns clear and concise
- Add comments for new intent categories

## 📚 Adding New Questions

To add new Q/A pairs to the chatbot:

1. **Edit `intents.json`**
2. **Add a new intent object**:
   ```json
   {
     "tag": "new_topic",
     "patterns": [
       "What is [topic]?",
       "Explain [topic]",
       "Tell me about [topic]"
     ],
     "responses": [
       "[Topic] is...",
       "Here's what you need to know about [topic]..."
     ]
   }
   ```

### Best Practices for Questions:
- **Add multiple patterns** (different ways to ask)
- **Add multiple responses** (variety in answers)
- **Keep answers educational** and accurate
- **Include sources** if adding complex topics

## 🐛 Reporting Bugs

When reporting bugs, please include:

### Bug Report Template
```
**Description:** Clear description of the bug

**Steps to Reproduce:**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior:** What should happen

**Actual Behavior:** What actually happens

**Screenshots:** If applicable

**Browser:** Chrome 98 / Firefox 95 / Safari 15

**Additional Context:** Any other information
```

## 💡 Suggesting Features

For feature suggestions:

### Feature Request Template
```
**Problem Statement:** What problem does this solve?

**Proposed Solution:** How should it work?

**Alternative Solutions:** Other ways to solve it

**Additional Context:** Examples, references, etc.
```

## 🔀 Pull Request Process

### PR Checklist
- [ ] Code follows project guidelines
- [ ] Tests pass locally
- [ ] Documentation updated if needed
- [ ] No console errors
- [ ] Works in multiple browsers
- [ ] Mobile responsive tested

### PR Title Format
```
type(scope): brief description

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance
```

## 🌍 Translations

To add a new language:

1. **Create a new JSON file**: `intents-[language-code].json`
2. **Translate all content** from `intents.json`
3. **Update script.js** to detect language
4. **Add language selector** in UI

## 🧪 Testing

Before submitting:
- Test in Chrome, Firefox, Safari
- Test on mobile devices
- Verify JSON is valid (no syntax errors)
- Check browser console for errors
- Test all chatbot features

## 📞 Getting Help

- **Check existing issues** for similar questions
- **Review documentation** in README
- **Ask in discussions** if enabled
- **Contact maintainer** for critical issues

## 🙏 Thank You!

Your contributions help make AI education more accessible to everyone. Whether you're fixing a typo or adding a major feature, every contribution matters!