pipeline {
    agent any

    environment {
        IMAGE_NAME   = 'devops-app'
        ARTIFACT_DIR = "${WORKSPACE}/jenkins_artifacts"
        ANSIBLE_DIR  = "${WORKSPACE}/ansible"
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
                    echo "🛠️  Building Docker image..."
                    docker build  -t ${IMAGE_NAME}:latest .
                '''
            }
        }

        stage('Save Docker Image') {
            steps {
                sh '''
                    mkdir -p ${ARTIFACT_DIR}
                    docker save ${IMAGE_NAME}:latest -o ${ARTIFACT_DIR}/${IMAGE_NAME}.tar
                    echo "✅ Image saved at: ${ARTIFACT_DIR}/${IMAGE_NAME}.tar"
                '''
            }
        }

        stage('Deploy to Client via Ansible') {
            steps {
                sh '''
                    echo "🚀 Deploying application with Ansible..."
                    sudo -u ansible /usr/local/bin/ansible-playbook \
                        ${ANSIBLE_DIR}/deploy.yml \
                        --extra-vars "image_tar=${ARTIFACT_DIR}/${IMAGE_NAME}.tar"
                '''
            }
        }
    }

    post {
        failure {
            echo "❌ Deployment Failed. Check Jenkins logs."
        }
        success {
            echo "✅ Deployment Completed Successfully!"
        }
    }
}
