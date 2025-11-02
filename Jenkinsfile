pipeline {
    agent none  // We'll specify per-stage agents

    environment {
        IMAGE_NAME = "devops-app"
    }

    stages {
        stage('Checkout Repository') {
            agent any
            steps {
                git branch: 'main', url: 'https://github.com/kuldeeprana2012/devops-lab-ansible.git'
            }
        }

        stage('Build Docker Image') {
            agent {
                docker {
                    image 'docker:24.0.5'  // or your preferred Docker version
                    args '-v /var/run/docker.sock:/var/run/docker.sock -u root'
                }
            }
            steps {
                sh '''
                    mkdir -p $WORKSPACE/.docker
                    export DOCKER_CONFIG=$WORKSPACE/.docker
                    docker build -t ${IMAGE_NAME}:latest .
                '''
            }
        }

        stage('Save Docker Image') {
            agent any
            steps {
                sh '''
                    mkdir -p /opt/jenkins
                    docker save ${IMAGE_NAME}:latest -o /opt/jenkins/${IMAGE_NAME}.tar
                '''
            }
        }

        stage('Deploy to Client via Ansible') {
            agent {
                docker {
                    image 'willhallonline/ansible:latest' // ✅ Docker image with Ansible preinstalled
                    args '-v /opt/jenkins:/opt/jenkins -v $WORKSPACE:/workspace -w /workspace'
                }
            }
            steps {
                sh '''
                    ansible --version
                    ansible-playbook ansible/deploy.yml
                '''
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
