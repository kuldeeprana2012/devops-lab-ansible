pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-app"
        DOCKER_HOST = "unix:///var/run/docker.sock"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/kuldeeprana2012/devops-lab.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Save Docker Image') {
            steps {
                sh 'docker save ${IMAGE_NAME}:latest -o /opt/jenkins/${IMAGE_NAME}.tar'
            }
        }

        stage('Deploy to Client via Ansible') {
            steps {
                sh 'ansible-playbook -i /etc/ansible/hosts ansible/deploy.yml -u jenkins'
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful! Access app at http://10.69.3.55:3000"
        }
        failure {
            echo "❌ Deployment Failed. Check Jenkins logs."
        }
    }
}
