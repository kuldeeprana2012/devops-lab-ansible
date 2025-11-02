pipeline {
    agent any
    environment {
        IMAGE_NAME = "devops-app"
        DOCKER_HOST = "unix:///var/run/docker.sock"
    }

    stage('Clone Repository') {
    steps {
        git branch: 'main',
            credentialsId: 'github-token',   // optional if repo is public
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
