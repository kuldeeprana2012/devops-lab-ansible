pipeline {
    agent any
    environment {
        IMAGE_NAME = "devops-app"
        DOCKER_HOST = "unix:///var/run/docker.sock"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/your-username/devops-lab.git'
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
                sh 'ansible-playbook -i /etc/ansible/hosts ansible/deploy.yml -u ansible'
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful! Access app at http://172.20.10.2:3000"
        }
        failure {
            echo "❌ Deployment Failed. Check Jenkins logs."
        }
    }
}
