# 🐧 **Student Project Tracker — CI/CD Pipeline Documentation (Ubuntu + Jenkins + Docker)**

**Author:** Sahil Shaikh
**System:** Ubuntu 22.04 LTS
**Pipeline:** Jenkins Declarative Pipeline
**Tech Stack:** Node.js, Docker, GitHub, Jenkins

---

# 🧱 **1. High-Level Overview**

Ubuntu server par CI/CD setup completely automated hoga:

### 🔹 Steps Automated by Jenkins Pipeline:

1. GitHub repo clone
2. Backend dependency install (Node.js)
3. Docker image build (backend)
4. Frontend static files archive
5. Optional future steps (deploy to EC2, Docker Hub, Nginx)

---

# 🧩 **2. Folder Structure**

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

# ⚙️ **3. Ubuntu Machine Setup**

## ✔ Step 1: System Update

```bash
sudo apt update && sudo apt upgrade -y
```

---

## ✔ Step 2: Install Java (Jenkins requirement)

Ubuntu par Java default nahi hota.

```bash
sudo apt install openjdk-17-jdk -y
```

Check:

```bash
java -version
```

---

## ✔ Step 3: Install Jenkins (Ubuntu)

### Add Jenkins Repo:

```bash
curl -fsSL https://pkg.jenkins.io/debian/jenkins.io.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
```

### Install Jenkins:

```bash
sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc]" \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt update
sudo apt install jenkins -y
```

### Start Jenkins:

```bash
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

### Check service:

```bash
systemctl status jenkins
```

---

## ✔ Step 4: Install Node.js on Ubuntu

Jenkins NodeJS plugin install karega, but build steps require Node.

Recommended:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

Check:

```bash
node -v
npm -v
```

---

## ✔ Step 5: Install Docker on Ubuntu

```bash
sudo apt install ca-certificates curl gnupg -y
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

Add repo:

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Install Docker:

```bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io -y
```

Start service:

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

### Give Jenkins Docker permissions:

```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

---

# 👨‍🔧 **4. Jenkins Configuration on Ubuntu**

### Install Plugins:

Go to:
**Manage Jenkins → Plugin Manager → Available**

Install:

* NodeJS Plugin
* Docker Pipeline Plugin
* Git Plugin
* Pipeline Plugin

---

## ✔ Add NodeJS Tool

**Manage Jenkins → Tools → NodeJS**

```
Name: node18
Version: NodeJS 18.x (auto install)
```

---

# 🧪 **5. Jenkinsfile (Linux Version) — FINAL**

Linux ke liye hum `bat` commands hatake **sh** use karte hain.

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
                    sh "npm install"
                }
            }
        }

        stage("Build Backend Docker Image") {
            steps {
                dir("backend") {
                    sh "docker build -t student-backend ."
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
            echo "Pipeline executed successfully on Ubuntu!"
        }
        failure {
            echo "Pipeline failed. Check logs."
        }
    }
}
```

---

# 🐳 **6. Backend Dockerfile (Same for Ubuntu)**

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

---

# 🌐 **7. Start Jenkins on Browser**

Ubuntu server per:

```
http://<your-server-ip>:8080
```

Initial key:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

---

# 📈 **8. Pipeline Flow (Ubuntu)**

| Stage                        | Description                    |
| ---------------------------- | ------------------------------ |
| Clone Repo                   | GitHub pull from main          |
| Install Backend Dependencies | Node install in backend folder |
| Build Docker Image           | Backend container build        |
| Archive Frontend             | index.html stored as artifact  |

---

# 🛠 **9. Common Ubuntu Jenkins Fixes**

### ✔ Docker permission error

```
Got permission denied while trying to connect to Docker socket
```

Fix:

```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

---

# 🚀 **10. Future Expansions**

You can upgrade pipeline with:

### 🔹 Auto Deploy on AWS EC2

### 🔹 Push Docker Image to Docker Hub

### 🔹 Deploy Frontend via NGINX

### 🔹 Create automatic triggers using GitHub Webhooks

### 🔹 Add Testing Stage (Jest / Mocha)

### 🔹 Use Docker Compose for multi-container setup

---

# 🎉 **DONE — Ubuntu CI/CD Full Documentation Ready**

