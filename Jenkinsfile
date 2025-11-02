pipeline {
    agent {
        docker {
            image 'docker:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock -u root'
        }
    }

    environment {
        IMAGE_NAME = "devops-app"
    }

    stages {
        stage('Checkout Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/kuldeeprana2012/devops-lab-ansible.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                mkdir -p $WORKSPACE/.docker
                export DOCKER_CONFIG=$WORKSPACE/.docker
                docker build -t ${IMAGE_NAME}:latest .
                '''
            }
        }

        stage('Save Docker Image') {
            steps {
                sh '''
                mkdir -p /opt/jenkins
                docker save ${IMAGE_NAME}:latest -o /opt/jenkins/${IMAGE_NAME}.tar
                '''
            }
        }

        stage('Deploy to Client via Ansible') {
    agent any  // ✅ run on Jenkins host, not inside Docker
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
