```groovy
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out SmartCampus project...'
                checkout scm
            }
        }

        stage('Validate Project Files') {
            steps {
                bat '''
                    if not exist index.html exit /b 1
                    if not exist submit.html exit /b 1
                    if not exist feedback.html exit /b 1
                    if not exist analytics.html exit /b 1
                    if not exist about.html exit /b 1
                    if not exist contact.html exit /b 1
                    if not exist thank-you.html exit /b 1
                    if not exist assets\\style.css exit /b 1
                    if not exist assets\\app.js exit /b 1
                    if not exist Dockerfile exit /b 1
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t smartcampus-feedback:latest .'
            }
        }

        stage('Deploy Application') {
            steps {
                bat '''
                    docker rm -f smartcampus-feedback-app 2>NUL
                    docker run -d --name smartcampus-feedback-app -p 8085:80 smartcampus-feedback:latest
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                bat '''
                    docker ps --filter "name=smartcampus-feedback-app"
                    curl.exe -f http://localhost:8085/
                '''
            }
        }
    }

    post {
        success {
            echo 'SmartCampus application deployed successfully!'
            echo 'Open http://localhost:8085 in your browser.'
        }

        failure {
            echo 'Pipeline failed. Check the Jenkins Console Output for errors.'
        }
    }
}
```
