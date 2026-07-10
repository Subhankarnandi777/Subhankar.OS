# 🖥️ SUBHANKAR.OS — AI-Powered Portfolio OS

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-38BDF8?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-0055FF?style=for-the-badge&logo=framer)

**A futuristic, OS-themed personal portfolio built with Next.js — featuring draggable windows, a built-in AI assistant, terminal easter eggs, and a fully responsive mobile launcher.**

[🌐 Live Demo](https://subhankar-os.vercel.app) · [📄 Download CV](https://subhankar-os.vercel.app/Subhankar_Nandi_(CV).pdf) · [💼 LinkedIn](https://www.linkedin.com/in/subhankar-nandi-/)

</div>

---

## ✨ Features

### 🖥️ Desktop Experience
- **Draggable, resizable windows** — just like a real OS
- **Categorized icon grid** — Portfolio, Tools, Connect, and System groups
- **macOS-style window controls** — red/yellow/green traffic light buttons
- **Dynamic cursor glow** — follows mouse with a soft cyan light
- **Particle background** — animated particles for a futuristic feel
- **Multiple wallpapers & themes** — including a full CRT Terminal mode and Amber Phosphor mode

### 📱 Mobile Launcher
- **Native app-grid layout** on phones (< 768px)
- **3-column icon cards** with category tabs (Portfolio / System)
- **Full-screen in-app views** that slide up on tap
- **Scrollable horizontal dock** on tablets

### 🤖 AI Assistant
- Built-in conversational AI trained with Subhankar''s personal data
- Answers questions about education, projects, skills, and experience
- Persistent chat history within session

### 💻 Terminal App
- Full interactive terminal with command history and tab-completion
- **Easter eggs:**
  - `sudo hire subhankar` → launches contact portal 🎉
  - `skills --list` → matrix-style tech stack output

### 📋 Portfolio Sections

| Section | Features |
|---|---|
| **About Me** | Bio, Education timeline (IEM + school), Download CV |
| **Skills** | Animated proficiency bars for 7+ technologies |
| **Education** | Full details with WBCHSE & WBBSE board results |
| **Work Experience** | Timeline with internship details |
| **Projects** | 6 live project cards with GitHub links & tech tags |
| **GitHub** | Live contribution heatmap graph |
| **Certifications** | 5 verified certs + Ureckon 2026 achievement |
| **Contact** | Working contact form + social links |
| **Resume / CV** | Embedded PDF viewer + download button |

---

## 🚀 Projects Showcased

| Project | Tech | Description |
|---|---|---|
| **SmartSpend AI** | React, FastAPI, ML | AI-powered personal finance assistant |
| **E-Sehat** | React Native, Node.js, OpenAI | AI healthcare telemedicine platform |
| **YOLOv8 Disaster Drone** | Python, YOLO, OpenCV | Real-time human detection system |
| **CyberGuardAI** | Python, FastAPI, Multi-Agent | Cybersecurity incident response hub |
| **Support Ticket Classifier** | Python, Scikit-learn, NLP | ML-based ticket classification |
| **Store Sales Forecasting** | Python, XGBoost, Power BI | End-to-end demand analysis |

---

## 🛠️ Tech Stack

```
Frontend     │ Next.js 16, React 19, TypeScript
Styling      │ Tailwind CSS 4, Framer Motion 12
State        │ Zustand 5
Icons        │ Lucide React
Fonts        │ Geist (by Vercel)
Deployment   │ Vercel / Netlify
```

---

## 📁 Project Structure

```
Subhankar.OS/
├── public/
│   └── Subhankar_Nandi_(CV).pdf     # Downloadable CV
├── src/
│   ├── app/
│   │   ├── globals.css              # Global styles & terminal themes
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Entry point with mobile/desktop split
│   ├── apps/                        # Individual app windows
│   │   ├── About.tsx                # Hero + About + Education + Projects + Contact
│   │   ├── AIAssistant.tsx          # Built-in AI chat
│   │   ├── Contact.tsx              # Contact form
│   │   ├── GitHub.tsx               # Live GitHub stats
│   │   ├── Projects.tsx             # Project showcase
│   │   ├── Resume.tsx               # CV viewer & download
│   │   ├── Skills.tsx               # Tech skill bars
│   │   └── TerminalApp.tsx          # Interactive terminal
│   ├── components/                  # Core OS components
│   │   ├── Desktop.tsx              # Desktop + categorized icon grid
│   │   ├── MobilePortfolio.tsx      # Mobile OS launcher
│   │   ├── Taskbar.tsx              # Bottom taskbar
│   │   ├── Window.tsx               # Draggable window wrapper
│   │   ├── CommandPalette.tsx       # Ctrl+K command palette
│   │   ├── BootScreen.tsx           # OS boot animation
│   │   └── ParticlesBackground.tsx  # Particle effects
│   └── store/
│       └── osStore.ts               # Zustand global state
```

---

## 🏃 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/Subhankarnandi777/Subhankar.OS.git
cd Subhankar.OS

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🎮 Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + K` | Open Command Palette |
| `Ctrl + Alt + R` | Toggle Recruiter Mode |
| Double-click icon | Open app window |
| Double-click title bar | Maximize/restore window |

## 💻 Terminal Commands

| Command | Action |
|---|---|
| `help` | List all commands |
| `about` | Open About window |
| `skills` | Open Skills window |
| `projects` | Open Projects |
| `resume` | Open Resume/CV |
| `github` | Open GitHub profile |
| `linkedin` | Open LinkedIn |
| `contact` | Open Contact form |
| `sudo hire subhankar` | 🎉 Easter egg! |
| `skills --list` | Matrix-style skill dump |
| `ask <question>` | Ask the AI Assistant |

---

## 📊 Education

| Qualification | Institution | Year | Score |
|---|---|---|---|
| B.Tech CSE (AI & ML) | Institute of Engineering & Management, Kolkata | 2024–2028 | CGPA: 8.51 |
| Higher Secondary (WBCHSE) | Govt. Sponsored Multipurpose School - (Boy''s) Taki House | 2024 | 80.8% |
| Secondary (WBBSE) | Govt. Sponsored Multipurpose School - (Boy''s) Taki House | 2022 | 76.57% |

---

## 🏆 Achievements & Certifications

- 🥈 **2nd Place** — Ureckon Innovation Challenge 2026
- 📜 Advanced System Security Topics — *University of Colorado*
- 📜 Information Theory — *Chinese University of Hong Kong*
- 📜 Azure Fundamentals — *Microsoft*
- 📜 Machine Learning Foundations: Statistics — *LinkedIn Learning*
- 📜 Cyber Security Fundamentals — *Coursera*

---

## 🤝 Connect

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-Subhankarnandi777-181717?style=for-the-badge&logo=github)](https://github.com/Subhankarnandi777)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-subhankar--nandi-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/subhankar-nandi-/)

</div>

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Made with ❤️ by Subhankar Nandi**
*B.Tech CSE (AI & ML) | IEM Kolkata | AI Engineer & Full Stack Developer*

</div>
