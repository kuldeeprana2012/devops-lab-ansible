pipeline {
    agent {
        docker {
            image 'devops-app'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        IMAGE_NAME = "devops-app"
        DOCKER_SOCK = "/var/run/docker.sock"
    }

    stages {

        stage('Checkout Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/kuldeeprana2012/devops-lab.git'
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
                sh 'ansible-playbook ansible/deploy.yml'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed. Check Jenkins logs.'
        }
    }
}
