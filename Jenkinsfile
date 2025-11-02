pipeline {
    agent any

    environment {
        IMAGE_NAME = 'devops-app'
        ARTIFACT_DIR = "${WORKSPACE}/jenkins_artifacts"
    }

    stages {
        stage('Checkout Repository') {
            steps {
                git 'https://github.com/kuldeeprana2012/devops-lab-ansible.git'
            }
        }

        stage('Use Existing Docker Image (Skip Build if Available)') {
            steps {
                sh '''
                    if [ -n "$(docker images -q ${IMAGE_NAME}:latest)" ]; then
                        echo "✅ Using existing local image: ${IMAGE_NAME}:latest"
                    else
                        echo "❌ Image not found, build it first!"
                        exit 1
                    fi
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
                // Run Ansible directly on Jenkins host
                sh '''
                    echo "🚀 Deploying application with Ansible..."
                    /usr/local/bin/ansible-playbook ansible/deploy.yml \
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
