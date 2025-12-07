# 🚀 **Student Project Tracker – CI/CD Pipeline Documentation (Jenkins + Docker)**

**Author:** Sahil Shaikh
**Pipeline Type:** Jenkins Declarative Pipeline
**Technologies:** Node.js, Docker, GitHub, Jenkins

---

# 🧱 **1. Overview**

Is project ka purpose backend ko Docker image me convert karna, Jenkins pipeline ke through automate karna, aur frontend static HTML ko archive karna hai.

Continuous Integration (CI) aur Deployment (CD) ka pura flow Jenkins se automate hota hai.

---

# 📦 **2. Project Structure**

```
student-project-tracker/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── package.json
│   ├── Dockerfile
│
├── frontend/
│   ├── index.html
│
└── Jenkinsfile
```

---

# ⚙️ **3. Prerequisites Setup**

### ✔ Install Java 17 (Jenkins requirement)

Make sure Java installed and configured in PATH.

### ✔ Install Jenkins LTS

Download from: [https://www.jenkins.io/](https://www.jenkins.io/)

### ✔ Install Required Jenkins Plugins

* NodeJS Plugin
* Git Plugin
* Pipeline Plugin
* Docker Pipeline Plugin

### ✔ Install NodeJS Tool in Jenkins

Navigate:
**Manage Jenkins → Tools → NodeJS**
Add configuration:

```
Name: node18
Version: NodeJS 18.x (Install Automatically)
```

### ✔ Install Docker Desktop

Ensure Docker daemon is running.

---

# 🔧 **4. Jenkins Pipeline Stages Explained**

### ### **Stage 1 — Tool Installation**

Jenkins automatically loads NodeJS tool for pipeline.

### ### **Stage 2 — Clone Repository**

GitHub repo clone hota hai:

```
https://github.com/sahilshaikh867/student-project-tracker.git
```

### ### **Stage 3 — Backend Dependencies Install**

Backend folder me jaake:

```
npm install
```

### ### **Stage 4 — Build Docker Image**

Backend ka Dockerfile use karke:

```
docker build -t student-backend .
```

### ### **Stage 5 — Archive Frontend Static Files**

`index.html` ko build artifacts me store karta hai so Jenkins UI se download hota hai.

---

# 📜 **5. Jenkinsfile (Final Working Script)**

```groovy
pipeline {
    agent any

    tools {
        nodejs "node18"
    }

    stages {

        stage("Clone Repository") {
            steps {
                git branch: 'main',
                    url: 'https://github.com/sahilshaikh867/student-project-tracker.git'
            }
        }

        stage("Install Backend Dependencies") {
            steps {
                dir("backend") {
                    bat "npm install"
                }
            }
        }

        stage("Build Backend Docker Image") {
            steps {
                dir("backend") {
                    bat "docker build -t student-backend ."
                }
            }
        }

        stage("Archive Frontend Static Files") {
            steps {
                archiveArtifacts artifacts: "frontend/index.html"
            }
        }
    }

    post {
        success {
            echo "Pipeline executed successfully!"
        }
        failure {
            echo "Pipeline failed. Check logs for issues."
        }
    }
}
```

---

# 🐳 **6. Backend Dockerfile**

```dockerfile
# Use official Node image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose port
EXPOSE 3000

# Start the service
CMD ["node", "server.js"]
```

---

# 🔥 **7. How CI/CD Works**

### When you click **Build Now** in Jenkins:

| Stage                | What Happens                             |
| -------------------- | ---------------------------------------- |
| Tool Install         | NodeJS loaded                            |
| Clone Repo           | Repo pulled from GitHub                  |
| Install Dependencies | Backend NPM install                      |
| Build Docker Image   | Docker container created                 |
| Archive Files        | Frontend HTML stored as Jenkins artifact |

---

# 📁 **8. Generated Artifacts**

Jenkins will save:

```
index.html
```

You can download this after build completion.

---

# 🚀 **9. Future Enhancements**

You can extend this pipeline:

### ✔ Auto-deploy container to EC2

### ✔ Push Docker image to Docker Hub / ECR

### ✔ Build and upload frontend bundle

### ✔ Add test stages

### ✔ Create multibranch pipeline

I'm ready to help when you want to upgrade it 😉

---

# 🎉 **10. Conclusion**

Your CI/CD pipeline is fully functional with:

* Code cloning
* Backend dependency installation
* Docker image generation
* Frontend file archival

This setup is clean, modular, and production-ready for learning + real DevOps workflow.

---
